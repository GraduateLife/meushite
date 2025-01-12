---
slug: play-cloudflare
title: Play Cloudflare
timestamp: '2025-01-12T13:59:51.870Z'
top: false
description: >-
  I use Cloudflare R2 to store my blog data
  it is similar to AWS S3, but instead of 5GB free storage for first 12 months,
  it has 10GB free storage, forever.
keywords: ["cloudflare", "r2", "snippets"]
author: Eddie Zhang
---

[toc]

## I use Cloudflare R2 to store my blog data

it is similar to AWS S3, but instead of 5GB free storage for first 12 months, it has 10GB free storage, forever.

[Cloudflare R2](https://www.cloudflare.com/r2/)

[aws S3 Pricing](https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all)

considering my website will move to aws someday, and probably will use aws s3 for my blog data, but for now, I use Cloudflare R2, since even their sdk are compatible. Yes, I can use aws-sdk to operate r2.

[Cloudflare R2 with S3 API](https://developers.cloudflare.com/r2/api/s3/api/)

to make our life easier, here I share my r2 operation script.

### create client

```typescript
const R2Storage = new S3Client({
  region: 'auto',
  endpoint: `https://${CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  },
});
```

Oh, I forgot to mention, if you want to use r2 by access key and access id, you have to create an API token with permission of **Admin Read&Write** even if you only want to access one bucket.

> this is a aws sdk bug, because aws sdk tries to create a bucket if it doesn't exist, even though it is not allowed to do so.

## basic operations

### list buckets

```typescript
export const listBuckets = async () => {
  return await R2Storage.send(new ListBucketsCommand({}));
};
```

### list objects in bucket

```typescript
export const listObjectsInBucket = async (
  bucketName: string
) => {
  return await R2Storage.send(new ListObjectsV2Command({ Bucket: bucketName }));
};
```

### get object

```typescript
const getObject = async (
  key: string,
  bucketName: string
) => {
  return await R2Storage.send(
    new GetObjectCommand({ Bucket: bucketName, Key: key })
  );
};
```

### has object in bucket

```typescript
export const hasObjectInBucket = async (
  key: string,
  bucketName: string 
): Promise<boolean> => {
  try {
    await R2Storage.send(
      new GetObjectCommand({ Bucket: bucketName, Key: key })
    );
    return true;
  } catch (error) {
    return false;
  }
};
```

### delete object

```typescript
export const deleteObject = async (
  key: string,
  bucketName: string
) => {
  await R2Storage.send(
    new DeleteObjectCommand({
      Bucket: bucketName,
        Key: key,
      })
    );

};
```

### update object

As we all know, bucket objects are immutable, so to update an object, we have to delete the old one and create a new one.

```typescript
export const updateObject = async (
  filePath: string,
  key: string,
  checkIfExists: boolean = true,
  bucketName: string
) => {
  // I defined checkIfExists because sometimes we are very sure that an object is in bucket or not.
  const exists = checkIfExists
    ? await hasObjectInBucket(key, bucketName)
    : true;
  if (exists) {
    await deleteObject(key, bucketName);
  }
  return await uploadObject(filePath, key, bucketName);
};
```

### upload object

```typescript
export const uploadObject = async (
  filePath: string,
  key: string = path.basename(filePath),
  bucketName: string
) => {
  //have to set content type, otherwise images can not be read
  const contentType = mime.lookup(filePath) || 'application/octet-stream';

  return await R2Storage.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: await fs.promises.readFile(filePath),
      ContentType: contentType,
    })
  );
    };
```

### download object

```typescript
export const downloadObject = async (
  key: string,
  intoDirName: string = 'public',
  bucketName: string  
) => {
  const intoDir = process.cwd() + '/' + intoDirName;
  const object = await getObject(key, bucketName);

  // Create the full directory path including subdirectories
  const fullPath = path.join(intoDir, key);
  const targetDir = path.dirname(fullPath);
  await fs.promises.mkdir(targetDir, { recursive: true });

  // Convert the readable stream to a buffer and write to file
  /*eslint-disable @typescript-eslint/no-explicit-any*/
  const chunks: any[] = [];
  for await (const chunk of object.Body as any) {
    chunks.push(chunk);
  }
  /*eslint-enable @typescript-eslint/no-explicit-any*/
  const buffer = Buffer.concat(chunks);
  await fs.promises.writeFile(fullPath, buffer);
  return fullPath;
};
```

bucket does not have the concept of folder, I use folder instead of prefix to make it easier to understand.

### download folder

```typescript
export const downloadFolder = async (
  prefix: string,
  intoDirName: string = 'public',
  bucketName: string
) => {
  const response = await R2Storage.send(
    new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: prefix,
    })
  );

  if (!response.Contents) {
    return [];
  }

  // Download each object
  const downloads = response.Contents.map((object) => {
    if (!object.Key) return;
    return downloadObject(object.Key, intoDirName, bucketName);
  }).filter(Boolean);

  // Wait for all downloads to complete
  const downloadedPaths = await Promise.all(downloads);
  return downloadedPaths;
};
```

### upload folder

```typescript
export const uploadFolder = async (
  folderPath: string,
  prefix: string = '',
  bucketName: string
) => {
  const files = await fs.promises.readdir(folderPath, { withFileTypes: true });
  const uploads = [];

  for (const file of files) {
    const fullPath = path.join(folderPath, file.name);
    const key = path.join(prefix, file.name).replace(/\\/g, '/');

    if (file.isDirectory()) {
      uploads.push(uploadFolder(fullPath, key, bucketName));
    } else {
      uploads.push(uploadObject(fullPath, key, bucketName));
    }
  }
  await Promise.all(uploads);
  return true;
};
```

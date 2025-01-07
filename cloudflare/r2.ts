import { env } from '@/env';
import { echo, em, notice } from '@/lib/echo';
import {
  GetObjectCommand,
  ListBucketsCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import fs from 'fs';
import mime from 'mime-types';
import path from 'path';
import { BucketEndpoint } from './utils';

const R2Storage = new S3Client({
  region: 'auto',
  endpoint: BucketEndpoint,
  credentials: {
    accessKeyId: env.CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  },
});

export const listBuckets = async () => {
  return await R2Storage.send(new ListBucketsCommand({}));
};

export const listObjectsInBucket = async (
  bucketName: string = env.CLOUDFLARE_R2_BUCKET_NAME
) => {
  return await R2Storage.send(new ListObjectsV2Command({ Bucket: bucketName }));
};
const getObject = async (
  key: string,
  bucketName: string = env.CLOUDFLARE_R2_BUCKET_NAME
) => {
  return await R2Storage.send(
    new GetObjectCommand({ Bucket: bucketName, Key: key })
  );
};

export const uploadObject = async (
  filePath: string,
  key: string = path.basename(filePath),
  bucketName: string = env.CLOUDFLARE_R2_BUCKET_NAME
) => {
  const contentType = mime.lookup(filePath) || 'application/octet-stream';

  echo.log(`Uploading ${filePath} to ${bucketName}`);

  return await R2Storage.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: await fs.promises.readFile(filePath),
      ContentType: contentType,
    })
  );
};

export const downloadObject = async (
  key: string,
  intoDirName: string = 'public',
  bucketName: string = env.CLOUDFLARE_R2_BUCKET_NAME
) => {
  const intoDir = process.cwd() + '/' + intoDirName;
  echo.log(`pulling object ${notice(key)} `);
  const object = await getObject(key, bucketName);

  // Create the full directory path including subdirectories
  const fullPath = path.join(intoDir, key);
  const targetDir = path.dirname(fullPath);
  await fs.promises.mkdir(targetDir, { recursive: true });

  // Convert the readable stream to a buffer and write to file
  /* eslint-disable @typescript-eslint/no-explicit-any */

  const chunks: any[] = [];
  for await (const chunk of object.Body as any) {
    chunks.push(chunk);
  }
  /* eslint-enable @typescript-eslint/no-explicit-any */
  const buffer = Buffer.concat(chunks);
  echo.log(`writing to file ${em(fullPath)}`);
  await fs.promises.writeFile(fullPath, buffer);

  echo.good(`Downloaded ${notice(key)} to ${intoDir}`);
  return fullPath;
};

export const downloadFolder = async (
  prefix: string,
  intoDirName: string = 'public',
  bucketName: string = env.CLOUDFLARE_R2_BUCKET_NAME
) => {
  echo.log(`Downloading folder ${notice(prefix)} from bucket ${bucketName}`);

  // List all objects with the given prefix
  const response = await R2Storage.send(
    new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: prefix,
    })
  );

  if (!response.Contents) {
    echo.warn(`No objects found with prefix ${prefix}`);
    return [];
  }

  // Download each object
  const downloads = response.Contents.map((object) => {
    if (!object.Key) return;
    return downloadObject(object.Key, intoDirName, bucketName);
  }).filter(Boolean);

  // Wait for all downloads to complete
  const downloadedPaths = await Promise.all(downloads);

  echo.good(`Downloaded ${downloads.length} files from ${notice(prefix)}`);
  return downloadedPaths;
};

export const uploadFolder = async (
  folderPath: string,
  prefix: string = '',
  bucketName: string = env.CLOUDFLARE_R2_BUCKET_NAME
) => {
  const files = await fs.promises.readdir(folderPath, { withFileTypes: true });
  const uploads = [];

  for (const file of files) {
    const fullPath = path.join(folderPath, file.name);
    const key = path.join(prefix, file.name).replace(/\\/g, '/'); // Normalize path separators

    if (file.isDirectory()) {
      // Recursively upload subdirectories
      uploads.push(uploadFolder(fullPath, key, bucketName));
    } else {
      // Upload individual file
      uploads.push(uploadObject(fullPath, key, bucketName));
    }
  }

  await Promise.all(uploads);
  return true;
};

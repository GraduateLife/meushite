import { hasObjectInBucket, updateObject, uploadObject } from '@/cloudflare/r2';
import { echo, notice } from '@/lib/echo';

export async function syncChangedImages(
  filesFromHook: string[]
): Promise<void> {
  const imageFiles = filesFromHook.filter((file) =>
    /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file)
  );
  echo.log(
    `Following image files will be uploaded to remote: ${imageFiles.join(', ')}`
  );
  for (const filePath of imageFiles) {
    const exists = await hasObjectInBucket(filePath);
    try {
      if (!exists) {
        echo.log(`Creating post image sync record: ${notice(filePath)}`);
        await uploadObject(filePath, filePath);
      } else {
        echo.log(`Updating post image sync record: ${notice(filePath)}`);
        await updateObject(filePath, filePath);
        echo.good(
          `successfully updated post image sync record: ${notice(filePath)}`
        );
      }
    } catch (error) {
      echo.error(`Failed to upload ${filePath}: ${error}`);
      echo.info(
        `Corresponding bucket object ${filePath} will not be deleted because bucket is designed to store all versions`
      );
      return;
    }
  }
}

export async function syncChangedPosts(filesFromHook: string[]): Promise<void> {
  const markdownFiles = filesFromHook.filter((file) => file.endsWith('.md'));
  echo.log(
    `Following markdown files will be updated: ${markdownFiles.join(', ')}`
  );
  for (const filePath of markdownFiles) {
    const exists = await hasObjectInBucket(filePath);
    try {
      if (!exists) {
        echo.info(`Creating post sync record: ${notice(filePath)}`);
        await uploadObject(filePath, filePath);
      } else {
        echo.info(`Updating post sync record: ${notice(filePath)}`);
        await updateObject(filePath, filePath, false);
        echo.good(`successfully updated post sync record: ${notice(filePath)}`);
      }
    } catch (error) {
      echo.error(`Failed to upload ${filePath}: ${error}`);
      echo.info(
        `Corresponding bucket object ${filePath} will not be deleted because bucket is designed to store all versions`
      );
      return;
    }
  }
}

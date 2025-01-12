import { hasObjectInBucket, updateObject, uploadObject } from '@/cloudflare/r2';
import { echo, notice } from '@/lib/echo';
import { isTimeoutError, withRetry } from '../utils';

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
        await withRetry(
          async () => await uploadObject(filePath, filePath),
          isTimeoutError
        );
      } else {
        echo.log(`Updating post image sync record: ${notice(filePath)}`);
        await withRetry(
          async () => await updateObject(filePath, filePath, false),
          isTimeoutError
        );
        echo.good(
          `successfully updated post image sync record: ${notice(filePath)}`
        );
      }
    } catch (error) {
      echo.error(`Failed to upload ${filePath}: ${error}`);
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
        await withRetry(
          async () => await uploadObject(filePath, filePath),
          isTimeoutError
        );
      } else {
        echo.info(`Updating post sync record: ${notice(filePath)}`);
        await withRetry(
          async () => await updateObject(filePath, filePath, false),
          isTimeoutError
        );
        echo.good(`successfully updated post sync record: ${notice(filePath)}`);
      }
    } catch (error) {
      echo.error(`Failed to upload ${filePath}: ${error}`);
      return;
    }
  }
}

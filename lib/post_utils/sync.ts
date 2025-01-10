import { hasObjectInBucket, updateObject, uploadObject } from '@/cloudflare/r2';
import { echo, notice } from '@/lib/echo';
import fs from 'fs';
import path from 'path';

async function syncAssociatedImages(mdFilePath: string): Promise<void> {
  const dirPath = path.dirname(mdFilePath);
  const files = await fs.promises.readdir(dirPath);
  const imageFiles = files.filter((file) =>
    /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file)
  );
  echo.info(`hi? Syncing ${imageFiles.length} images from ${dirPath}`);
  for (const filePath of imageFiles) {
    const exists = await hasObjectInBucket(filePath);

    if (!exists) {
      echo.info(`Creating post image sync record: ${notice(filePath)}`);
      await uploadObject(filePath, filePath);
    } else {
      echo.info(`Updating post image sync record: ${notice(filePath)}`);
      await updateObject(filePath, filePath);
    }
  }
}

export async function syncChangedPosts(filesFromHook: string[]): Promise<void> {
  const markdownFiles = filesFromHook.filter((file) => file.endsWith('.md'));

  for (const filePath of markdownFiles) {
    const exists = await hasObjectInBucket(filePath);

    if (!exists) {
      echo.info(`Creating post sync record: ${notice(filePath)}`);
      await uploadObject(filePath, filePath);
      await syncAssociatedImages(filePath);
    } else {
      echo.info(`Updating post sync record: ${notice(filePath)}`);
      await updateObject(filePath, filePath);
      await syncAssociatedImages(filePath);
    }
  }
}

import { deleteObject } from '@/cloudflare/r2';
import { env } from '@/env';
import { echo } from '@/lib/echo';
import { syncChangedImages, syncChangedPosts } from '@/lib/post_utils/sync';
import { execSync } from 'child_process';
import fs from 'fs';

async function main() {
  // Get the files changed in the commits that are about to be pushed with their status
  const changedFilesWithStatus = execSync('git diff --name-status HEAD @{u}')
    .toString()
    .trim()
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const [status, ...filePaths] = line.split('\t');
      return { status, path: filePaths.join('\t') };
    });
  console.log('Changed files with status:', changedFilesWithStatus); // Debug log

  const toDeleteBucketKeys: string[] = [];
  // Handle different types of changes (M: modified, A: added, R: renamed, D: deleted)
  const changedFiles = changedFilesWithStatus
    .filter(({ path }) => {
      // Check if file exists before including it
      const fileExists = fs.existsSync(path);
      if (!fileExists) {
        echo.warn(`File ${path} no longer exists, skipping`);
        return false;
      }
      return path.startsWith(env.SITE_BLOG_LOCAL_STORAGE_DIR + '/');
    })
    .flatMap(({ status, path }) => {
      if (status.startsWith('R')) {
        const [Path1, Path2] = path.split('\t');
        echo.info(`Detected rename: ${Path2} -> ${Path1}`);
        toDeleteBucketKeys.push(Path2);
        return [Path1];
      }
      return [path];
    });

  if (changedFiles.length === 0) {
    echo.info('No files to sync');
    return;
  }

  echo.log(
    `Following files need to be uploaded to remote: ${changedFiles.join(', ')}`
  );
  echo.log(
    `Following files need to be deleted from remote: ${toDeleteBucketKeys.join(', ')}`
  );
  await Promise.all(toDeleteBucketKeys.map((key) => deleteObject(key)));
  await syncChangedPosts(changedFiles);
  if (env.SITE_BLOG_IMAGE_READ_MODE === 'remote') {
    await syncChangedImages(changedFiles);
  }
  echo.good('Synchronization complete!');
  process.exit(0);
}

main().catch((e) => {
  echo.error('Error during synchronization: ' + e.message);
  process.exit(1);
});

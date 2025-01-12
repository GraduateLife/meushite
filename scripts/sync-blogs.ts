import { env } from '@/env';
import { echo } from '@/lib/echo';
import { syncChangedImages, syncChangedPosts } from '@/lib/post_utils/sync';
import { execSync } from 'child_process';

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

  // Handle different types of changes (M: modified, A: added, R: renamed, D: deleted)
  const changedFiles = changedFilesWithStatus
    .filter(({ path }) => path.startsWith('content/'))
    .flatMap(({ status, path }) => {
      if (status.startsWith('R')) {
        // For renamed files, the paths are in order: OLD_PATH\tNEW_PATH
        const [oldPath, newPath] = path.split('\t');
        echo.info(`Detected rename: ${oldPath} -> ${newPath}`);
        // Return the newPath since that's the file that actually exists
        return [newPath];
      }
      if (status === 'D') {
        echo.warn(`Skipping deleted file: ${path}`);
        return [];
      }
      return [path];
    });

  if (changedFiles.length === 0) {
    echo.info('No files to sync');
    return;
  }

  echo.info(`following files are changed: ${changedFiles.join(', ')}`);
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

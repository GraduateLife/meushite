import { env } from '@/env';
import { echo } from '@/lib/echo';
import { syncChangedImages, syncChangedPosts } from '@/lib/post_utils/sync';
import { execSync } from 'child_process';

async function main() {
  // Get the files changed in the commits that are about to be pushed
  const changedFiles = execSync('git diff --name-only HEAD @{u}')
    .toString()
    .trim()
    .split('\n')
    .filter(Boolean)
    // Only include files from content folder
    .filter((file) => file.startsWith(env.SITE_BLOG_LOCAL_STORAGE_DIR + '/'))
    // Filter out deleted files by checking if they exist
    .filter((file) => {
      try {
        execSync(`test -f ${file}`);
        return true;
      } catch {
        echo.warn(`Skipping deleted file: ${file}`);
        return false;
      }
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

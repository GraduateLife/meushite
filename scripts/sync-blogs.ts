import { echo } from '@/lib/echo';
import { syncChangedPosts } from '@/lib/post_utils/sync';
import { execSync } from 'child_process';

async function main() {
  // Get the files changed in the commits that are about to be pushed
  const changedFiles = execSync('git diff --name-only HEAD @{u}')
    .toString()
    .trim()
    .split('\n')
    .filter(Boolean);

  if (changedFiles.length === 0) {
    echo.info('No files to sync');
    return;
  }

  echo.info(`Syncing files: ${changedFiles.join(', ')}`);
  await syncChangedPosts(changedFiles);
  echo.good('Synchronization complete!');
  process.exit(0);
}

main().catch((e) => {
  echo.error('Error during synchronization: ' + e.message);
  process.exit(1);
});

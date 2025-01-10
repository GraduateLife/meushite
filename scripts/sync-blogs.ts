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
    console.log('No files to sync');
    return;
  }

  console.log('Syncing files:', changedFiles);
  await syncChangedPosts(changedFiles);
}

main().catch(console.error);

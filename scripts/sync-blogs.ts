import { syncChangedPosts } from '@/lib/post_utils/sync';
import { execSync } from 'child_process';

async function main() {
  // Get staged files
  const stagedFiles = execSync('git diff --cached --name-only')
    .toString()
    .trim()
    .split('\n')
    .filter(Boolean);

  // Get unstaged modified files
  const unstagedFiles = execSync('git diff --name-only')
    .toString()
    .trim()
    .split('\n')
    .filter(Boolean);

  // Combine all changed files
  const changedFiles = [...new Set([...stagedFiles, ...unstagedFiles])];

  await syncChangedPosts(changedFiles);
}

main().catch(console.error);

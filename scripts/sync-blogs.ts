import { deleteObject } from '@/cloudflare/r2';
import { env } from '@/env';
import { echo } from '@/lib/echo';
import { syncChangedImages, syncChangedPosts } from '@/lib/post_utils/sync';
import { execSync } from 'child_process';

async function main() {
  // Get all changes including untracked files
  const gitDiffOutput = execSync('git status --porcelain').toString().trim();
  console.log('Git status output:', gitDiffOutput); // Debug log

  const changedFilesWithStatus = gitDiffOutput
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      // git status --porcelain output has 2 characters for status
      // first character is staging status, second is working tree status
      const status = line.slice(0, 2).trim();
      const path = line.slice(3);
      return { status, path };
    });

  console.log('Changed files with status:', changedFilesWithStatus); // Debug log

  const toDeleteBucketKeys: string[] = [];
  const changedFiles = changedFilesWithStatus
    .filter(
      ({ path, status }) =>
        // Filter out deleted files (status starting with D)
        !status.startsWith('D') &&
        path.startsWith(env.SITE_BLOG_LOCAL_STORAGE_DIR + '/')
    )
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

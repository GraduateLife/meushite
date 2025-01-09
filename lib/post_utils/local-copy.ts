import { env } from '@/env';
import fs from 'fs';
import path from 'path';
import { echo, em, notice } from '../echo';
import { getAllLocalMdFiles } from './local-fetcher';

// Extract commonly used env variables
const { SITE_BLOG_LOCAL_STORAGE_DIR } = env;

export async function copyPostImagesToPublic() {
  // Get all markdown file paths
  const mdFiles = await getAllLocalMdFiles(
    path.join(process.cwd(), SITE_BLOG_LOCAL_STORAGE_DIR)
  );

  // Process each markdown file's directory
  mdFiles.forEach((mdFilePath) => {
    const mdDir = path.dirname(mdFilePath);

    // Get all files in the markdown file's directory
    fs.readdirSync(mdDir).forEach((file) => {
      if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file)) {
        echo.log(`found local image ${notice(file)} in ${em(mdDir)}`);
        const sourcePath = path.join(mdDir, file);

        const relativePath = path.relative(
          path.join(process.cwd(), SITE_BLOG_LOCAL_STORAGE_DIR),
          mdDir
        );
        const targetDir = path.join(process.cwd(), 'public', relativePath);
        const targetPath = path.join(targetDir, file);

        // Skip if the target file already exists and has the same size
        if (fs.existsSync(targetPath)) {
          const sourceStats = fs.statSync(sourcePath);
          const targetStats = fs.statSync(targetPath);

          if (sourceStats.size === targetStats.size) {
            echo.good(`Skipping ${file} because it already exists`);
            return;
          }
        }

        // Create directory if it doesn't exist
        fs.mkdirSync(targetDir, { recursive: true });
        echo.warn(`created target dir ${targetDir}`);

        // Copy the file
        fs.copyFileSync(sourcePath, targetPath);
        echo.warn(`copied file to ${targetPath}`);
      }
    });
  });
}

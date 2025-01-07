import fs from 'fs';
import path from 'path';
import { echo, em, notice } from '../echo';
import { getAllLocalMdFiles } from './retriever';
import { blogDirName } from './settings';

export function replaceImagePathsInLocal(
  content: string,
  folderName: string,
  findResourceIn?: string
): string {
  // Split content into frontmatter and main content
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const frontmatterMatch = content.match(frontmatterRegex);

  if (!frontmatterMatch) {
    return content;
  }

  const frontmatter = frontmatterMatch[1];
  const restContent = content.slice(frontmatterMatch[0].length);

  // Replace frontmatter coverImage with ./ paths
  const updatedFrontmatter = frontmatter.replace(
    /coverImage:\s*\.\/(.*?)(\s|$)/g,
    (_, imagePath) =>
      `coverImage: ${findResourceIn || `/${folderName}/`}${imagePath}`
  );

  // Replace markdown image syntax with configurable paths in the main content
  const updatedContent = restContent.replace(
    /\[([^\]]*)\]\(\.\/(.*?)\)/g,
    (_, altText, imagePath) => {
      return `[${altText}](${findResourceIn || `/${folderName}/`}${imagePath})`;
    }
  );

  return `---\n${updatedFrontmatter}\n---${updatedContent}`;
}

export async function copyPostImages() {
  // Get all markdown file paths
  const mdFiles = await getAllLocalMdFiles(
    path.join(process.cwd(), blogDirName)
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
          path.join(process.cwd(), blogDirName),
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

if (require.main === module) {
  copyPostImages();
}

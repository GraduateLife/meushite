const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function getLastChangedFile() {
  // Get the last changed file in the content directory
  const output = execSync('git status --porcelain content/').toString();
  const match = output.match(/\s*[AM]\s*(content\/.*\.md)/);
  return match ? match[1] : null;
}

function getPostTitle(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    // Assuming your posts have a title in frontmatter
    const titleMatch = content.match(/title:\s*["'](.+)["']/);
    return titleMatch ? titleMatch[1] : path.basename(filePath, '.md');
  } catch (error) {
    return path.basename(filePath, '.md');
  }
}

const changedFile = getLastChangedFile();
if (changedFile) {
  const title = getPostTitle(changedFile);
  console.log(`[post-update]:${title}`);
} else {
  console.log('📝 Update blog content');
}

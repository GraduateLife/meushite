const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function getLastChangedFiles() {
  // Get all changed files in the content directory
  const output = execSync('git status --porcelain content/').toString();
  // Match all modified or added markdown files
  const matches = output.matchAll(/\s*[AM]\s*(content\/.*\.md)/g);
  return Array.from(matches).map((match) => match[1]);
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

const changedFiles = getLastChangedFiles();
if (changedFiles.length === 0) {
  console.log('No content files changed');
  process.exit(0);
}

// Create commit message with all changed post titles
const titles = changedFiles.map((file) => getPostTitle(file));
const commitMessage =
  titles.length === 1
    ? `[post-update]:${titles[0]}`
    : `[post-update]: Updated ${titles.length} posts - ${titles.join(', ')}`;

console.log(`Uploading: ${titles.join(', ')}`);
execSync('git add .');
execSync(`git commit -m "${commitMessage}"`);
execSync('git push');

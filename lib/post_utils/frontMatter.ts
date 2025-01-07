// scripts/update-frontmatter.ts

import { myName } from '@/whoami/links';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { echo, notice } from '../echo';
import { slugToTitle } from '../utils';
import { cleanMarkdown } from './cleaner';
import { getAllLocalMdFiles, getPostTitleFromLocalPath } from './retriever';
import { blogDirName } from './settings';

const postsDirectory = path.join(process.cwd(), blogDirName);

function generateSlug(relativePath: string): string {
  return getPostTitleFromLocalPath(relativePath);
}

function generateTitle(slug: string): string {
  return slugToTitle(slug);
}

function generateTimestamp(): string {
  return new Date().toISOString();
}

function generateDescription(content: string): string {
  // Clean the markdown and get initial text
  const cleanText = cleanMarkdown(content);

  // Split by line breaks, list items, or headers
  const sentences = cleanText.split(
    /(?:\r?\n|\r){2,}|(?:\r?\n|\r)(?:[-*+]|\d+\.) |(?:\r?\n|\r)#{1,6} /
  );

  // Take first 2-3 chunks that total less than 160 chars (good for SEO)
  let description = '';
  for (const sentence of sentences) {
    const trimmedSentence = sentence.trim();
    if (trimmedSentence && description.length + trimmedSentence.length <= 160) {
      description += (description ? ' ' : '') + trimmedSentence;
    } else {
      break;
    }
  }

  return description || cleanText.substring(0, 160);
}

function generateAuthor(): string {
  return myName;
}

export async function updateFrontmatter() {
  const filePaths = await getAllLocalMdFiles(postsDirectory);

  filePaths.forEach((filePath) => {
    echo.log(`Checking frontmatter at ${filePath}`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data: originalData, content } = matter(fileContent);
    const data = { ...originalData }; // Create a copy to compare later

    const relativePath = path.relative(postsDirectory, filePath);
    const slug = generateSlug(relativePath);

    // Generate slug if not exists
    if (!data.slug) {
      data.slug = slug;
      echo.warn(`Generated fallback slug for ${filePath}`);
    }

    // Generate title from slug if not exists
    if (!data.title) {
      data.title = generateTitle(slug);
      echo.warn(`Generated fallback title for ${filePath}`);
    }

    // data.title = sentenceToTitle(data.title);

    // Add timestamp if not exists
    if (!data.timestamp) {
      data.timestamp = generateTimestamp();
    }

    // Add top if not exists
    if (!data.top) {
      data.top = false;
    }

    // Add description if not exists
    if (!data.description) {
      data.description = generateDescription(content);
      echo.warn(`Generated fallback description for ${filePath}`);
    }

    // Add keywords if not exists
    if (!data.keywords) {
      data.keywords = [];
      echo.warn(`Generated fallback keywords for ${filePath}`);
    }

    // Add author if not exists
    if (!data.author) {
      data.author = generateAuthor();
    }

    // Add coverImage if not exists

    // Check if any changes were made by comparing the original and modified data
    if (JSON.stringify(originalData) === JSON.stringify(data)) {
      echo.good('No changes needed');
      return;
    }

    // Create new frontmatter
    const newContent = matter.stringify(content, data);

    // Write back to file
    fs.writeFileSync(filePath, newContent);
  });
}

export async function updateFolderName() {
  const contentDirectory = path.join(process.cwd(), 'content');
  const folders = fs
    .readdirSync(contentDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  folders.forEach((folder) => {
    echo.log(`Checking if folder name ${notice(folder)} matches slug`);
    const indexPath = path.join(contentDirectory, folder, 'index.md');

    // Skip if index.md doesn't exist
    if (!fs.existsSync(indexPath)) {
      echo.warn(`No index.md found in ${folder}`);
      return;
    }

    // Read the index.md file
    const fileContent = fs.readFileSync(indexPath, 'utf8');
    const { data } = matter(fileContent);

    // Skip if no slug in frontmatter
    if (!data.slug) {
      echo.warn(`No slug found in ${indexPath}`);
      return;
    }

    // Skip if folder name already matches slug
    if (folder === data.slug) {
      echo.good(`No need to rename folder ${notice(folder)}`);
      return;
    }

    // Create new folder path
    const newFolderPath = path.join(contentDirectory, data.slug);

    // Rename folder
    try {
      fs.renameSync(path.join(contentDirectory, folder), newFolderPath);
      echo.warn(
        `Renamed folder ${notice(folder)} to ${notice(data.slug)}, new path of index.md: ${
          newFolderPath + '/index.md'
        }`
      );
    } catch (error) {
      echo.error(`Failed to rename ${folder}: ${error}`);
    }
  });
}

if (require.main === module) {
  updateFolderName();
  updateFrontmatter();
}

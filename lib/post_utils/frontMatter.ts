// scripts/update-frontmatter.ts

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { blogDirName } from './settings';
import { getAllMdFiles } from './retriever';
import { capitalizeWords } from '../utils';
import { cleanMarkdown } from './cleaner';

const postsDirectory = path.join(process.cwd(), blogDirName);

function generateSlug(relativePath: string): string {
  const parsedPath = path.parse(relativePath);
  return parsedPath.name === 'index'
    ? path.basename(path.dirname(parsedPath.dir))
    : parsedPath.name;
}

function generateTitle(slug: string): string {
  return capitalizeWords(slug);
}

function generateTimestamp(): string {
  return new Date().toISOString();
}

function generateDescription(content: string): string {
  return cleanMarkdown(content).substring(0, 100);
}

function generateAuthor(content: string): string {
  return 'John Doe';
}

export function updateFrontmatter() {
  const filePaths = getAllMdFiles(postsDirectory);

  filePaths.forEach((filePath) => {
    console.log('update frontmatter at filePath', filePath);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    const relativePath = path.relative(postsDirectory, filePath);
    const slug = generateSlug(relativePath);

    // Generate slug if not exists
    if (!data.slug) {
      data.slug = slug;
    }

    // Generate title from slug if not exists
    if (!data.title) {
      data.title = generateTitle(slug);
    }

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
    }

    // Add keywords if not exists
    if (!data.keywords) {
      data.keywords = [];
    }

    // Add author if not exists
    if (!data.author) {
      data.author = generateAuthor(content);
    }

    // Add coverImage if not exists

    // Create new frontmatter
    const newContent = matter.stringify(content, data);

    // Write back to file
    fs.writeFileSync(filePath, newContent);
  });
}

if (require.main === module) {
  updateFrontmatter();
}

// scripts/update-frontmatter.ts

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { blogDirName } from './settings';
import { getAllMdFiles } from './retriever';
import { capitalizeWords } from '../utils';
import { cleanMarkdown } from './cleaner';
import { myName } from '@/whoami/links';

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
  // Clean the markdown and get the first few sentences
  const cleanText = cleanMarkdown(content);
  const sentences = cleanText.match(/[^.!?]+[.!?]+/g) || [];

  // Take first 2-3 sentences that total less than 160 chars (good for SEO)
  let description = '';
  for (const sentence of sentences) {
    if (description.length + sentence.length <= 160) {
      description += sentence.trim() + ' ';
    } else {
      break;
    }
  }

  return description.trim();
}

function generateAuthor(content: string): string {
  return myName;
}

export function updateFrontmatter() {
  const filePaths = getAllMdFiles(postsDirectory);

  filePaths.forEach((filePath) => {
    console.log('Checking frontmatter at filePath', filePath);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    const relativePath = path.relative(postsDirectory, filePath);
    const slug = generateSlug(relativePath);

    // Generate slug if not exists
    if (!data.slug) {
      data.slug = slug;
      console.log('Generated fallback slug for ', filePath);
    }

    // Generate title from slug if not exists
    if (!data.title) {
      data.title = generateTitle(slug);
      console.log('Generated fallback title for ', filePath);
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
      console.log('Generated fallback description for ', filePath);
    }

    // Add keywords if not exists
    if (!data.keywords) {
      data.keywords = [];
      console.log('Generated fallback keywords for ', filePath);
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

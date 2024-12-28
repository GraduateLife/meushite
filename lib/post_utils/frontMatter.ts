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
  const slug =
    parsedPath.name === 'index'
      ? path.basename(path.dirname(relativePath))
      : parsedPath.name;
  console.log('in', slug);
  return slug;
}

function generateTitle(slug: string): string {
  return capitalizeWords(slug);
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
  const filePaths = await getAllMdFiles(postsDirectory);

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
      data.author = generateAuthor();
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

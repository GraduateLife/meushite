import { env } from '@/env';
import fs from 'fs';
import matter from 'gray-matter';
import { redirect } from 'next/navigation';
import path from 'path';
import { blogDirName, setImageMapping } from './settings';

export async function getAllLocalMdFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  const entries = await fs.promises.readdir(dir);

  for (const file of entries) {
    const fullPath = path.join(dir, file);
    const stat = await fs.promises.stat(fullPath);

    if (stat.isDirectory()) {
      const subFiles = await getAllLocalMdFiles(fullPath);
      files.push(...subFiles);
    } else if (file.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  return files;
}
// 123
export async function getOnePostFromLocalBySlug(slug: string): Promise<Post> {
  const thePath = path.join(
    process.cwd(),
    env.SITE_BLOG_LOCAL_STORAGE_DIR,
    slug,
    'index.md'
  );

  // Check if file exists before proceeding
  try {
    await fs.promises.access(thePath, fs.constants.F_OK);
  } catch (error) {
    redirect('/404');
  }
  const post = await convertOnePostFromLocalPath(thePath);

  return post;
}

async function convertOnePostFromLocalPath(fullPath: string): Promise<Post> {
  const rawPost = await fs.promises.readFile(fullPath, 'utf8');
  const { data, content } = matter(rawPost);
  const coverImage = data.coverImage?.startsWith('./')
    ? `${setImageMapping(fullPath)}/${data.coverImage.slice(2)}`
    : data.coverImage;

  const processedContent = content
    .replace(
      /\[([^\]]*)\]\(\.\/(.*?)\)/g,
      (_, altText, imagePath) =>
        `[${altText}](${setImageMapping(fullPath)}/${imagePath})`
    )
    .replace('[toc]', '## table of contents');

  return {
    title: data.title,
    content: processedContent,
    slug: data.slug,
    timestamp: data.timestamp,
    top: data.top,
    description: data.description,
    keywords: data.keywords,
    author: data.author,
    coverImage: coverImage ?? undefined,
  };
}

export async function getAllPostsFromLocal(): Promise<Post[]> {
  const postsDirectory = path.join(process.cwd(), blogDirName);
  const mdFiles = await getAllLocalMdFiles(postsDirectory);

  const posts = await Promise.all(
    mdFiles.map((fullPath) => convertOnePostFromLocalPath(fullPath))
  );

  return posts.sort((a, b) => {
    // First, sort by 'top' flag
    if (a.top && !b.top) return -1;
    if (!a.top && b.top) return 1;

    // Then sort by timestamp (latest first)
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);
    return dateB.getTime() - dateA.getTime();
  });
}

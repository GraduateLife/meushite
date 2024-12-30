import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { replaceImagePaths } from './copyImages';
import { blogDirName } from './settings';

export async function getAllMdFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  const entries = await fs.promises.readdir(dir);

  for (const file of entries) {
    const fullPath = path.join(dir, file);
    const stat = await fs.promises.stat(fullPath);

    if (stat.isDirectory()) {
      const subFiles = await getAllMdFiles(fullPath);
      files.push(...subFiles);
    } else if (file.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  return files;
}

export async function getAllPosts(): Promise<Post[]> {
  const postsDirectory = path.join(process.cwd(), blogDirName);
  const mdFiles = await getAllMdFiles(postsDirectory);

  const posts = await Promise.all(
    mdFiles.map(async (fullPath) => {
      const fileContents = await fs.promises.readFile(fullPath, 'utf8');
      const processedContent = replaceImagePaths(
        fileContents,
        path.basename(path.dirname(fullPath))
      );
      const { data, content } = matter(processedContent);

      return {
        title: data.title,
        content: content,
        slug: data.slug,
        timestamp: data.timestamp,
        top: data.top,
        description: data.description,
        keywords: data.keywords,
        author: data.author,
        coverImage: data.coverImage ?? undefined,
      };
    })
  );

  return posts.sort((a, b) => {
    // First, sort by 'top' flag
    if (a.top && !b.top) return -1;
    if (!a.top && b.top) return 1;

    // Then sort by timestamp (latest first)
    // Convert ISO strings to Date objects for comparison
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);
    return dateB.getTime() - dateA.getTime();
  });
}

export async function getManyPostsByCondition(
  fn: (post: Post) => boolean,
  notFoundFn?: () => void
): Promise<Post[]> {
  const posts = await getAllPosts();
  const matchingPosts = posts.filter(fn);
  if (matchingPosts.length === 0) {
    return notFoundFn?.() ?? [];
  }
  return matchingPosts;
}

export async function getOnePostByCondition(
  fn: (post: Post) => boolean,
  notFoundFn = () => {
    throw 'not found post';
  }
): Promise<Post | undefined> {
  const posts = await getAllPosts();
  const post = posts.find(fn);
  if (!post) {
    return notFoundFn();
  }
  return post;
}

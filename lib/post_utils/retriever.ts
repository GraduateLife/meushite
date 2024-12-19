import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { blogDirName } from './settings';
import { replaceImagePaths } from './copyImages';

export function getAllMdFiles(dir: string): string[] {
  const files: string[] = [];
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      files.push(...getAllMdFiles(fullPath));
    } else if (file.endsWith('.md')) {
      files.push(fullPath);
    }
  });
  return files;
}

export function getAllPosts(): Post[] {
  const postsDirectory = path.join(process.cwd(), blogDirName);
  const mdFiles = getAllMdFiles(postsDirectory);

  return mdFiles
    .map((fullPath) => {
      const fileContents = fs.readFileSync(fullPath, 'utf8');
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
    .sort((a, b) => {
      // First, sort by 'top' flag
      if (a.top && !b.top) return -1;
      if (!a.top && b.top) return 1;

      // Then sort by timestamp (latest first)
      return b.timestamp - a.timestamp;
    });
}

export function getManyPostsByCondition(
  fn: (post: Post) => boolean,
  notFoundFn?: () => void
) {
  const posts = getAllPosts();
  const matchingPosts = posts.filter(fn);
  if (matchingPosts.length === 0) {
    return notFoundFn?.() ?? [];
  }
  return matchingPosts;
}

export function getOnePostByCondition(
  fn: (post: Post) => boolean,
  notFoundFn?: () => void
) {
  const posts = getAllPosts();
  const post = posts.find(fn);
  if (!post) {
    return notFoundFn?.();
  }
  return post;
}

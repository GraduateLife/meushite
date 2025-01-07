import { RemoteAssetEndpoint } from '@/cloudflare/utils';
import { globalTitleSuffix } from '@/whoami/links';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { replaceImagePathsInLocal } from './copier';
import { blogDirName } from './settings';

const remoteBlogFolderImgUrlFromLocalPath = (fullPath: string) =>
  RemoteAssetEndpoint +
  '/content/' +
  path.basename(path.dirname(fullPath)) +
  '/';

export async function generatePostMetadata({
  params,
  fn,
}: {
  params: Promise<{ slug: string }>;
  fn: (slug: string) => Promise<Post>;
}) {
  const slug = (await params).slug;
  const post = await fn(slug);

  return {
    title: post.title + globalTitleSuffix,
    description: post.description,
    authors: [{ name: post.author }],
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.timestamp,
      authors: post.author ? [post.author] : undefined,
      tags: post.keywords,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

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

export const getPostTitleFromLocalPath = (blogPath: string) => {
  const parsedPath = path.parse(blogPath);
  const slug =
    parsedPath.name === 'index'
      ? path.basename(path.dirname(blogPath))
      : parsedPath.name;
  return slug;
};

export async function convertOnePostFromLocal(fullPath: string): Promise<Post> {
  const fileContents = await fs.promises.readFile(fullPath, 'utf8');
  const processedContent = replaceImagePathsInLocal(
    fileContents,
    path.basename(path.dirname(fullPath)),
    remoteBlogFolderImgUrlFromLocalPath(fullPath)
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
}

export async function convertAllPostsFromLocal(): Promise<Post[]> {
  const postsDirectory = path.join(process.cwd(), blogDirName);
  const mdFiles = await getAllLocalMdFiles(postsDirectory);

  const posts = await Promise.all(
    mdFiles.map((fullPath) => convertOnePostFromLocal(fullPath))
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

export async function getPostFromRemote(slug: string): Promise<Post> {
  const rawPost = await fetch(
    RemoteAssetEndpoint + '/content/' + slug + '/index.md'
  ).then((res) => res.text());
  const post = await convertOnePostFromRemote(rawPost);
  return post;
}

const convertOnePostFromRemote = async (rawPost: string): Promise<Post> => {
  const { data, content } = matter(rawPost);
  const processedContent = content.replace(
    /\[([^\]]*)\]\(\.\/(.*?)\)/g,
    (_, altText, imagePath) =>
      `[${altText}](${RemoteAssetEndpoint}/content/${data.slug}/${imagePath})`
  );
  // const processedContent = replaceImagePathsInLocal(
  //   content_d,
  //   RemoteAssetEndpoint + '/content/' + data_d.slug + '/',
  //   RemoteAssetEndpoint + '/content/' + data_d.slug + '/'
  // );
  // const { data, content } = matter(processedContent);

  // console.log(content);

  return {
    title: data.title,
    content: processedContent,
    slug: data.slug,
    timestamp: data.timestamp,
    top: data.top,
    description: data.description,
    keywords: data.keywords,
    author: data.author,
    coverImage: data.coverImage ?? undefined,
  };
};

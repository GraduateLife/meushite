import { env } from '@/env';
import { globalTitleSuffix } from '@/whoami/links';
import path from 'path';

// Extract commonly used env variables
const {
  SITE_BLOG_LOCAL_STORAGE_DIR,
  SITE_BLOG_REMOTE_STORAGE_PUBLIC_ENDPOINT_URL,
} = env;

export const blogDirName = SITE_BLOG_LOCAL_STORAGE_DIR;
export const indexFileName = 'public/search-index.json';

export const remoteResourceMapping = (fullPath: string) =>
  path.join(
    SITE_BLOG_REMOTE_STORAGE_PUBLIC_ENDPOINT_URL,
    SITE_BLOG_LOCAL_STORAGE_DIR,
    path.basename(path.dirname(fullPath))
  );

export const localResourceMapping = (fullPath: string): string => {
  const result = path.join('/', path.basename(path.dirname(fullPath)));
  return result;
};

export const remoteBlogUrl = (slug: string) =>
  path.join(
    SITE_BLOG_REMOTE_STORAGE_PUBLIC_ENDPOINT_URL,
    env.SITE_BLOG_LOCAL_STORAGE_DIR,
    slug,
    'index.md'
  );

export const fuseOptions = {
  isCaseSensitive: false,
  shouldSort: true,
  includeMatches: true,
  findAllMatches: true,
  minMatchCharLength: 1,
  keys: ['title', 'content', 'keywords'],
  threshold: 0.8,
};

export const setImageMapping = (urlInMd: string) => {
  switch (env.SITE_BLOG_IMAGE_READ_MODE) {
    case 'remote':
      return remoteResourceMapping(urlInMd);
    case 'local':
      return localResourceMapping(urlInMd);

    default:
      throw new Error('Invalid image read mode');
  }
};

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

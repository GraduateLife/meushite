import { hasObjectInBucket } from '@/cloudflare/r2';

import matter from 'gray-matter';
import { redirect } from 'next/navigation';
import { remoteBlogUrl } from './settings';

export async function getOnePostFromRemote(slug: string): Promise<Post> {
  const hasObject = await hasObjectInBucket(remoteBlogUrl(slug));
  if (!hasObject) {
    redirect('/404');
  }
  const rawPost = await fetch(remoteBlogUrl(slug)).then((res) => res.text());
  const post = await convertOnePostFromRemote(rawPost);
  return post;
}

const convertOnePostFromRemote = async (rawPost: string): Promise<Post> => {
  const { data, content } = matter(rawPost);
  const processedContent = content.replace(
    /\[([^\]]*)\]\(\.\/(.*?)\)/g,
    (_, altText, imagePath) =>
      `[${altText}](${remoteBlogUrl(data.slug)}/${imagePath})`
  );

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

// app/blogs/[slug]/page.tsx

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import remarkGfm from 'remark-gfm';
import { DisableViewTransitions } from '@/sections/Common/DisableViewTransitions';
import { Link } from 'next-view-transitions';
import { IconArrowLeft, IconArrowRight, IconCrown } from '@tabler/icons-react';
import { getAllPosts, getOnePostByCondition } from '@/lib/post_utils/retriever';
import Image from 'next/image';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipArrow,
} from '@radix-ui/react-tooltip';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// await wrapper to make nextjs happy
async function getPost(slug: string) {
  const posts = getAllPosts();
  const post = posts.find((post) => post.slug === slug);
  if (!post) {
    redirect('/404');
  }
  return post;
}

async function markdownToHtml(content: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkToc, {
      heading: 'Table of Contents', // This will be the TOC heading
      tight: true, // More compact list
    })
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypePrettyCode, {
      theme: 'one-dark-pro',
      keepBackground: true,
    })
    .use(rehypeStringify)
    .process(content);

  return String(result);
}

export async function generateMetadata({
  params,
}: UrlType<{ slug: string }, undefined>) {
  const slug = (await params).slug;
  const post = await getPost(slug);

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.content.substring(0, 200),
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

// Page component
export default async function Post({
  params,
}: UrlType<{ slug: string }, undefined>) {
  const slug = (await params).slug;

  const post = await getPost(slug);
  const contentHtml = await markdownToHtml(post.content);

  return (
    <DisableViewTransitions>
      <main className="max-w-[80vw] min-w-[50vw] px-4 md:px-16 py-4 bg-gray-200/70 dark:bg-gray-900/70 rounded-lg">
        {post.top && (
          <div className="flex items-center gap-2">
            <IconCrown className="w-8 h-8 fill-yellow-500 stroke-yellow-500" />
            <span className="text-2xl font-bold">Top</span>
          </div>
        )}

        <div>
          <h1 className="text-3xl xl:text-6xl">{post.title}</h1>
          {/* Author and metadata section */}
          <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
            {post.author && (
              <div className="flex flex-wrap items-center gap-1">
                <span>Written by {post.author}</span>
                <span>at</span>
                <span>
                  {new Date(post.timestamp).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            )}
            {post.keywords && post.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.keywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary">
                    {keyword}
                  </Badge>
                ))}
              </div>
            )}
            {post.coverImage && (
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover my-4"
                  width={1000}
                  height={1000}
                />
              </AspectRatio>
            )}
          </div>
        </div>
        <article className="prose dark:prose-invert prose-slate">
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </article>

        {/* Navigation buttons */}
        <NavigationButtons post={post} />
      </main>
    </DisableViewTransitions>
  );
}

// Generic tooltip component that can be used for both prev and next
function PostTooltip({
  text,
  direction,
}: {
  text: string;
  direction: 'prev' | 'next';
}) {
  const Icon = direction === 'prev' ? IconArrowLeft : IconArrowRight;

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Icon className="w-8 h-8" />
        </TooltipTrigger>
        <TooltipContent className="px-2 py-1 text-xs" side="bottom">
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

const NavigationButtons = ({ post }: { post: Post }) => {
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <>
      <div className="fixed left-4 md:left-40 top-1/2 -translate-y-1/2 ">
        {prevPost ? (
          <Link href={`/blogs/${prevPost.slug}`}>
            <PostTooltip
              direction="prev"
              text={`Previous Post: ${prevPost.title}`}
            />
          </Link>
        ) : (
          <IconArrowLeft className="w-8 h-8 opacity-50 cursor-not-allowed" />
        )}
      </div>

      <div className="fixed right-4 md:right-40 top-1/2 -translate-y-1/2">
        {nextPost ? (
          <Link href={`/blogs/${nextPost.slug}`}>
            <PostTooltip
              direction="next"
              text={`Next Post: ${nextPost.title}`}
            />
          </Link>
        ) : (
          <IconArrowRight className="w-8 h-8 opacity-50 cursor-not-allowed" />
        )}
      </div>
    </>
  );
};

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import {
  getAllPostsFromLocal,
  getOnePostFromLocalBySlug,
} from '@/lib/post_utils/local-fetcher';
import { markdownToHtml } from '@/lib/post_utils/md-parser';
import { generatePostMetadata } from '@/lib/post_utils/settings';

import { DisableViewTransitions } from '@/sections/Common/DisableViewTransitions';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { IconArrowLeft, IconArrowRight, IconCrown } from '@tabler/icons-react';
import { Link } from 'next-view-transitions';
import Image from 'next/image';

export const revalidate = 900; //seconds

export async function generateStaticParams() {
  const posts = await getAllPostsFromLocal();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// await wrapper to make nextjs happy
async function getPost(slug: string) {
  // const posts = await convertAllPostsFromLocal();
  // const post = posts.find((post) => post.slug === slug);
  const post = await getOnePostFromLocalBySlug(slug);
  return post;
}

export async function generateMetadata({
  params,
}: UrlType<{ slug: string }, undefined>) {
  return generatePostMetadata({
    params,
    fn: getPost,
  });
}

// Page component
export default async function Post({
  params,
}: UrlType<{ slug: string }, undefined>) {
  const slug = (await params).slug;
  const post = await getPost(slug);
  const contentHtml = await markdownToHtml(post.content);

  // Fetch navigation data here instead of in the NavigationButtons component
  const allPosts = await getAllPostsFromLocal();
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <DisableViewTransitions>
      <main className="min-w-[50vw] max-w-[80vw] rounded-lg bg-gray-200/70 px-4 py-4 dark:bg-gray-900/70 md:px-16">
        {post.top && (
          <div className="flex items-center gap-2">
            <IconCrown className="h-8 w-8 fill-yellow-500 stroke-yellow-500" />
            <span className="text-2xl font-bold">Top</span>
          </div>
        )}

        <div>
          <h1 className="text-3xl xl:text-4xl">{post.title}</h1>
          {/* Author and metadata section */}
          <div className="mb-8 flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-400">
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
                  className="my-4 h-full w-full object-cover"
                  width={1000}
                  height={1000}
                />
              </AspectRatio>
            )}
          </div>
        </div>
        <article className="prose prose-slate dark:prose-invert mx-auto">
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </article>

        {/* Pass the pre-fetched data to a non-async NavigationButtons */}
        <NavigationButtons prevPost={prevPost} nextPost={nextPost} />
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
          <Icon className="h-8 w-8" />
        </TooltipTrigger>
        <TooltipContent className="px-2 py-1 text-xs" side="bottom">
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Make NavigationButtons a regular client component
const NavigationButtons = ({
  prevPost,
  nextPost,
}: {
  prevPost: Post | null;
  nextPost: Post | null;
}) => {
  return (
    <>
      <div className="fixed left-4 top-1/2 -translate-y-1/2 md:left-40">
        {prevPost ? (
          <Link href={`/blogs/${prevPost.slug}`}>
            <PostTooltip
              direction="prev"
              text={`Previous Post: ${prevPost.title}`}
            />
          </Link>
        ) : (
          <IconArrowLeft className="h-8 w-8 cursor-not-allowed opacity-50" />
        )}
      </div>

      <div className="fixed right-4 top-1/2 -translate-y-1/2 md:right-40">
        {nextPost ? (
          <Link href={`/blogs/${nextPost.slug}`}>
            <PostTooltip
              direction="next"
              text={`Next Post: ${nextPost.title}`}
            />
          </Link>
        ) : (
          <IconArrowRight className="h-8 w-8 cursor-not-allowed opacity-50" />
        )}
      </div>
    </>
  );
};

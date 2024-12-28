import { GlareCard } from '@/components/ui/glare-card';

import { getAllPosts } from '@/lib/post_utils/retriever';

import Link from 'next/link';
import { cleanMarkdown } from '@/lib/post_utils/cleaner';
import { IconCrown, IconTags } from '@tabler/icons-react';
import { Badge } from '@/components/ui/badge';
import { Metadata } from 'next';
import { globalTitleSuffix } from '@/whoami/links';

export const metadata: Metadata = {
  title: 'My Blogs' + globalTitleSuffix,
  description:
    'Explore articles about web development, cloud computing, and software engineering. Personal insights and technical tutorials from a Full Stack Developer.',
  keywords: [
    'tech blog',
    'web development',
    'software engineering',
    'coding tutorials',
    'nextjs',
    'cloud computing',
    'full stack',
    'development tips',
    'programming insights',
    'technical writing',
    'software architecture',
  ],
};

export const revalidate = 900; //seconds

export default async function BlogIndex() {
  // const category = (await searchParams).category;
  const posts = await getAllPosts();
  // const filteredPosts =
  //   category === undefined
  //     ? posts
  //     : posts.filter((post) => post.category && post.category === category);
  // const currentCategory = category || 'all';

  return (
    <div className="flex flex-col">
      {/* <BlogSidebar posts={posts} currentCategory={currentCategory} /> */}
      {/* Main content */}
      <main className="">
        <h1 className="mb-8 text-3xl font-bold">All Blog Posts</h1>

        <div className="space-y-6">
          {/* {filteredPosts.length === 0 && (
            <div className="text-2xl font-bold flex-1">
              No posts found in this category
            </div>
          )} */}
          {posts.map((post) => {
            return (
              <Link
                href={`/blogs/${post.slug}`}
                key={post.slug}
                className="group"
              >
                <GlareCard
                  sizeClassName="w-[360px] md:w-[800px] h-[180px] md:h-[120px] my-4"
                  className="px-6 py-4"
                >
                  <div className="flex items-center justify-between">
                    <article className="">
                      <h2 className="mb-2 flex items-center gap-2 text-2xl font-semibold text-white transition-colors group-hover:text-blue-500">
                        {post.top && (
                          <IconCrown className="inline-block h-8 w-8 fill-yellow-500 stroke-yellow-500" />
                        )}
                        <p className="max-w-[250px] truncate md:max-w-[500px]">
                          {post.title}
                        </p>
                      </h2>

                      <p className="max-w-[280px] truncate text-gray-400 md:max-w-[700px]">
                        {cleanMarkdown(post.content)}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-4">
                        <div>
                          {post.author && (
                            <div className="italic text-gray-400">
                              by {post.author}
                            </div>
                          )}
                        </div>
                        <div>
                          {post.keywords && post.keywords.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2">
                              <IconTags className="h-5 w-5 text-gray-400" />
                              <div className="flex flex-wrap gap-2">
                                {post.keywords.map((keyword) => (
                                  <Badge
                                    className="bg-gray-700 text-xs text-gray-200"
                                    key={keyword}
                                  >
                                    {keyword}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </article>
                  </div>
                </GlareCard>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}

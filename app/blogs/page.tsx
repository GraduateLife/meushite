import { GlareCard } from '@/components/ui/glare-card';

import { getAllPosts } from '@/lib/post_utils/retriever';

import Link from 'next/link';
import { BlogSidebar } from '@/sections/Blogs/BlogSideBar';
import { cleanMarkdown } from '@/lib/post_utils/cleaner';
import { redirect } from 'next/navigation';
import { IconCrown, IconTags } from '@tabler/icons-react';
import { Badge } from '@/components/ui/badge';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blogs',
  description: 'Blogs about my life and thoughts to latest tech',
};

export default async function BlogIndex() {
  // const category = (await searchParams).category;
  const posts = await getAllPosts();
  // const filteredPosts =
  //   category === undefined
  //     ? posts
  //     : posts.filter((post) => post.category && post.category === category);
  // const currentCategory = category || 'all';

  return (
    <div className="flex flex-col ">
      {/* <BlogSidebar posts={posts} currentCategory={currentCategory} /> */}
      {/* Main content */}
      <main className="">
        <h1 className="text-3xl font-bold mb-8">All Blog Posts</h1>

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
                  <div className="flex justify-between items-center">
                    <article className="">
                      <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-500 transition-colors text-white flex items-center gap-2">
                        {post.top && (
                          <IconCrown className="w-8 h-8 fill-yellow-500 stroke-yellow-500 inline-block" />
                        )}
                        <p className="truncate max-w-[250px] md:max-w-[500px]">
                          {post.title}
                        </p>
                      </h2>

                      <p className="text-gray-400 truncate max-w-[280px] md:max-w-[700px]">
                        {cleanMarkdown(post.content)}
                      </p>
                      <div className="flex gap-4 mt-2 flex-wrap">
                        <div>
                          {post.author && (
                            <div className="text-gray-400 italic">
                              by {post.author}
                            </div>
                          )}
                        </div>
                        <div>
                          {post.keywords && post.keywords.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2">
                              <IconTags className="w-5 h-5 text-gray-400" />
                              <div className="flex gap-2 flex-wrap">
                                {post.keywords.map((keyword) => (
                                  <Badge
                                    className="text-xs bg-gray-700 text-gray-200"
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

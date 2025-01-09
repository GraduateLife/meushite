import { MetadataRoute } from 'next';

import { getAllPostsFromLocal } from '@/lib/post_utils/local-fetcher';
import { domainUrl } from '../whoami/links';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get your blog posts from your database/CMS/file system
  // This is just an example - replace with your actual data fetching logic
  const blogs = await getAllPostsFromLocal(); // Your fetch function

  const blogUrls = blogs.map((post) => ({
    url: `${domainUrl}/blogs/${post.slug}`,
    lastModified: post.timestamp,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: domainUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${domainUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${domainUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    // Add your blog post URLs
    ...blogUrls,
  ];
}

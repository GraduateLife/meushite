import type { NextConfig } from 'next';
import { generateSearchIndex } from './lib/post_utils/indexer';
import { copyPostImages } from './lib/post_utils/copyImages';

const nextConfig: NextConfig = {
  output: process.env.DOCKER_BUILD === 'true' ? 'standalone' : undefined,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  webpack: (config, { isServer }) => {
    // Run only once on the server side
    if (isServer) {
      copyPostImages();
      generateSearchIndex();
    }
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.microlink.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

// Merge MDX config with Next.js config
export default nextConfig;

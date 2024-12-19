import type { NextConfig } from 'next';
import { generateSearchIndex } from './lib/post_utils/indexer';
import { copyPostImages } from './lib/post_utils/copyImages';

// class ContentProcessingPlugin {
//   static pluginName = 'ContentProcessingPlugin';

//   apply(compiler: any) {
//     // Use emit hook instead of beforeRun
//     // emit runs right before emitting assets to output directory
//     compiler.hooks.emit.tapPromise(
//       ContentProcessingPlugin.pluginName,
//       async (compilation: any) => {
//         try {
//           copyPostImages();
//           generateSearchIndex();
//         } catch (error) {
//           compilation.errors.push(error as Error);
//         }
//       }
//     );
//   }
// }

const nextConfig: NextConfig = {
  output: process.env.DOCKER_BUILD === 'true' ? 'standalone' : undefined,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],

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

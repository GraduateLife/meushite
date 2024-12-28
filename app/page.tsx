import { OrbitingCirclesDemo } from '@/sections/HomePage/CodeCloud';
import { Story } from '@/sections/HomePage/HeroSection';
import React from 'react';
import { Metadata } from 'next';
import { globalTitleSuffix } from '@/whoami/links';
export const metadata: Metadata = {
  title: 'Home' + globalTitleSuffix,
  description:
    'Welcome to my personal space where I share my thoughts through blogs and showcase my professional work and projects',
  keywords: [
    'developer',
    'nextjs',
    'nodejs',
    'responsive',
    'accessible',
    'web development',
    'full stack',
    'portugal',
    'programming',
  ],
};

const Page = () => {
  return (
    <>
      <div className="max-w-[500px] md:max-w-[800px]">
        <Story></Story>
      </div>
      <div className="max-w-[500px]">
        <OrbitingCirclesDemo />
      </div>
    </>
  );
};

export default Page;

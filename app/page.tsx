import { OrbitingCirclesDemo } from '@/sections/HomePage/CodeCloud';
import { Story } from '@/sections/HomePage/HeroSection';
import React from 'react';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Home',
  description:
    'Welcome to my personal space where I share my thoughts through blogs and showcase my professional work and projects',
};

export default function () {
  return <HeroSection></HeroSection>;
}

const HeroSection = () => {
  return (
    <>
      <div className="max-w-[500px]">
        <Story></Story>
      </div>
      <div className="max-w-[500px]">
        <OrbitingCirclesDemo />
      </div>
    </>
  );
};

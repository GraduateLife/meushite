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
    <div className="mx-auto">
      <div className="md:grid md:grid-cols-12 gap-2  h-full sm:flex sm:flex-col">
        <div className="md:col-start-2 md:col-span-5 sm:col-span-12 sm:w-full">
          <Story></Story>
        </div>
        <div className=" md:col-span-5 sm:col-span-12 p-4">
          <OrbitingCirclesDemo />
        </div>
      </div>
    </div>
  );
};

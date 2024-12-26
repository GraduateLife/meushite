'use client';
import React, { useEffect, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion';
import { cn } from '@/lib/utils';

import { Link } from 'next-view-transitions';
import useIsOnPC from '@/hooks/useIsPC';

export const FloatingNav = ({
  navItems,
  className,
  OtherComponents,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
  OtherComponents?: React.ReactNode;
}) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(false);
  const isPc = useIsOnPC();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isPc && event.clientY < 100) {
        // Show when mouse is within 100px from top
        setVisible(true);
      } else if (!isPc) {
        setVisible(true);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // useMotionValueEvent(scrollYProgress, 'change', (current) => {
  //   // Check if current is not undefined and is a number
  //   if (typeof current === 'number') {
  //     let direction = current! - scrollYProgress.getPrevious()!;

  //     if (scrollYProgress.get() < 0.05) {
  //       setVisible(true);
  //     } else {
  //       if (direction !== 0) {
  //         setVisible(true);
  //       } else {
  //         setVisible(false);
  //       }
  //     }
  //   }
  // });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          'flex max-w-fit gap-x-4 fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black/50 bg-white/50 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 px-4 items-center justify-center space-x-4',
          className
        )}
      >
        {navItems.map((navItem: any, idx: number) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              'relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600  dark:hover:decoration-neutral-50 hover:decoration-neutral-600 hover:underline'
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-sm">{navItem.name}</span>
          </Link>
        ))}
        {OtherComponents}
      </motion.div>
    </AnimatePresence>
  );
};

'use client';

import { useEffect } from 'react';

const useSmoothScroll = () => {
  useEffect(() => {
    // Handle all anchor clicks for smooth scrolling
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' &&
        target.getAttribute('href')?.startsWith('#')
      ) {
        e.preventDefault();
        const id = target.getAttribute('href')?.slice(1);
        const element = document.getElementById(id!);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
          });
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
};

export function DisableViewTransitions({
  children,
}: {
  children: React.ReactNode;
}) {
  useSmoothScroll();
  useEffect(() => {
    // Disable view transitions for this page
    document.documentElement.style.setProperty('view-transition-name', 'www');

    // Clean up when component unmounts
    return () => {
      document.documentElement.style.removeProperty('view-transition-name');
    };
  }, []);

  return <>{children}</>;
}

'use client';

import { useTheme } from 'next-themes';
import * as React from 'react';
import { IconMoon, IconSun } from '@tabler/icons-react';
import useIsClient from '@/hooks/useIsClient';

export function DarkModeBtn() {
  const { setTheme, theme } = useTheme();

  const isClient = useIsClient();

  if (!isClient) {
    return <></>;
  }

  return (
    <>
      {theme === 'light' && (
        <div
          className="relative cursor-pointer size-[28px] flex justify-center items-center flex-shrink-0"
          onClick={() => {
            if (document && document.startViewTransition) {
              document.startViewTransition(() => setTheme('dark'));
            } else {
              setTheme('dark');
            }
          }}
        >
          <IconSun className="size-7 bg-transparent fill-amber-500 stroke-amber-500 blur-sm hover:blur-md transition-all absolute"></IconSun>
          <IconSun className="size-7 bg-transparent fill-amber-500 stroke-amber-500 z-2"></IconSun>
        </div>
      )}
      {theme === 'dark' && (
        <div
          className="relative cursor-pointer size-[28px] flex justify-center items-center flex-shrink-0"
          onClick={() => {
            if (document && document.startViewTransition) {
              document.startViewTransition(() => setTheme('light'));
            } else {
              setTheme('light');
            }
          }}
        >
          <IconMoon className="size-7 bg-transparent fill-amber-200 stroke-amber-200 blur-sm hover:blur-md transition-all absolute"></IconMoon>
          <IconMoon className="size-7 bg-transparent fill-amber-200 stroke-amber-200 z-2"></IconMoon>
        </div>
      )}
    </>
  );
}

'use client';

import useIsClient from '@/hooks/useIsClient';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { useTheme } from 'next-themes';

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
          className="relative flex size-[28px] flex-shrink-0 cursor-pointer items-center justify-center"
          onClick={() => {
            if (document && document.startViewTransition) {
              document.startViewTransition(() => setTheme('dark'));
            } else {
              setTheme('dark');
            }
          }}
        >
          <IconSun className="absolute size-7 bg-transparent fill-amber-500 stroke-amber-500 blur-sm transition-all hover:blur-md"></IconSun>
          <IconSun className="z-2 size-7 bg-transparent fill-amber-500 stroke-amber-500"></IconSun>
        </div>
      )}
      {theme === 'dark' && (
        <div
          className="relative flex size-[28px] flex-shrink-0 cursor-pointer items-center justify-center"
          onClick={() => {
            if (document && document.startViewTransition) {
              document.startViewTransition(() => setTheme('light'));
            } else {
              setTheme('light');
            }
          }}
        >
          <IconMoon className="absolute size-7 bg-transparent fill-amber-200 stroke-amber-200 blur-sm transition-all hover:blur-md"></IconMoon>
          <IconMoon className="z-2 size-7 bg-transparent fill-amber-200 stroke-amber-200"></IconMoon>
        </div>
      )}
    </>
  );
}

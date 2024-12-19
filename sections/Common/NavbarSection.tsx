'use client';
import React from 'react';
import {
  IconBook,
  IconHome,
  IconMessage,
  IconPlus,
  IconUser,
} from '@tabler/icons-react';
import { FloatingNav } from '@/components/ui/floating-navbar';
import { DarkModeBtn } from '@/components/providers/DarkModeBtn';
import DialogDemo from './SearchModal';
import { navLinks } from './NavbarLinks';

export type NavLinkComponent = NavLink & {
  icon: JSX.Element;
};

const navLinkComponents: NavLinkComponent[] = navLinks.map((item) => {
  const icons = {
    Home: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    Profile: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    Contact: (
      <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
    ),
    Blogs: <IconBook className="h-4 w-4 text-neutral-500 dark:text-white" />,
  };

  return {
    ...item,
    icon: icons[item.name as keyof typeof icons],
  };
});

{
  /* <DialogDemo />
<div className="py-2">
  <DarkModeBtn />
</div> */
}

export function NavbarSection() {
  return (
    <div className="w-full">
      <FloatingNav
        navItems={navLinkComponents}
        OtherComponents={
          <>
            <DialogDemo />
            <DarkModeBtn />
          </>
        }
      />
    </div>
  );
}

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

export const navLinks: NavLink[] = [
  {
    name: 'Home',
    link: '/',
    icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: 'Profile',
    link: '/profile',
    icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: 'Contact',
    link: '/contact',
    icon: <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: 'Blogs',
    link: '/blogs',
    icon: <IconBook className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
];

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
        navItems={navLinks}
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

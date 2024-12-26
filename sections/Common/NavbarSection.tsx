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
import useIsOnPC from '@/hooks/useIsPC';

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
  const isOnPc = useIsOnPC();
  // if (!isOnPc) {
  //   return (
  //     <div className="sm-w-[90%] w-full min-w-[400px]">
  //       <FloatingNav
  //         navItems={navLinkComponents}
  //         OtherComponents={
  //           <>
  //             <DarkModeBtn />
  //           </>
  //         }
  //       />
  //     </div>
  //   );
  // }
  return (
    <div className="sm-w-[90%] w-full min-w-[400px]">
      <FloatingNav
        navItems={navLinkComponents}
        OtherComponents={
          <>
            <div className="hidden md:inline-flex">
              <DialogDemo />
            </div>
            <DarkModeBtn />
          </>
        }
      />
    </div>
  );
}

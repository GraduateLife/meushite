'use client';

import Link from 'next/link';

const categories = ['all'];
export const BlogSidebar = ({
  posts,
  currentCategory,
}: {
  posts: Post[];
  currentCategory: string;
}) => {
  return (
    <aside className="sticky top-0 w-64 p-6">
      <nav className="space-y-2">
        {categories.map((category) => {
          const isSelected = currentCategory === category;
          const baseClasses =
            'block px-3 py-2 rounded-lg dark:text-white transition-colors';
          const hoverClasses = 'hover:bg-blue-500/20 dark:hover:bg-blue-700/20';
          const selectedClasses =
            'bg-blue-500 dark:bg-blue-700 text-white dark:text-black';

          return (
            <Link
              key={category}
              href={
                category === 'all' ? '/blogs' : `/blogs?category=${category}`
              }
              className={`${baseClasses} ${
                isSelected ? selectedClasses : hoverClasses
              }`}
              onMouseEnter={(e) => {
                if (isSelected) {
                  e.currentTarget.classList.remove(
                    'hover:bg-blue-500',
                    'dark:hover:bg-blue-700'
                  );
                }
              }}
              //   onMouseLeave={(e) => {
              //     if (isSelected) {
              //       e.currentTarget.classList.add(
              //         'hover:bg-orange-500',
              //         'dark:hover:bg-orange-700'
              //       );
              //     }
              //   }}
            >
              {category === 'all'
                ? `All (${posts.length})`
                : category.charAt(0).toUpperCase() + category.slice(1)}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

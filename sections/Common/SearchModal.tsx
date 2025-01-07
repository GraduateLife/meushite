// Dependencies: pnpm install lucide-react

'use client';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cleanMarkdown } from '@/lib/post_utils/cleaner';
import { useSearch } from '@/lib/post_utils/searcher';
import {
  IconArrowRight,
  IconArrowUpRight,
  IconSearch,
} from '@tabler/icons-react';
import debounce from 'lodash/debounce';
import { Link } from 'next-view-transitions';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useMemo } from 'react';
import { For } from '../../components/ui/util/For';
import { If } from '../../components/ui/util/If';
import { navLinks } from './NavbarLinks';

export default function DialogDemo() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isSearching, setIsSearching] = React.useState(false);
  const searchResults = useSearch(searchQuery);

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        if (value.length === 0) {
          setIsSearching(false);
          return;
        }
        if (value.startsWith('#')) {
          setIsSearching(true);
          setSearchQuery(value.split('#')[1].trim());
        }
      }, 100),
    []
  );

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => {
      document.removeEventListener('keydown', down);
    };
  }, []);

  return (
    <>
      <button
        className="inline-flex h-9 w-fit rounded-lg border border-input bg-white/50 px-3 py-2 text-sm text-foreground shadow-sm shadow-black/5 transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 dark:bg-black/70"
        onClick={() => {
          setIsSearching(false);
          setOpen(true);
        }}
      >
        <span className="flex grow items-center">
          <IconSearch
            className="-ms-1 me-3 text-muted-foreground/80"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
          <span className="font-normal text-muted-foreground/70">Search</span>
        </span>
        <kbd className="-me-1 ms-12 inline-flex h-5 max-h-full items-center rounded border border-border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
          ⌘K
        </kbd>
      </button>
      <CommandDialog
        open={open}
        onOpenChange={(value) => {
          setOpen(value);
          setIsSearching(false);
        }}
      >
        <CommandInput
          placeholder="type commands, or type # to search blogs"
          onValueChange={(value) => {
            debouncedSearch(value);
          }}
        />
        <CommandList>
          <If condition={isSearching === false}>
            <CommandEmpty>No commands found.</CommandEmpty>
          </If>

          <If condition={isSearching === true}>
            <div className="p-2 text-center text-sm font-thin text-stone-600 transition-all duration-300">
              Continue typing to find the blogs you want
            </div>
            <If condition={searchResults.length === 0}>
              <CommandEmpty>No blogs found.</CommandEmpty>
            </If>
            <If condition={searchResults.length > 0}>
              <For each={searchResults}>
                {(item: {
                  refIndex: number;
                  item: {
                    title: string;
                    content: string;
                    slug: string;
                  };
                }) => (
                  <div
                    className={`cursor-pointer rounded-md p-2 text-sm font-normal text-foreground hover:bg-accent`}
                    key={item.refIndex}
                    onClick={() => {
                      setSearchQuery('');
                      router.push('/blogs/' + item.item.slug);
                      setOpen(false);
                    }}
                  >
                    <div className="flex justify-between gap-2">
                      <div className="inline-flex items-center gap-1">
                        <span className="w-[100px] truncate text-muted-foreground">
                          {item.item.title}
                        </span>
                        <IconArrowRight
                          size={16}
                          strokeWidth={2}
                          className="text-muted-foreground"
                        />
                        <span className="max-w-[200px] truncate text-muted-foreground">
                          {cleanMarkdown(item.item.content)}
                        </span>
                      </div>

                      <span className="text-muted-foreground truncate w-[160px]">
                        {' /blogs/' + item.item.slug}
                      </span>
                    </div>
                  </div>
                )}
              </For>
            </If>
          </If>

          <CommandGroup heading="Navigation">
            <For each={navLinks}>
              {(item: NavLink) => (
                <Link href={item.link} key={item.link}>
                  <CommandItem
                    onSelect={() => {
                      React.startTransition(() => {
                        setIsSearching(false);
                        setOpen(false);
                        window.location.href = item.link;
                      });
                    }}
                  >
                    <IconArrowUpRight
                      size={16}
                      strokeWidth={2}
                      className="opacity-60"
                      aria-hidden="true"
                    />
                    <span>{'Go to ' + item.name}</span>
                  </CommandItem>
                </Link>
              )}
            </For>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

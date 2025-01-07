'use client';

import Fuse, { FuseResult } from 'fuse.js';
import { useEffect, useState } from 'react';
import searchIndex from '../../public/search-index.json' assert { type: 'json' };
import { fuseOptions } from './settings';

const thisFuse = new Fuse(searchIndex, fuseOptions);

// In your search component:
export const useSearch = (query: string) => {
  const [searchResults, setSearchResults] = useState<FuseResult<PostIndex>[]>(
    []
  );

  useEffect(() => {
    const results = thisFuse.search(query);
    setSearchResults(results);
  }, [query]);

  return searchResults;
};

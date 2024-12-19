'use client';

import Fuse, { FuseResult } from 'fuse.js';
import { useState, useEffect } from 'react';
import searchIndex from '../../public/search-index.json' assert { type: 'json' };
import { fuseOptions } from './settings';

// console.log(searchIndex);

const thisFuse = new Fuse(searchIndex, fuseOptions);

// const results = thisFuse.search('this is');

// console.log('test results', results);

// In your search component:
export const useSearch = (query: string) => {
  const [searchResults, setSearchResults] = useState<FuseResult<any>[]>([]);

  useEffect(() => {
    const results = thisFuse.search(query);
    console.log('results in hook', results);
    setSearchResults(results);
  }, [query]);

  return searchResults;
};

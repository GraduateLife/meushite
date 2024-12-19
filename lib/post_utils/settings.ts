export const blogDirName = 'content';
export const indexFileName = 'public/search-index.json';

export const fuseOptions = {
  isCaseSensitive: false,
  shouldSort: true,
  includeMatches: true,
  findAllMatches: true,
  minMatchCharLength: 1,
  keys: ['title', 'content', 'keywords'],
  threshold: 0.8,
};

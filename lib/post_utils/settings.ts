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
//NOTE - cannot use this in the blog page because it's an async function, nodejs doesn't recognize it
// export async function markdownToHtml(content: string) {
//   const result = await unified()
//     .use(remarkParse)
//     .use(remarkGfm)
//     .use(remarkToc, {
//       heading: 'Table of Contents', // This will be the TOC heading
//       tight: true, // More compact list
//     })
//     .use(remarkRehype)
//     .use(rehypeSlug)
//     .use(rehypePrettyCode, {
//       theme: 'one-dark-pro',
//       keepBackground: true,
//     })
//     .use(rehypeStringify)
//     .process(content);

//   return String(result);
// }

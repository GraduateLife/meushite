import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkToc from 'remark-toc';
import { unified } from 'unified';

export async function markdownToHtml(content: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkToc, {
      heading: 'Table of Contents', // This will be the TOC heading
      tight: true, // More compact list
    })
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypePrettyCode, {
      theme: 'one-dark-pro',
      keepBackground: true,
    })
    .use(rehypeStringify)
    .process(content);

  return String(result);
}

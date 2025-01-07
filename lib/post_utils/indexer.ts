import fs from 'fs';
import { cleanMarkdown } from './cleaner';
import { updateFrontmatter } from './frontMatter';
import { convertAllPostsFromLocal } from './retriever';
import { indexFileName } from './settings';

export async function generateSearchIndex() {
  updateFrontmatter();
  const posts = await convertAllPostsFromLocal();

  const searchIndex = posts.map((post) => ({
    title: post.title,
    content: cleanMarkdown(post.content),
    slug: post.slug,
    keywords: post.keywords,
  }));
  fs.writeFileSync(indexFileName, JSON.stringify(searchIndex));

  return searchIndex;
}

if (require.main === module) {
  generateSearchIndex();
}

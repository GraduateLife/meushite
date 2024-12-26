import { indexFileName } from './settings';
import { updateFrontmatter } from './frontMatter';
import fs from 'fs';
import { getAllPosts } from './retriever';
import { cleanMarkdown } from './cleaner';

export async function generateSearchIndex() {
  updateFrontmatter();
  const posts = await getAllPosts();

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

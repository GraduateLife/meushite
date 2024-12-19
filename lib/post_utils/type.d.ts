declare type Post = {
  title: string;
  content: string;
  slug: string;
  timestamp: string;
  top: boolean;
  description: string;
  keywords: string[];
  author: string;
  coverImage?: string;
  category?: string;
  // Add other post properties as needed
};

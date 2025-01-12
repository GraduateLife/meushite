import 'highlight.js/styles/github.css';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeSlug from 'rehype-slug';

import { cn } from '@/lib/utils';
import { IconCode } from '@tabler/icons-react';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import { CopyButton } from '../Common/CopyButton';
export const MdRenderer = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[
        remarkGfm,
        [
          remarkToc,
          {
            heading: 'table of contents',
            tight: true,
          },
        ],
      ]}
      rehypePlugins={[rehypeSlug]}
      className="prose prose-slate dark:prose-invert mx-auto"
      components={{
        p: ({ children, ...props }) => {
          return <section {...props}>{children}</section>;
        },
        img: ({ src, alt }) => {
          return (
            <Image
              src={src!}
              alt={alt!}
              className="object-contain"
              width={1000}
              height={1000}
            />
          );
        },
        // Add code block support
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        code: ({ inline, className, children, ...props }: any) => {
          const match = /language-(\w+)/.exec(className || 'plaintext');
          return !inline && match ? (
            <div>
              <div className="inline-flex items-center gap-2">
                <IconCode className="h-4 w-4" />
                <span>{match[1]}</span>
              </div>
              <div className="relative">
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  className="select-all"
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
                <div className="absolute top-0 right-0">
                  <CopyButton
                    variant="ghost"
                    copyIconClassName="text-white"
                    text={String(children)}
                  />
                </div>
              </div>
            </div>
          ) : (
            <code
              className={cn(
                'bg-muted p-1 rounded-md select-all cursor-pointer ',
                className
              )}
              {...props}
            >
              {children}
            </code>
          );
        },
        // Add table support
        table: ({ children }) => (
          <div className="my-4 overflow-x-auto">
            <table className="min-w-full border-collapse">{children}</table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border border-border px-4 py-2 bg-muted font-medium">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-border px-4 py-2">{children}</td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

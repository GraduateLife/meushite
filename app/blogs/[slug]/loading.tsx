import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <main className="w-[50vw] rounded-lg bg-gray-200/70 px-4 py-4 dark:bg-gray-900/70 md:px-16">
      {/* Top badge skeleton */}
      <div className="mb-4 flex items-center gap-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-16" />
      </div>

      {/* Title skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-12 w-3/4" />

        {/* Metadata section */}
        <div className="mb-8 flex flex-col gap-2">
          {/* Author and date */}
          <div className="flex gap-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>

          {/* Keywords/tags */}
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-14" />
          </div>

          {/* Cover image */}
          <Skeleton className="mt-4 aspect-video w-full" />
        </div>
      </div>

      {/* Article content skeletons */}
      <article className="prose prose-slate space-y-4 dark:prose-invert">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[85%]" />
        <Skeleton className="h-20 w-full" /> {/* Code block placeholder */}
        <Skeleton className="h-4 w-[88%]" />
        <Skeleton className="h-4 w-[92%]" />
      </article>

      {/* Navigation buttons */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 md:left-40">
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <div className="fixed right-4 top-1/2 -translate-y-1/2 md:right-40">
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </main>
  );
}

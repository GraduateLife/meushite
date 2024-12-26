import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      {/* Header skeleton */}
      <header className="mb-8">
        <Skeleton className="h-10 w-[200px] mb-4" />
        <div className="flex gap-4 mb-6">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
        </div>
      </header>

      {/* Main content grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Generate multiple card skeletons */}
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-4">
            {/* Card image */}
            <Skeleton className="w-full aspect-video rounded-lg" />

            {/* Card content */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>

            {/* Card footer */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="flex justify-center gap-2 mt-8">
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />
      </div>
    </div>
  );
}

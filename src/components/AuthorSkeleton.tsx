import { Skeleton } from './ui/skeleton';

export default function AuthorSkeleton() {
  return (
    <div
      className="container mx-auto px-4 py-8 max-w-7xl"
      data-testid="author-skeleton"
    >
      <Skeleton className="w-1/2 h-10 mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-64">
            <Skeleton className="w-full h-40 mb-4" />
            <Skeleton className="w-3/4 h-6 mb-2" />
            <Skeleton className="w-full h-4" />
          </div>
        ))}
      </div>
    </div>
  );
}

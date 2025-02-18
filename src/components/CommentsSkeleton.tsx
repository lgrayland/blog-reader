import { Skeleton } from './ui/skeleton';

export default function CommentsSkeleton() {
  return (
    <div className="mt-12">
      <Skeleton className="w-40 h-8 mb-4" />
      <ul className="space-y-4">
        {[1, 2, 3].map((i) => (
          <li key={i} className="bg-muted p-4 rounded-lg">
            <Skeleton className="w-1/3 h-5 mb-2" />
            <Skeleton className="w-1/4 h-4 mb-2" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
          </li>
        ))}
      </ul>
    </div>
  );
}

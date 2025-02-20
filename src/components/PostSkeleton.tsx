import { Link } from 'react-router';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';

export default function PostSkeleton() {
  return (
    <main
      className="container mx-auto px-4 py-8 max-w-3xl"
      data-testid="post-skeleton"
    >
      <Button asChild variant="outline" className="mb-8">
        <Link to="/">← Back to all posts</Link>
      </Button>
      <article>
        <Skeleton className="w-full h-[450px] mb-8 rounded-lg" />
        <Skeleton className="w-3/4 h-10 mb-4" />
        <Skeleton className="w-1/2 h-6 mb-6" />
        <div className="space-y-4">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-3/4 h-4" />
        </div>
      </article>
    </main>
  );
}

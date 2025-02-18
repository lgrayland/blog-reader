import { Fragment } from 'react';

import { BlogCard } from '@/components/BlogCard';
import { fetchPosts } from '@/lib/posts';
import { useInfiniteQuery } from '@tanstack/react-query';

export default function Posts() {
  const {
    status,
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam }) => fetchPosts({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
  });

  if (status === 'pending') return <div>Loading...</div>;
  if (status === 'error') return <div>Error: {(error as Error).message}</div>;

  return (
    <main>
      <h1>Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.pages.map((page, i) => (
          <Fragment key={i}>
            {page.map((post) => (
              <BlogCard post={post} key={post.id} />
            ))}
          </Fragment>
        ))}
      </div>
    </main>
  );
}

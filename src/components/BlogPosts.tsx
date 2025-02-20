import { Fragment, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import BlogCard from '@/components/BlogCard';
import { fetchPosts } from '@/lib/posts';
import { useInfiniteQuery } from '@tanstack/react-query';

export default function BlogPosts() {
  const { ref, inView } = useInView();
  const { status, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['posts'],
      queryFn: ({ pageParam }) => fetchPosts({ pageParam }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1 : undefined;
      },
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (status === 'pending') return <div>Loading...</div>;
  if (status === 'error') return <div>Error: Failed to fetch</div>;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.pages.map((page, i) => (
          <Fragment key={i}>
            {page.map((post) => (
              <BlogCard post={post} key={post.id} />
            ))}
          </Fragment>
        ))}
      </div>
      <div ref={ref} className="h-10 flex items-center justify-center mt-4">
        {isFetchingNextPage && <div>Loading more...</div>}
      </div>
    </>
  );
}

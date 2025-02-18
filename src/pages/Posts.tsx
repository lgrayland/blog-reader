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

  if (status === 'pending') return <p>Loading...</p>;
  if (status === 'error') return <p>Error :(</p>;

  return <div>Posts</div>;
}

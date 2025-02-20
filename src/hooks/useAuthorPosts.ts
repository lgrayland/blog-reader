import { fetchAuthorPosts, Post } from '@/lib/posts';
import { useQuery } from '@tanstack/react-query';

export const useAuthorPosts = (userId: number) => {
  return useQuery<Post[]>({
    queryKey: ['authorPosts', userId],
    queryFn: () => fetchAuthorPosts(userId),
  });
};

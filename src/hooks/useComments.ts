import { fetchComments } from '@/lib/comments';
import { useQuery } from '@tanstack/react-query';

export const useComments = (postId: number) => {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchComments(postId),
  });
};

import { fetchComments } from '@/lib/comments';
import { useQuery } from '@tanstack/react-query';

export default function Comments({ postId }: { postId: number }) {
  const {
    data: comments,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchComments(postId),
  });
  return <div>Comments</div>;
}

import { Comment, fetchComments } from '@/lib/comments';
import { useQuery } from '@tanstack/react-query';
import CommentsSkeleton from './CommentsSkeleton';

export default function Comments({ postId }: { postId: number }) {
  const {
    data: comments,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchComments(postId),
  });

  if (isLoading) {
    return <CommentsSkeleton />;
  }

  if (isError) {
    return <div>Error loading comments</div>;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      {!comments || comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((comment: Comment) => (
            <li
              key={comment.id}
              className="bg-white text-gray-950 rounded-xl border border-gray-200 shadow-sm dark:bg-gray-950 dark:text-gray-50 dark:border-gray-800 p-4"
            >
              <h3 className="font-semibold">{comment.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {comment.email}
              </p>
              <p>{comment.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

import { Comment, fetchComments } from '@/lib/comments';
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
              className="bg-white dark:bg-gray-900 p-4 rounded-lg"
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

import AuthorSkeleton from '@/components/AuthorSkeleton';
import BlogCard from '@/components/BlogCard';
import { useAuthorPosts } from '@/hooks';
import { fetchUser, User } from '@/lib/users';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

export default function AuthorPage() {
  const { userId } = useParams<{ userId: string }>();

  const {
    data: posts,
    isLoading: postsLoading,
    isError: postsError,
  } = useAuthorPosts(Number.parseInt(userId as string));

  const {
    data: author,
    isLoading: authorLoading,
    isError: authorError,
  } = useQuery<User>({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(Number.parseInt(userId as string)),
  });

  if (postsLoading || authorLoading) {
    return <AuthorSkeleton />;
  }

  if (postsError || authorError || !posts || !author) {
    return <div>Error loading author's posts</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-4xl font-bold mb-8">Posts by {author.name}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

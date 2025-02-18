import { Link } from 'react-router';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { fetchSinglePost } from '@/lib/posts';
import PostSkeleton from '@/components/PostSkeleton';
import Comments from '@/components/Comments';

export default function Post() {
  const { postId } = useParams();

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchSinglePost(Number.parseInt(postId as string)),
  });

  if (isLoading) {
    return <PostSkeleton />;
  }

  if (isError || !post) {
    return <div>Error loading post</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Button asChild variant="outline" className="mb-8">
        <Link to="/">← Back to all posts</Link>
      </Button>
      <article>
        <div className="mb-8">
          <AspectRatio ratio={16 / 9}>
            <img
              src={`https://picsum.photos/seed/${post.id}/800/450`}
              alt={post.title}
              className="rounded-lg object-cover"
            />
          </AspectRatio>
        </div>

        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="prose prose-lg dark:prose-invert">
          <p>{post.body}</p>
          {/* Dummy paragraphs */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae
            aliquam nisl nunc vitae nisl.
          </p>
          <p>
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </article>
      <Comments postId={post.id} />
    </div>
  );
}

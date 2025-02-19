import { Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Post } from '@/lib/posts';
import { AspectRatio } from './ui/aspect-ratio';
import { useQuery } from '@tanstack/react-query';
import { fetchUser, User } from '@/lib/users';

export default function BlogCard({ post }: { post: Post }) {
  const { data: author } = useQuery<User>({
    queryKey: ['user', post.userId],
    queryFn: () => fetchUser(post.userId),
  });

  return (
    <Link to={`/article/${post.id}`}>
      <Card className="h-full flex flex-col">
        <AspectRatio ratio={16 / 9}>
          <img
            src={`https://picsum.photos/seed/${post.id}/400/225`}
            alt={post.title}
            className="rounded-t-lg object-cover"
          />
        </AspectRatio>
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-2 line-clamp-2">{post.body}</p>
          <p className="text-xs text-gray-400 mt-auto">
            Author:{' '}
            <Link to={`/author/${post.userId}`} className="hover:underline">
              {author ? author.name : `User ${post.userId}`}
            </Link>
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

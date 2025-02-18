import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Post } from '@/lib/posts';
import { AspectRatio } from './ui/aspect-ratio';

export function BlogCard({ post }: { post: Post }) {
  return (
    <Card className="h-full flex flex-col">
      <div className="w-full">
        <AspectRatio ratio={16 / 9}>
          <img
            src={`https://picsum.photos/seed/${post.id}/400/225`}
            alt={post.title}
            className="rounded-t-lg object-cover"
          />
        </AspectRatio>
      </div>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-2 line-clamp-2">{post.body}</p>
      </CardContent>
    </Card>
  );
}

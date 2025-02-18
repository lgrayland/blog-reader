import BlogPosts from '@/components/BlogPosts';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-4xl font-bold mb-4">Posts</h1>
      <BlogPosts />
    </div>
  );
}

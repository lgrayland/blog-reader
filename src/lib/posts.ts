import { fetchUser, User } from './users';

const MAX_POST_PAGE = 10;

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export const fetchPosts = async ({ pageParam }: { pageParam: number }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=${MAX_POST_PAGE}`
  );
  const posts = (await response.json()) as Post[];
  return posts;
};

export const fetchSinglePost = async (
  postId: number
): Promise<Post & { author: User }> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }
  const post = (await response.json()) as Post;
  const author = await fetchUser(post.userId);
  return { ...post, author };
};

export const fetchAuthorPosts = async (userId: number): Promise<Post[]> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );
  const posts = (await response.json()) as Post[];
  return posts;
};

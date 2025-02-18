const MAX_POST_PAGE = 10;

export interface Post {
  id: number;
  title: string;
  body: string;
}

export const fetchPosts = async ({ pageParam }: { pageParam: number }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=${MAX_POST_PAGE}`
  );
  const posts = (await response.json()) as Post[];
  return posts;
};

export const fetchSinglePost = async (postId: number) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  const post = (await response.json()) as Post;
  return post;
};

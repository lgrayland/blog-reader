export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export const fetchComments = async (postId: number) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  const comments = (await response.json()) as Comment[];
  return comments;
};

export interface User {
  id: number;
  name: string;
  email: string;
}

export const fetchUser = async (userId: number) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  const user = (await response.json()) as User;
  return user;
};

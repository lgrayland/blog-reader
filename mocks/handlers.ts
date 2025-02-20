import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://jsonplaceholder.typicode.com/users/:id', ({ params }) => {
    const { id } = params;
    return HttpResponse.json({
      id: Number(id),
      name: `Test User ${id}`,
      username: `testuser${id}`,
      email: `testuser${id}@example.com`,
    });
  }),
  http.get(
    'https://jsonplaceholder.typicode.com/posts',
    async ({ request }) => {
      const url = new URL(request.url);

      const page = url.searchParams.get('_page');
      const limit = url.searchParams.get('_limit');
      if (!page || !limit) {
        return HttpResponse.json([
          {
            userId: 1,
            id: 1,
            title: 'Test Post 1',
            body: 'This is the body of test post 1',
          },
          {
            userId: 1,
            id: 2,
            title: 'Test Post 2',
            body: 'This is the body of test post 2',
          },
        ]);
      }
      return HttpResponse.json(
        Array.from({ length: Number(limit) }, (_, i) => ({
          userId: 1,
          id: Number(page) * Number(limit) + i + 1,
          title: `Test Post ${Number(page) * Number(limit) + i + 1}`,
          body: `This is the body of test post ${
            Number(page) * Number(limit) + i + 1
          }`,
        }))
      );
    }
  ),
  http.get('https://jsonplaceholder.typicode.com/comments', async () => {
    return HttpResponse.json([
      {
        postId: 1,
        id: 1,
        name: 'Test Comment 1',
        email: 'test1@example.com',
        body: 'This is a test comment',
      },
      {
        postId: 1,
        id: 2,
        name: 'Test Comment 2',
        email: 'test2@example.com',
        body: 'This is another test comment',
      },
    ]);
  }),
  http.get('https://jsonplaceholder.typicode.com/posts/:id', ({ params }) => {
    const { id } = params;
    return HttpResponse.json({
      userId: 1,
      id: Number(id),
      title: `Test Post ${id}`,
      body: `This is the body of test post ${id}`,
    });
  }),
];

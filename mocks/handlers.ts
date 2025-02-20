import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://jsonplaceholder.typicode.com/posts', async () => {
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
  }),
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
];

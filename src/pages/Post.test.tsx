import { render, screen } from '@testing-library/react';
import SinglePost from './Post';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Route, Routes } from 'react-router';
import { vi } from 'vitest';
import { worker } from '../../mocks/worker';
import { delay, http, HttpResponse } from 'msw';

vi.mock('@/components/comments', () => ({
  default: () => <div data-testid="comments">Mocked Comments</div>,
}));

describe('Single post', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });
  it('renders the post page with correct information', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[`/post/1`]}>
          <Routes>
            <Route path="/post/:postId" element={<SinglePost />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(await screen.findByText('Test Post 1')).toBeInTheDocument();
    expect(
      screen.getByText('This is the body of test post 1')
    ).toBeInTheDocument();
    expect(screen.getByText('Test User 1')).toBeInTheDocument();
    expect(screen.getByTestId('comments-skeleton')).toBeInTheDocument();
  });

  it('handles error gracefully', async () => {
    worker.use(
      http.get('https://jsonplaceholder.typicode.com/users/:id', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[`/post/1`]}>
          <Routes>
            <Route path="/post/:postId" element={<SinglePost />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(await screen.findByText('Error loading post')).toBeInTheDocument();
  });

  it('shows loading indicator while fetching', async () => {
    worker.use(
      http.get(
        'https://jsonplaceholder.typicode.com/users/:id',
        ({ params }) => {
          const { id } = params;
          delay(1000);
          return HttpResponse.json({
            userId: 1,
            id: Number(id),
            title: `Test Post ${id}`,
            body: `This is the body of test post ${id}`,
          });
        }
      )
    );

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[`/post/1`]}>
          <Routes>
            <Route path="/post/:postId" element={<SinglePost />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByTestId('post-skeleton')).toBeInTheDocument();
  });
});

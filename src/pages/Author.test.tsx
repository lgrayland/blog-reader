import { render, screen } from '@testing-library/react';
import AuthorPage from './Author';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Route, Routes } from 'react-router';
import { vi } from 'vitest';
import { worker } from '../../mocks/worker';
import { delay, http, HttpResponse } from 'msw';
import { Post } from '@/lib/posts';

vi.mock('@/components/BlogCard', () => ({
  default: ({ post }: { post: Post }) => (
    <div data-testid={`post-${post.id}`}>{post.title}</div>
  ),
}));

describe('AuthorPage', () => {
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

  it('renders the author page with correct information', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[`/author/1`]}>
          <Routes>
            <Route path="/author/:userId" element={<AuthorPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(await screen.findByText('Posts by Test User 1')).toBeInTheDocument();
    expect(screen.getByTestId('post-1')).toBeInTheDocument();
    expect(screen.getByTestId('post-2')).toBeInTheDocument();
  });

  it('handles error gracefully', async () => {
    worker.use(
      http.get('https://jsonplaceholder.typicode.com/users/:id', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[`/author/1`]}>
          <Routes>
            <Route path="/author/:userId" element={<AuthorPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(
      await screen.findByText("Error loading author's posts")
    ).toBeInTheDocument();
  });

  it('shows loading indicator while fetching data', async () => {
    worker.use(
      http.get(
        'https://jsonplaceholder.typicode.com/users/:id',
        ({ params }) => {
          const { id } = params;
          delay(1000);
          return HttpResponse.json({
            id: Number(id),
            name: `Test User ${id}`,
            username: `testuser${id}`,
            email: `testuser${id}@example.com`,
          });
        }
      )
    );

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[`/author/1`]}>
          <Routes>
            <Route path="/author/:userId" element={<AuthorPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByTestId('author-skeleton')).toBeInTheDocument();
  });
});

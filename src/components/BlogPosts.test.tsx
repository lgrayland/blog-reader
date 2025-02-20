import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import BlogPosts from './BlogPosts';
import { MemoryRouter } from 'react-router';
import { worker } from '../../mocks/worker';
import { delay, http, HttpResponse } from 'msw';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';
import { vi } from 'vitest';
import { Post } from '@/lib/posts';

vi.mock('@/components/BlogCard', () => ({
  default: ({ post }: { post: Post }) => (
    <div data-testid={`post-${post.id}`}>{post.title}</div>
  ),
}));

describe('BlogPosts', () => {
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

  it('should render a loading state', () => {
    worker.use(
      http.get('https://jsonplaceholder.typicode.com/posts', () => {
        delay(1000);
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
      })
    );
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <BlogPosts />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render an error state', async () => {
    worker.use(
      http.get('https://jsonplaceholder.typicode.com/posts', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <BlogPosts />
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument();
    });
  });

  it('should render a list of blog posts', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <BlogPosts />
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Post 1')).toBeInTheDocument();
      expect(screen.getByText('Test Post 2')).toBeInTheDocument();
    });
  });

  it('should fetch more posts when the user scrolls to the bottom', async () => {
    // mockAllIsIntersecting(false);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <BlogPosts />
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Post 1')).toBeInTheDocument();
      expect(screen.getByText('Test Post 2')).toBeInTheDocument();
      expect(screen.queryByText('Test Post 21')).not.toBeInTheDocument();
      expect(screen.queryByText('Test Post 22')).not.toBeInTheDocument();
    });

    mockAllIsIntersecting(true);

    await waitFor(() => {
      expect(screen.getByText('Test Post 21')).toBeInTheDocument();
      expect(screen.getByText('Test Post 22')).toBeInTheDocument();
    });
  });
});

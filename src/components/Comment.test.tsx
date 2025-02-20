import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Comments from './Comments';

describe('Comments component', () => {
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
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders comments for a post', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Comments postId={1} />
      </QueryClientProvider>
    );
    expect(await screen.findByText('Comments')).toBeInTheDocument();
    expect(await screen.findByText('Test Comment 1')).toBeInTheDocument();
    expect(await screen.findByText('Test Comment 2')).toBeInTheDocument();
  });

  it('shows loading state while fetching comments', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Comments postId={1} />
      </QueryClientProvider>
    );

    expect(screen.getByTestId('comments-skeleton')).toBeInTheDocument();

    await screen.findByText('Comments');
  });
});

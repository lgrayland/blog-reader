import { render, screen } from '@testing-library/react';
import BlogCard from './BlogCard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router';

const queryClient = new QueryClient();

const mockPost = {
  id: 1,
  title: 'Test Post',
  body: 'This is a test post body',
  userId: 1,
};

describe('BlogCard', () => {
  it('renders the blog post card with correct information', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <BlogCard post={mockPost} />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('This is a test post body')).toBeInTheDocument();
    expect(await screen.findByText('Test User 1')).toBeInTheDocument();
  });
});

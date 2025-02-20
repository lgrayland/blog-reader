import { fetchComments } from './comments';

describe('Comments', () => {
  it('fetches comments for a post', async () => {
    const comments = await fetchComments(1);
    expect(comments).toHaveLength(2);
    expect(comments[0].name).toBe('Test Comment 1');
  });
});

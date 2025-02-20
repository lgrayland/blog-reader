import '@testing-library/jest-dom';
import { worker } from './mocks/worker';
import { vi, beforeAll, afterAll, afterEach, beforeEach } from 'vitest';
import {
  setupIntersectionMocking,
  resetIntersectionMocking,
} from 'react-intersection-observer/test-utils';

beforeAll(() => worker.listen());
beforeEach(() => setupIntersectionMocking(vi.fn));
afterEach(() => {
  worker.resetHandlers();
  resetIntersectionMocking();
});
afterAll(() => worker.close());

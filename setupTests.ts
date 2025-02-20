import '@testing-library/jest-dom';
import { worker } from './mocks/worker';

beforeAll(() => worker.listen());
afterEach(() => worker.resetHandlers());
afterAll(() => worker.close());

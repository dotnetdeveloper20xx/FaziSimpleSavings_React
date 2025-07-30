import "@testing-library/jest-dom";
import { server } from "./mocks/server";
import { TextEncoder, TextDecoder as NodeTextDecoder } from "util";

// Polyfill for Node.js (in case future Node versions remove global)
if (!global.TextEncoder) {
  global.TextEncoder = TextEncoder as unknown as typeof global.TextEncoder;
}
if (!global.TextDecoder) {
  global.TextDecoder = NodeTextDecoder as unknown as typeof global.TextDecoder;
}

// Mock localStorage (used in Redux store auth logic)
global.localStorage = {
  getItem: jest.fn(() => null),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
} as any;

// Mock navigator (some libraries like user-event depend on it)
global.navigator = {
  clipboard: {
    writeText: jest.fn(),
    readText: jest.fn(),
  },
} as any;

// Setup MSW server (for mocking API calls in tests)
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock Obsidian API
declare global {
  // eslint-disable-next-line no-var
  var Notice: typeof MockNotice;
}

class MockNotice {
  constructor(public message: string) {}
}

globalThis.Notice = MockNotice;

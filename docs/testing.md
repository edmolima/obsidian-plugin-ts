# Testing

This template uses Vitest and React Testing Library for fast, reliable tests.

Run tests

```bash
pnpm test
pnpm test -- --watch
pnpm test:ui
pnpm test:coverage
```

Writing tests

- Put tests next to the component (`Component.test.tsx`).
- Use `@testing-library/react` to test behavior from the user's perspective.
- Mock Obsidian globals where necessary (the tests directory already includes a `setup.ts`).

Example test (React)

```tsx
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Counter } from '../../components/Counter';

test('increments on click', async () => {
  render(<Counter />);
  const button = screen.getByRole('button');
  await userEvent.click(button);
  expect(button).toHaveTextContent('Clicked 1 times');
});
```

Coverage

Run `pnpm test:coverage` to generate an HTML report in `coverage/`.

Tips

- Keep tests small and deterministic.
- Avoid relying on implementation details; prefer DOM queries (`getByRole`, `getByLabelText`).
- Use `setup.ts` to configure global test environment (jsdom, polyfills).

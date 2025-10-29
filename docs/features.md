# Features

Everything you need to build a modern Obsidian plugin. No setup required.

## Core Stack

### React 18

Build interactive UIs with the library you already know. Full hooks support, modern patterns, and excellent TypeScript integration.

```tsx
import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
```

**Why React?**
- Familiar API for web developers
- Rich ecosystem of tools and libraries
- Component reusability
- Excellent testing support

### Tailwind CSS

Style your components with utility classes. Pre-configured with Obsidian-specific prefixing to avoid conflicts.

```tsx
import { cn } from '@/shared/lib/utils';

export function Card({ children }) {
  return (
    <div className={cn(
      'op-rounded-lg op-border op-border-gray-200',
      'op-p-4 op-shadow-sm',
      'hover:op-shadow-md op-transition-shadow'
    )}>
      {children}
    </div>
  );
}
```

**Why Tailwind?**
- Rapid development
- Consistent design system
- Small bundle size (purged unused classes)
- No class name conflicts with Obsidian

### TypeScript

Full type safety from end to end. Strict mode enabled for maximum confidence.

```ts
interface PluginSettings {
  apiKey: string;
  enableFeature: boolean;
  maxItems: number;
}

// Type-safe settings access
function getApiKey(settings: PluginSettings): string {
  return settings.apiKey; // ✅ Type-checked
}
```

**Why TypeScript?**
- Catch errors before runtime
- Better IDE autocomplete
- Self-documenting code
- Easier refactoring

### Vitest

Fast, modern testing framework with React Testing Library integration.

```tsx
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Counter } from './Counter';

test('increments counter on click', async () => {
  render(<Counter />);
  const button = screen.getByRole('button');

  await userEvent.click(button);

  expect(button).toHaveTextContent('Clicked 1 times');
});
```

**Why Vitest?**
- Lightning-fast test execution
- Native ESM support
- Compatible with Jest API
- Built-in code coverage

## Development Tools

### Auto-Reload Development

Changes sync instantly to your Obsidian vault. No manual copying required.

**How it works:**
1. Save a file
2. Rollup rebuilds in watch mode
3. Files auto-copy to vault
4. Reload plugin in Obsidian (Cmd+R)

### Smart Vault Detection

Setup wizard automatically finds your Obsidian vaults on macOS, Windows, and Linux.

```bash
pnpm run dev:setup

# 🔍 Scanning for Obsidian vaults...
#
# Found 2 vault(s):
#   1. /Users/you/Documents/PersonalVault
#   2. /Users/you/Documents/WorkVault
```

### Type-Safe Manifest

Configure your plugin with full TypeScript support. Changes automatically generate `manifest.json`.

```ts
export const manifest = {
  id: 'my-plugin',
  name: 'My Plugin',
  version: '1.0.0',
  minAppVersion: '0.15.0',
  description: 'Does amazing things',
  author: 'You',
} as const satisfies PluginManifest;
```

### Settings Storage

Simple, type-safe API for persisting plugin settings.

```ts
import { getSettings, updateSettings } from '@/shared/lib/storage';

// Load settings
const settings = await getSettings(this.app);

// Update settings
await updateSettings(this.app, {
  ...settings,
  theme: 'dark',
});
```

## Code Organization

### Feature-Based Structure

Organize code by feature, not by file type. Each feature is self-contained with its components, logic, and tests.

```
src/features/
├── settings/
│   ├── SettingsView.tsx      # UI component
│   ├── SettingsTab.tsx        # Obsidian tab wrapper
│   ├── SettingsView.test.tsx  # Tests
│   └── index.ts               # Public exports
└── example-modal/
    ├── ExampleModalView.tsx
    ├── ExampleModal.tsx
    ├── ExampleModalView.test.tsx
    └── index.ts
```

**Benefits:**
- Easy to find related code
- Features can be added/removed cleanly
- Clear boundaries between modules
- Scales better than file-type organization

### Shared Components

Reusable UI primitives in `src/components/` for consistency across features.

```tsx
// Import shared components
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';

function MyFeature() {
  return (
    <Modal title="Hello">
      <Button variant="primary">Click me</Button>
    </Modal>
  );
}
```

### Utility Functions

Common helpers in `src/shared/lib/` for DRY code.

```ts
import { cn } from '@/shared/lib/utils';
import { getSettings } from '@/shared/lib/storage';
import { manifest } from '@/shared/lib/manifest';
```

## Build System

### Rollup

Fast, efficient bundling optimized for Obsidian plugins.

**Production build:**
```bash
pnpm build:prod
```

**Features:**
- Tree-shaking for minimal bundle size
- Source maps in development
- PostCSS for Tailwind processing
- Automatic manifest generation

### Multiple Build Modes

- **Development**: Fast builds with source maps and inline CSS
- **Production**: Minified, optimized builds ready for distribution

```bash
# Development (with source maps)
pnpm build

# Production (optimized)
pnpm build:prod
```

## Testing Infrastructure

### React Testing Library

Test components like users interact with them.

```tsx
test('modal closes when clicking outside', async () => {
  render(<Modal isOpen={true} onClose={onClose} />);

  const backdrop = screen.getByTestId('modal-backdrop');
  await userEvent.click(backdrop);

  expect(onClose).toHaveBeenCalled();
});
```

### Coverage Reports

Track test coverage with built-in reporting.

```bash
pnpm test:coverage

# Generates coverage report in coverage/
```

### Interactive Test UI

Visual test runner with Vitest UI.

```bash
pnpm test:ui

# Opens browser-based test interface
```

## What's Included

- ✅ React 18 with TypeScript
- ✅ Tailwind CSS (prefixed)
- ✅ Vitest + React Testing Library
- ✅ Auto-reload development workflow
- ✅ Smart vault detection
- ✅ Type-safe settings storage
- ✅ Feature-based architecture
- ✅ Production-ready build system
- ✅ Example components and tests
- ✅ Comprehensive documentation

## What's Not Included

This template is intentionally minimal. You won't find:

- ❌ State management libraries (Redux, Zustand, etc.)
- ❌ Form libraries (React Hook Form, Formik, etc.)
- ❌ HTTP clients (axios, fetch wrappers)
- ❌ Date libraries (date-fns, dayjs)
- ❌ Icon libraries

**Why?** These are highly project-specific. Add what you need, when you need it.

## Next Steps

- **[Architecture](./architecture.md)** - Understand how everything fits together
- **[Adding Features](./guides/adding-features.md)** - Create your first feature
- **[Testing Guide](./testing.md)** - Write effective tests

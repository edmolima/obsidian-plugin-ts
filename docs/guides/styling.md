# Styling with Tailwind

This template ships Tailwind CSS pre-configured and uses the `op-` prefix to avoid collisions with Obsidian styles.

Where styles live

- Global Tailwind imports: `src/shared/styles/globals.css`
- Tailwind config: `tailwind.config.js`
- PostCSS config: `postcss.config.js`

Using classes

- Use the `op-` prefixed classes to style components, e.g. `op-p-4 op-bg-slate-800`.
- Use the `cn()` helper (from `src/shared/lib/utils.ts`) to compose classes safely.

Example component

```tsx
import React from 'react';
import { cn } from '@/shared/lib/utils';

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn('op-rounded-lg op-border op-p-4 op-bg-card')}>
      {children}
    </div>
  );
}
```

Working with scoped CSS

- For component-specific rules, prefer Tailwind utilities. If you need custom CSS, create a `.css` file next to the component and import it from the component.
- Keep the global CSS minimal to reduce risk of conflicting with the host app.

Build notes

- During build, Rollup generates a `styles.css` file that the dev copy script copies to your vault along with `main.js`.

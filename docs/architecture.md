# Architecture

This document explains the project layout and where to make common changes. The template follows a feature-first structure so each feature is self-contained and easy to reason about.

High-level layout

```
src/
├── components/        # shared UI primitives (Modal, Buttons, etc.)
├── features/          # feature folders (settings, example-modal, etc.)
│   └── my-feature/
│       ├── MyFeatureView.tsx
│       ├── index.tsx         # feature entry (export + registration helper)
│       └── MyFeature.test.tsx
├── shared/            # utilities, manifest, storage
│   ├── lib/
│   │   ├── manifest.ts     # type-safe manifest builder
│   │   ├── storage.ts      # settings helper class
│   │   └── utils.ts        # small helpers (cn, etc.)
│   └── styles/            # Tailwind/global CSS entry
└── main.ts              # plugin bootstrap: register features and commands
```

Key files

- `src/main.ts`
  - Plugin entrypoint. Register features, add commands, and hook into the Obsidian lifecycle (onload/onunload).

- `src/shared/lib/manifest.ts`
  - Type-safe manifest template. Update `id`, `name`, `version`, and `minAppVersion` here. `postbuild` scripts generate `manifest.json` from this file.

- `src/shared/lib/storage.ts`
  - Encapsulates settings load/save/update. Use the `Storage` class in your plugin to persist settings safely.

Feature pattern

- Each feature folder exports a minimal API in `index.tsx` that `main.ts` imports. This keeps `main.ts` concise and makes features easier to test and reuse.

Registering a feature (example in `main.ts`)

```ts
import { MyFeature } from './features/my-feature';

export default class MyPlugin extends Plugin {
  async onload() {
    MyFeature.register(this);
  }
  onunload() {}
}
```

Notes & conventions

- Keep UI-only components under `components/` to reuse across features.
- Tests live next to the component (`*.test.tsx`) and run with Vitest.
- Prefer small exports from feature `index.tsx` so `main.ts` can stay declarative.
- Manifest and version management are automated by `scripts/generate-manifest.mjs` and `scripts/generate-version.mjs` in the build pipeline.

Tips for large plugins

- Split features into subfolders when they exceed ~200–400 lines.
- Create a `lib/` or `utils/` inside `features/<name>` for complex feature logic to keep the React component file small.
- Use the `Storage` helper to centralize settings access and avoid duplicated save/load logic.

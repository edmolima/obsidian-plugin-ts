# Obsidian Plugin TypeScript Template

A developer-first starter for building Obsidian Community Plugins using TypeScript, React, Tailwind CSS and Vitest. It focuses on a fast feedback loop, type-safety, and minimal ceremony so you can prototype and ship features quickly.

Key features

- Modern React 18 + TypeScript (strict mode)
- Tailwind CSS preconfigured with `op-` prefix to avoid collisions with Obsidian styles
- Fast ESM-friendly builds using Rollup and a watch + auto-copy dev flow
- Vitest + React Testing Library for fast tests and coverage
- Feature-based project layout that scales for larger plugins

Table of contents

- [Quick start](#quick-start)
- [Scripts & workflow](#scripts--workflow)
- [Project layout](#project-layout)
- [Testing](#testing)
- [Build & release](#build--release)
- [Troubleshooting & tips](#troubleshooting--tips)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

## Quick start

Prerequisites:

- Node.js 18+ (LTS recommended)
- pnpm (install with `npm i -g pnpm`)

Clone and install:

```bash
git clone https://github.com/yourusername/obsidian-plugin-ts.git my-plugin
cd my-plugin
pnpm install
```

Configure your dev vault (first time only):

```bash
pnpm run dev:setup
```

Start development (watch, build, auto-copy to your vault):

```bash
pnpm dev
```

Open your Obsidian vault, disable Restricted mode (Settings → Community plugins), reload plugins (Cmd/Ctrl+R) and enable your plugin.

## Scripts & workflow

This project provides a small set of scripts tuned for a smooth DX. The important commands are:

- `pnpm dev` — development mode. Runs Rollup in watch mode and the dev copy script concurrently so builds are copied to your vault automatically.
- `pnpm run dev:setup` — interactive setup to detect and save your Obsidian vault path to `.dev-env`.
- `pnpm build` — build once (development-ready build).
- `pnpm build:prod` — production build (sets `BUILD=production`) and runs post-build generation (manifest/version).
- `pnpm test` — run unit tests with Vitest.
- `pnpm test:ui` — open Vitest interactive UI.

Recommended dev loop

1. `pnpm run dev:setup` (once)
2. `pnpm dev` in a terminal (keep it running)
3. Edit `src/` files and save — Rollup rebuilds and the watcher copies `dist/` files to your vault
4. Reload Obsidian (Cmd/Ctrl+R) to see changes

Pro tips

- Keep the Obsidian Developer Console open (Cmd+Option+I) to see runtime logs and errors.
- Use `pnpm test -- --watch` to run tests in watch mode while developing.

## Project layout

High level:

```text
src/
├── components/        # shared UI primitives (Modal, Buttons)
├── features/          # feature folders (settings, example-modal)
├── shared/            # lib, utils, manifest, storage
│   └── styles/        # global Tailwind imports
└── main.ts            # plugin bootstrap
```

Key files

- `src/main.ts` — plugin entrypoint. Register features and commands here.
- `src/shared/lib/manifest.ts` — type-safe manifest source; `postbuild` generates `dist/manifest.json`.
- `src/shared/lib/storage.ts` — settings helper used across features.

## Testing

Run tests:

```bash
pnpm test
pnpm test -- --watch
pnpm test:ui
pnpm test:coverage
```

Guidance:

- Put tests next to code (e.g. `MyComponent.test.tsx`).
- Prefer user-centric queries (`getByRole`, `getByLabelText`) from React Testing Library.
- Mock Obsidian globals as needed; this template includes basic test setup in `test/setup.ts`.

## Build & release

Build commands:

```bash
pnpm build       # single dev build
pnpm build:prod  # production build + postbuild steps
```

After building the `dist/` folder will contain `main.js`, `styles.css` and `manifest.json`. Zip those files to create a distributable plugin.

Release checklist:

- Run `pnpm lint` (TypeScript type check) and `pnpm test` before releasing.
- Confirm `manifest.json` contains the correct `id`, `name`, `version` and `minAppVersion`.
- Tag a release in GitHub and attach the zipped `dist/` if publishing manually.

## Troubleshooting & tips

- If files are not copying to your vault: ensure `.dev-env` exists and `pnpm dev` is running.
- If Obsidian doesn't show the plugin: check Restricted mode, reload plugins, and inspect the Obsidian console for errors.
- If builds are failing: run `pnpm build` and inspect Rollup errors; `pnpm lint` helps catch type errors early.

## Documentation

Detailed guides and references live in the `docs/` folder. Start with:

- `docs/getting-started.md` — step-by-step setup and dev workflow
- `docs/features.md` — what the template includes and example locations
- `docs/architecture.md` — project organization and feature pattern
- `docs/guides/` — practical how-tos (adding features, styling, settings)

## Contributing

Contributions are welcome. When contributing, please:

- Open issues to discuss larger changes first
- Keep PRs focused and add tests for new behavior
- Run `pnpm test` and `pnpm lint` before submitting

## License

MIT

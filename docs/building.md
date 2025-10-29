# Building & Release

This guide explains how to build production bundles and prepare releases for Obsidian.

Build commands

```bash
# Development (watch)
pnpm dev

# Development build once
pnpm run watch

# Production build
pnpm build:prod
```

What happens during build

1. Rollup bundles the plugin into `dist/main.js` and emits `styles.css`.
2. `pnpm postbuild` runs `scripts/generate-manifest.mjs` and `scripts/generate-version.mjs` to produce `manifest.json` and update version artifacts.
3. The `dist/` folder is ready to copy or publish.

Packaging for release

- Zip the `dist/` folder contents (typically `main.js`, `manifest.json`, `styles.css`) to create a distributable plugin archive.
- Verify `manifest.json` contains the correct `id`, `name`, and `version` before publishing.

Publishing options

- Manual: upload the zip to a release on GitHub or share directly with users.
- Obsidian Publish: follow Obsidian's community plugin publishing flow (set correct manifest and release tags).

Tips & checklist

- Run `pnpm lint` (type check) before building to catch type errors early.
- Ensure tests pass (`pnpm test`).
- Confirm that `manifest.json` has `minAppVersion` compatible with target users.
- Keep the build reproducible by pinning dependencies in `pnpm-lock.yaml`.

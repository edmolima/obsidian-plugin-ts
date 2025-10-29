# Advanced TypeScript

This section collects small, practical TypeScript tips to improve DX and reliability.

Recommended tsconfig

- Keep `strict` enabled. It catches many errors early.
- Enable `noUncheckedIndexedAccess` if you rely on dynamic keys.

Type-safe manifest

- The template includes `src/shared/lib/manifest.ts` that exports a typed manifest object. Update the manifest source and rely on `scripts/generate-manifest.mjs` to produce `manifest.json` during `postbuild`.

Common patterns

- Narrow union types in business logic to improve exhaustiveness checking.
- Use `satisfies PluginManifest` when constructing manifest objects to keep literal inference while validating shape.

Example: typed manifest

```ts
export const manifest = {
  id: 'my-plugin',
  name: 'My Plugin',
  version: '1.0.0',
  minAppVersion: '0.15.0',
} as const satisfies PluginManifest;
```

Migration tips

- When changing settings shape, keep `DEFAULT_SETTINGS` and `loadSettings()` merge logic to handle missing keys.
- Provide a small migration helper if you need to rename or transform settings on load.

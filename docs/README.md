# Documentation Index

This `docs/` folder contains the canonical documentation for the template. Use it to onboard contributors, document the development workflow, and provide examples and references for building a plugin with this starter.

Required docs and purpose

- `getting-started.md` — Quick setup and development workflow. Keep this short and action-oriented: install, configure vault, run dev, enable plugin in Obsidian.
- `features.md` — High-level overview of what the template includes (React, TypeScript, Tailwind, testing, build behavior, examples). Link to code locations for each feature.
- `architecture.md` — Explain the file/folder structure, data flow (manifest, storage), and how features are organized. Include diagrams or ASCII trees.
- `guides/adding-features.md` — Step-by-step guide to add a new feature (component, tests, register in `main.ts`).
- `guides/styling.md` — Tailwind usage, `op-` prefix, how to extend the design system, and how to scope styles to avoid Obsidian collisions.
- `guides/settings.md` — How to create settings, use the provided storage helpers, and persist user preferences safely.
- `advanced/typescript.md` — TypeScript tips for plugins, manifest typing, and recommended tsconfig options for strictness.
- `testing.md` — How to run tests, write tests with Vitest + React Testing Library, and run coverage.
- `building.md` — Production build, versioning, manifest generation, and packaging for release.

Suggested layout

```
docs/
├── README.md
├── getting-started.md
├── features.md
├── architecture.md
├── testing.md
├── building.md
└── guides/
    ├── adding-features.md
    ├── styling.md
    └── settings.md
```

Writer guidance

- Write for plugin authors who know JS/TS and React but may be new to Obsidian plugin specifics.
- Keep examples minimal and copyable (small code snippets and commands).
- Prefer clarity over completeness in quick-start; link to deeper docs for advanced topics.

If you want, I can: create all these files with starter content, or add only a subset first (e.g., `architecture.md` + `guides/adding-features.md`). Tell me which docs to generate next and I'll create them with polished, developer-focused copy in English.

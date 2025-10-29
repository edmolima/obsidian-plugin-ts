# Adding Features

This guide shows the minimal steps to add a new feature to the template.

1. Create a feature folder

```
mkdir -p src/features/my-feature
```

2. Add a view component (React)

Create `src/features/my-feature/MyFeatureView.tsx`:

```tsx
import React from 'react';

export function MyFeatureView() {
  return <div>My Feature</div>;
}
```

3. Add an `index.tsx` to expose registration helpers

`src/features/my-feature/index.tsx`

```ts
import { MyFeatureView } from './MyFeatureView';

export function register(plugin: Plugin) {
  // Example: add a command that opens the modal
  plugin.addCommand({
    id: 'open-my-feature',
    name: 'Open My Feature',
    callback: () => {
      // show modal or open view
    },
  });
}

export default { register };
```

4. Register the feature in `src/main.ts`

```ts
import MyFeature from './features/my-feature';

export default class MyPlugin extends Plugin {
  onload() {
    MyFeature.register(this);
  }
}
```

5. Add tests and styles

- Create `MyFeatureView.test.tsx` next to the component.
- If you need styles, add them using Tailwind classes or create a small CSS file in the feature folder and import it from your component.

Notes

- Keep `index.tsx` minimal: expose a `register` function or named exports as needed.
- Prefer composition: implement complex logic in `lib/` modules inside the feature folder and keep the React component focused on rendering and events.

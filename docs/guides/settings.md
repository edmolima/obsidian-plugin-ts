# Settings

Use the `Storage` helper (`src/shared/lib/storage.ts`) to manage plugin settings safely and consistently.

Basic usage

```ts
import { Storage, DEFAULT_SETTINGS } from '@/shared/lib/storage';

export default class MyPlugin extends Plugin {
  storage: Storage;

  async onload() {
    this.storage = new Storage(this, DEFAULT_SETTINGS);
    const settings = await this.storage.loadSettings();
    // use settings
  }

  async saveSomething() {
    await this.storage.updateSettings({ exampleSetting: 'new' });
  }
}
```

UI for settings

- Create a settings view under `src/features/settings/` that renders inputs bound to the storage values.
- Call `storage.updateSettings(...)` on change to persist.

Tips

- Validate user input before saving.
- Use TypeScript interfaces for settings to get IDE help and avoid runtime errors.
- Keep default values in `DEFAULT_SETTINGS` so migrations are straightforward.

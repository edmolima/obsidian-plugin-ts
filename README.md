# Obsidian Plugin Template (TypeScript)

A professional, SOLID-based template for building Obsidian plugins with TypeScript, Dependency Injection, and best practices.

## Features

- **SOLID Principles**: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
- **Dependency Injection**: Clean, testable architecture with proper DI patterns
- **TypeScript Strict Mode**: Full type safety with no unsafe assignments
- **Modular Architecture**: Organized structure with clear separation of concerns
- **Rollup Bundler**: Fast and efficient bundling
- **Development Mode**: Watch mode for automatic rebuilds
- **Clean Code**: Following KISS, DRY, and SOLID principles

## Project Structure

```
.
├── src/
│   ├── core/              # Core abstractions and services
│   │   ├── interfaces.ts  # All interface definitions (DI contracts)
│   │   ├── Logger.ts      # Logger service implementation
│   │   └── SettingsService.ts  # Settings service implementation
│   ├── commands/          # Command implementations
│   │   ├── index.ts       # Command registry (Open/Closed)
│   │   ├── ExampleModalCommand.ts
│   │   └── ExampleEditorCommand.ts
│   ├── modals/            # Modal dialogs
│   │   └── ExampleModal.ts
│   ├── settings/          # Settings UI
│   │   └── SettingsTab.ts
│   ├── main.ts            # Main plugin entry point (DI setup)
│   ├── types.ts           # Type definitions
│   └── manifest.json      # Plugin metadata (copied to dist/)
├── scripts/               # Build scripts
│   ├── version-bump.mjs
│   └── generate-version.mjs
├── dist/                  # Build output (generated)
│   ├── main.js
│   ├── manifest.json
│   └── version.json
├── versions.json          # Version compatibility
├── tsconfig.json          # TypeScript configuration (strict mode)
├── rollup.config.mjs      # Rollup configuration
├── ARCHITECTURE.md        # Architecture documentation
└── package.json
```

## Getting Started

### 1. Clone and Setup

```bash
# Use this template or clone it
git clone <your-repo>
cd obsidian-plugin-ts

# Install dependencies
pnpm install
```

### 2. Configure Your Plugin

Edit `src/manifest.json`:

```json
{
  "id": "your-plugin-id",
  "name": "Your Plugin Name",
  "version": "1.0.0",
  "minAppVersion": "0.15.0",
  "description": "Your plugin description",
  "author": "Your Name",
  "authorUrl": "https://github.com/yourusername"
}
```

Update `package.json` name, author, and description.

### 3. Development

```bash
# Start development mode (watch for changes)
pnpm dev

# Build for production
pnpm build:prod

# Type check without building
pnpm lint
```

### 4. Test in Obsidian

For development, link the plugin to your vault:

```bash
# Create a symlink
ln -s /path/to/obsidian-plugin-ts /path/to/vault/.obsidian/plugins/your-plugin-name

# Or copy the build output
cp -r dist/* /path/to/vault/.obsidian/plugins/your-plugin-name/
```

## Architecture

This template uses **Dependency Injection** and **SOLID principles**. See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed documentation.

### Key Concepts

#### Dependency Injection
All dependencies are injected via constructors:

```typescript
export class MyService {
  constructor(
    private readonly logger: ILogger,
    private readonly settings: ISettingsService
  ) {}
}
```

#### SOLID Principles
- **Single Responsibility**: Each class has one job
- **Open/Closed**: Extend without modifying
- **Liskov Substitution**: Interfaces are substitutable
- **Interface Segregation**: Small, focused interfaces
- **Dependency Inversion**: Depend on abstractions

## Development Guide

### Adding a New Command

1. Create a command class:

```typescript
// src/commands/MyCommand.ts
import { Plugin } from 'obsidian';
import { ICommandRegistrar, IPluginContext } from '../core/interfaces';

export class MyCommand implements ICommandRegistrar {
  constructor(private readonly context: IPluginContext) {}

  register(plugin: Plugin): void {
    plugin.addCommand({
      id: 'my-command',
      name: 'My Command',
      callback: () => this.execute(),
    });
  }

  private execute(): void {
    this.context.logger.log('Executing command');
    // Your logic here
  }
}
```

2. Register in `src/commands/index.ts`:

```typescript
constructor(context: IPluginContext) {
  this.commands = [
    new ExampleModalCommand(context),
    new ExampleEditorCommand(context),
    new MyCommand(context), // Add here
  ];
}
```

### Creating a New Service

1. Define interface in `src/core/interfaces.ts`:

```typescript
export interface IMyService {
  doSomething(): Promise<void>;
}
```

2. Implement the service:

```typescript
// src/core/MyService.ts
import { IMyService, ILogger } from './interfaces';

export class MyService implements IMyService {
  constructor(private readonly logger: ILogger) {}

  async doSomething(): Promise<void> {
    this.logger.log('Doing something');
  }
}
```

3. Add to plugin context in `src/main.ts`:

```typescript
// In constructor
this.myService = new MyService(this.logger);

this.context = {
  app: this.app,
  plugin: this,
  logger: this.logger,
  settingsService: this.settingsService,
  myService: this.myService,
};
```

4. Update interface in `src/core/interfaces.ts`:

```typescript
export interface IPluginContext {
  app: App;
  plugin: Plugin;
  logger: ILogger;
  settingsService: ISettingsService;
  myService: IMyService; // Add here
}
```

### Adding Settings

1. Update types in `src/types.ts`:

```typescript
export interface PluginSettings {
  exampleSetting: string;
  newSetting: boolean; // Add here
}

export const DEFAULT_SETTINGS: PluginSettings = {
  exampleSetting: 'default value',
  newSetting: false, // Add default
};
```

2. Add UI in `src/settings/SettingsTab.ts`:

```typescript
new Setting(containerEl)
  .setName('New Setting')
  .setDesc('Description')
  .addToggle((toggle) =>
    toggle
      .setValue(settings.newSetting)
      .onChange(async (value) => {
        await this.settingsService.updateSettings({ newSetting: value });
      })
  );
```

## Building and Publishing

### Version Management

```bash
# Bump version (updates manifest.json and versions.json)
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0
```

### Build for Release

```bash
# Production build (no sourcemaps)
pnpm build:prod
```

This generates:
- `dist/main.js` - Plugin code
- `dist/manifest.json` - Plugin metadata
- `dist/version.json` - Version info

### Publishing

1. Create a GitHub release
2. Upload these files from `dist/`:
   - `main.js`
   - `manifest.json`
   - `version.json`

## Scripts Reference

- `pnpm dev` - Development mode with watch
- `pnpm build` - Build with source maps
- `pnpm build:prod` - Production build
- `pnpm lint` - Type check

## Testing

The DI architecture makes testing easy:

```typescript
const mockLogger: ILogger = {
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

const mockContext: IPluginContext = {
  app: mockApp,
  plugin: mockPlugin,
  logger: mockLogger,
  settingsService: mockSettingsService,
};

const command = new MyCommand(mockContext);
```

## Best Practices

- **SOLID**: Follow all five SOLID principles
- **DI**: Inject dependencies via constructors
- **Interfaces**: Program to interfaces, not implementations
- **Type Safety**: Use TypeScript strict mode
- **Single Responsibility**: One class, one purpose
- **Immutability**: Use `readonly` for dependencies
- **Clear Naming**: Descriptive names for clarity

## Resources

- [ARCHITECTURE.md](ARCHITECTURE.md) - Detailed architecture guide
- [Obsidian Plugin API](https://github.com/obsidianmd/obsidian-api)
- [Obsidian Developer Docs](https://docs.obsidian.md/)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)

## License

MIT

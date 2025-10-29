# Getting Started

Build your Obsidian plugin in minutes, not hours. This template handles all the boilerplate so you can focus on what makes your plugin unique.

## Prerequisites

Before you begin, make sure you have:

- **Node.js 18+** installed on your machine
- **pnpm** package manager (`npm install -g pnpm`)
- **Obsidian** installed with at least one vault
- Basic knowledge of **TypeScript** and **React**

## Installation

### 1. Clone the Template

```bash
git clone https://github.com/yourusername/obsidian-plugin-ts.git my-plugin
cd my-plugin
```

Or use as a GitHub template by clicking "Use this template" on the repository page.

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Your Plugin

Edit the manifest file to customize your plugin's metadata:

**`src/shared/lib/manifest.ts`**

```ts
export const manifest = {
  id: 'my-awesome-plugin',
  name: 'My Awesome Plugin',
  version: '1.0.0',
  minAppVersion: '0.15.0',
  description: 'A game-changing plugin for Obsidian',
  author: 'Your Name',
  authorUrl: 'https://github.com/yourusername',
  isDesktopOnly: false,
} as const satisfies PluginManifest;
```

## Development Workflow

### First-Time Setup

Configure the development environment to automatically sync with your Obsidian vault:

```bash
pnpm run dev:setup
```

The setup wizard will:

- 🔍 Scan for Obsidian vaults on your system
- 📋 Show you a list of detected vaults
- ✅ Let you select one or enter a custom path
- 💾 Save the configuration for future use

**Example output:**

```
🔧 Obsidian Plugin Development Setup

🔍 Scanning for Obsidian vaults...

Found 2 vault(s):

  1. /Users/you/Documents/PersonalVault
  2. /Users/you/Documents/WorkVault

Select a vault (1-2) or press Enter to enter custom path: 1

✅ Setup complete!
📂 Vault: /Users/you/Documents/PersonalVault
```

### Start Development

```bash
pnpm dev
```

This command does three things:

1. **Watches** your source files for changes
2. **Builds** your plugin automatically when you save
3. **Copies** the built files to your Obsidian vault

You'll see output like:

```
🚀 Obsidian Plugin Dev Mode
📦 Plugin ID: my-awesome-plugin
📂 Vault: /Users/you/Documents/PersonalVault
👀 Watching: dist

✅ Initial copy complete (3 files)

💡 Tips:
  - Make changes to your code
  - Files will auto-copy to your vault
  - Reload your plugin in Obsidian (Ctrl+R or Cmd+R)
  - Press Ctrl+C to stop
```

### Enable Your Plugin in Obsidian

1. Open Obsidian
2. Go to **Settings → Community plugins**
3. Turn off **Restricted mode** (if enabled)
4. Click **Reload plugins** or restart Obsidian
5. Find your plugin in the list and toggle it on

### Make Changes

Now you're ready to code! The workflow is simple:

1. Edit your code in `src/`
2. Save the file (Cmd+S / Ctrl+S)
3. Wait for the build to complete (~1-2 seconds)
4. Reload your plugin in Obsidian:
   - **macOS**: `Cmd+R`
   - **Windows/Linux**: `Ctrl+R`
   - Or use the Command Palette: "Reload app without saving"

> **Pro tip:** Keep Obsidian's Developer Console open (Cmd+Option+I / Ctrl+Shift+I) to see logs and errors in real-time.

## Project Structure

```
my-plugin/
├── src/
│   ├── features/          # Feature modules (modals, views, etc.)
│   ├── components/        # Shared React components
│   ├── shared/
│   │   ├── lib/           # Utilities, manifest, storage
│   │   └── styles/        # Global styles, Tailwind config
│   ├── types/             # TypeScript type definitions
│   └── main.ts            # Plugin entry point
├── scripts/               # Build and dev scripts
├── test/                  # Test files
├── docs/                  # Documentation
├── dist/                  # Built plugin (auto-generated)
└── package.json
```

## What's Next?

Now that you're set up, explore these guides:

- **[Features Overview](./features.md)** - See what's included
- **[Architecture Guide](./architecture.md)** - Understand the structure
- **[Adding Features](./guides/adding-features.md)** - Create your first feature
- **[Testing](./testing.md)** - Write tests for your plugin

## Common Issues

### Plugin doesn't appear in Obsidian

- Make sure you ran `pnpm run dev:setup` first
- Check that the vault path in `.dev-env` is correct
- Verify that Restricted mode is off
- Try restarting Obsidian

### Changes not reflecting

- Ensure `pnpm dev` is running
- Look for build errors in the terminal
- Check the console in Obsidian for errors
- Try a hard reload (Cmd+R or Ctrl+R)

### Build errors

- Run `pnpm install` again
- Delete `node_modules` and `dist`, then reinstall
- Check that your Node.js version is 18+

## Need Help?

- 📖 Read the [full documentation](./README.md)
- 🐛 [Report an issue](https://github.com/yourusername/obsidian-plugin-ts/issues)
- 💬 [Join the discussion](https://github.com/yourusername/obsidian-plugin-ts/discussions)

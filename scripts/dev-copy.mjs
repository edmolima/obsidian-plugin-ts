#!/usr/bin/env node

/**
 * Development Copy Script
 * Watches for build changes and automatically copies files to your Obsidian vault
 */

import { watch, existsSync, mkdirSync, copyFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { homedir } from 'os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const devEnvPath = join(rootDir, '.dev-env');
const distDir = join(rootDir, 'dist');

function readVaultPath() {
  if (!existsSync(devEnvPath)) {
    console.error('❌ .dev-env file not found!');
    console.error('Please run: npm run dev:setup\n');
    process.exit(1);
  }

  const content = readFileSync(devEnvPath, 'utf-8');
  const match = content.match(/OBSIDIAN_VAULT_PATH=(.+)/);

  if (!match) {
    console.error('❌ OBSIDIAN_VAULT_PATH not found in .dev-env');
    console.error('Please run: npm run dev:setup\n');
    process.exit(1);
  }

  let path = match[1].replace(/^["']|["']$/g, '').trim();

  // Expand ~ to home directory
  if (path.startsWith('~')) {
    path = join(homedir(), path.slice(1));
  }

  return path;
}

function getPluginId() {
  try {
    const manifestPath = join(distDir, 'manifest.json');
    if (existsSync(manifestPath)) {
      const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
      return manifest.id;
    }
  } catch (error) {
    // Fallback to package.json name
  }

  const packageJson = JSON.parse(
    readFileSync(join(rootDir, 'package.json'), 'utf-8')
  );
  return packageJson.name;
}

function copyToVault(vaultPath, pluginId) {
  const pluginDir = join(vaultPath, '.obsidian', 'plugins', pluginId);

  // Create plugin directory if it doesn't exist
  if (!existsSync(pluginDir)) {
    mkdirSync(pluginDir, { recursive: true });
    console.log(`📁 Created plugin directory: ${pluginDir}`);
  }

  // Files to copy
  const filesToCopy = [
    'main.js',
    'manifest.json',
    'styles.css',
  ];

  let copiedCount = 0;
  for (const file of filesToCopy) {
    const srcPath = join(distDir, file);
    const destPath = join(pluginDir, file);

    if (existsSync(srcPath)) {
      try {
        copyFileSync(srcPath, destPath);
        copiedCount++;
      } catch (error) {
        console.error(`❌ Failed to copy ${file}:`, error.message);
      }
    }
  }

  return copiedCount;
}

function startWatcher() {
  const vaultPath = readVaultPath();
  const pluginId = getPluginId();

  console.log('🚀 Obsidian Plugin Dev Mode');
  console.log(`📦 Plugin ID: ${pluginId}`);
  console.log(`📂 Vault: ${vaultPath}`);
  console.log(`👀 Watching: ${distDir}\n`);

  if (!existsSync(vaultPath)) {
    console.error(`❌ Vault path does not exist: ${vaultPath}`);
    console.error('Please check your .dev-env configuration\n');
    process.exit(1);
  }

  // Initial copy if dist exists
  if (existsSync(distDir)) {
    const count = copyToVault(vaultPath, pluginId);
    if (count > 0) {
      console.log(`✅ Initial copy complete (${count} files)\n`);
    }
  }

  // Watch for changes
  let copying = false;
  const watcher = watch(distDir, { recursive: false }, (eventType, filename) => {
    if (copying || !filename) return;

    const shouldCopy = ['main.js', 'manifest.json', 'styles.css'].includes(filename);

    if (shouldCopy) {
      copying = true;
      setTimeout(() => {
        const timestamp = new Date().toLocaleTimeString();
        const count = copyToVault(vaultPath, pluginId);
        if (count > 0) {
          console.log(`[${timestamp}] ♻️  Copied to vault (${count} files)`);
        }
        copying = false;
      }, 100); // Small delay to ensure file is fully written
    }
  });

  console.log('💡 Tips:');
  console.log('  - Make changes to your code');
  console.log('  - Files will auto-copy to your vault');
  console.log('  - Reload your plugin in Obsidian (Ctrl+R or Cmd+R)');
  console.log('  - Press Ctrl+C to stop\n');

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n\n👋 Stopping watcher...');
    watcher.close();
    process.exit(0);
  });
}

startWatcher();

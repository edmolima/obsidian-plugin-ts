#!/usr/bin/env node

/**
 * Development Setup Script
 * Creates a .dev-env file to store your Obsidian vault path for development
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createInterface } from 'readline';
import { homedir, platform } from 'os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const devEnvPath = join(rootDir, '.dev-env');

function expandPath(path) {
  if (path.startsWith('~')) {
    return join(homedir(), path.slice(1));
  }
  return path.replace(/%([^%]+)%/g, (_, key) => process.env[key] || '');
}

function isObsidianVault(path) {
  try {
    const obsidianPath = join(path, '.obsidian');
    return existsSync(obsidianPath) && statSync(obsidianPath).isDirectory();
  } catch {
    return false;
  }
}

function findVaultsInDirectory(searchPath) {
  const vaults = [];
  try {
    if (!existsSync(searchPath)) return vaults;

    const entries = readdirSync(searchPath, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory() && !entry.name.startsWith('.')) {
        const fullPath = join(searchPath, entry.name);
        if (isObsidianVault(fullPath)) {
          vaults.push(fullPath);
        }
      }
    }
  } catch {
    // Ignore errors (permissions, etc.)
  }
  return vaults;
}

function detectVaults() {
  const vaults = new Set();
  const os = platform();

  // Common search locations by platform
  const searchPaths = [];

  if (os === 'darwin') {
    // macOS
    searchPaths.push(
      join(homedir(), 'Documents'),
      join(homedir(), 'Library/Mobile Documents/iCloud~md~obsidian/Documents'),
      join(homedir(), 'Obsidian'),
    );
  } else if (os === 'win32') {
    // Windows
    searchPaths.push(
      join(homedir(), 'Documents'),
      join(homedir(), 'OneDrive/Documents'),
      join(process.env.APPDATA || '', 'Obsidian'),
    );
  } else {
    // Linux
    searchPaths.push(
      join(homedir(), 'Documents'),
      join(homedir(), 'Obsidian'),
      join(homedir(), '.config/obsidian'),
    );
  }

  // Search for vaults in common locations
  for (const searchPath of searchPaths) {
    const found = findVaultsInDirectory(searchPath);
    found.forEach((vault) => vaults.add(vault));

    // Also check if the search path itself is a vault
    if (isObsidianVault(searchPath)) {
      vaults.add(searchPath);
    }
  }

  return Array.from(vaults).sort();
}

function readExistingConfig() {
  if (existsSync(devEnvPath)) {
    const content = readFileSync(devEnvPath, 'utf-8');
    const match = content.match(/OBSIDIAN_VAULT_PATH=(.+)/);
    if (match) {
      return match[1].replace(/^["']|["']$/g, '');
    }
  }
  return null;
}

function askQuestion(query) {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    })
  );
}

async function setup() {
  console.log('🔧 Obsidian Plugin Development Setup\n');

  const existingPath = readExistingConfig();
  if (existingPath) {
    console.log(`✅ Current vault path: ${existingPath}\n`);
    const change = await askQuestion(
      'Do you want to change it? (y/N): '
    );
    if (change.toLowerCase() !== 'y') {
      console.log('✅ Setup complete!');
      return;
    }
    console.log();
  }

  // Detect vaults
  console.log('🔍 Scanning for Obsidian vaults...\n');
  const detectedVaults = detectVaults();

  let selectedVault = null;

  if (detectedVaults.length === 0) {
    console.log('⚠️  No vaults detected automatically.\n');
  } else {
    console.log(`Found ${detectedVaults.length} vault(s):\n`);
    detectedVaults.forEach((vault, index) => {
      console.log(`  ${index + 1}. ${vault}`);
    });
    console.log();

    const choice = await askQuestion(
      `Select a vault (1-${detectedVaults.length}) or press Enter to enter custom path: `
    );

    const choiceNum = parseInt(choice, 10);
    if (choiceNum >= 1 && choiceNum <= detectedVaults.length) {
      selectedVault = detectedVaults[choiceNum - 1];
    }
  }

  // If no vault selected, ask for custom path
  if (!selectedVault) {
    console.log('\nPlease enter the full path to your Obsidian vault for development.');
    console.log('Example paths:');
    console.log('  - /Users/yourname/Documents/MyVault');
    console.log('  - C:\\Users\\yourname\\Documents\\MyVault');
    console.log('  - ~/Documents/MyVault\n');

    const vaultPath = await askQuestion('Vault path: ');

    if (!vaultPath || vaultPath.trim() === '') {
      console.error('❌ No path provided. Setup cancelled.');
      process.exit(1);
    }

    selectedVault = expandPath(vaultPath.trim());
  }

  // Validate the vault
  if (!isObsidianVault(selectedVault)) {
    console.error(`\n❌ Not a valid Obsidian vault: ${selectedVault}`);
    console.error('   (No .obsidian folder found)');
    process.exit(1);
  }

  // Save to .dev-env
  const envContent = `# Obsidian Development Environment
# This file is used by the dev scripts to automatically copy the plugin to your vault

OBSIDIAN_VAULT_PATH="${selectedVault}"
`;

  writeFileSync(devEnvPath, envContent, 'utf-8');

  console.log('\n✅ Setup complete!');
  console.log(`📂 Vault: ${selectedVault}`);
  console.log('\n📝 Next steps:');
  console.log('  1. Run: pnpm dev');
  console.log('  2. Open your Obsidian vault');
  console.log('  3. Go to Settings → Community plugins → Turn off "Restricted mode"');
  console.log('  4. Enable your plugin from the list\n');
}

setup().catch((error) => {
  console.error('❌ Setup failed:', error);
  process.exit(1);
});

/**
 * Plugin Manifest Configuration
 * Type-safe manifest generation
 */

export interface PluginManifest {
  id: string;
  name: string;
  version: string;
  minAppVersion: string;
  description: string;
  author: string;
  authorUrl: string;
  isDesktopOnly: boolean;
  fundingUrl?: string;
}

/**
 * Main plugin manifest
 * Edit this file to configure your plugin
 */
export const manifest: PluginManifest = {
  id: 'obsidian-plugin-template',
  name: 'Obsidian Plugin Template',
  version: '1.0.0',
  minAppVersion: '0.15.0',
  description: 'A modular template for building Obsidian plugins',
  author: 'Your Name',
  authorUrl: 'https://github.com/yourusername',
  isDesktopOnly: false,
  // fundingUrl: 'https://buymeacoffee.com/yourusername', // Optional
};

/**
 * Export manifest as JSON
 */
export default manifest;

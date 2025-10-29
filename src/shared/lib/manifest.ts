/**
 * Obsidian Plugin Manifest
 * @see https://docs.obsidian.md/Reference/Manifest
 */
export interface PluginManifest {
  /** Unique ID for your plugin (should match the npm package name) */
  readonly id: string;
  /** Display name of your plugin */
  readonly name: string;
  /** Current version of your plugin (semver) */
  readonly version: string;
  /** Minimum Obsidian version required (semver) */
  readonly minAppVersion: string;
  /** Short description of your plugin */
  readonly description: string;
  /** Plugin author name */
  readonly author: string;
  /** Author website or GitHub profile URL */
  readonly authorUrl?: string;
  /** Whether the plugin only works on desktop (not mobile) */
  readonly isDesktopOnly?: boolean;
  /** Funding options for the plugin */
  readonly fundingUrl?: string | FundingOptions;
}

export interface FundingOptions {
  /** Buy Me a Coffee username */
  readonly 'Buy Me a Coffee'?: string;
  /** GitHub Sponsors username */
  readonly GitHub?: string;
  /** Patreon username */
  readonly Patreon?: string;
  /** Ko-fi username */
  readonly 'Ko-fi'?: string;
  /** Custom funding URL with label */
  readonly [key: string]: string | undefined;
}

export const manifest = {
  id: 'obsidian-plugin-ts',
  name: 'Obsidian Plugin TS',
  version: '1.0.0',
  minAppVersion: '0.15.0',
  description: 'Simple Obsidian plugin template with React',
  author: 'Edmo Lima',
  authorUrl: 'https://github.com/edmolima',
  isDesktopOnly: false,
} as const satisfies PluginManifest;

export default manifest;

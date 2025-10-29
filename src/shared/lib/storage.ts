import type { Plugin } from 'obsidian';

/**
 * Plugin Settings Interface
 * Add your plugin settings here
 */
export interface PluginSettings extends Record<string, unknown> {
  exampleSetting: string;
}

/**
 * Default settings values
 */
export const DEFAULT_SETTINGS: PluginSettings = {
  exampleSetting: 'default value',
};

/**
 * Type-safe storage manager for plugin settings
 * Handles loading, saving, and updating plugin settings
 */
export class Storage<T extends Record<string, unknown> = PluginSettings> {
  private settings: T;

  constructor(
    private readonly plugin: Plugin,
    private readonly defaultSettings: T
  ) {
    this.settings = { ...defaultSettings };
  }

  /**
   * Load settings from disk
   * Merges saved data with default settings
   */
  async loadSettings(): Promise<T> {
    const data = await this.plugin.loadData();
    this.settings = { ...this.defaultSettings, ...data };
    return this.settings;
  }

  /**
   * Save settings to disk
   */
  async saveSettings(settings: T): Promise<void> {
    this.settings = settings;
    await this.plugin.saveData(settings);
  }

  /**
   * Update specific setting(s) and save
   */
  async updateSettings(partial: Partial<T>): Promise<void> {
    this.settings = { ...this.settings, ...partial };
    await this.plugin.saveData(this.settings);
  }

  /**
   * Get current settings (readonly)
   */
  getSettings(): Readonly<T> {
    return { ...this.settings };
  }

  /**
   * Get a specific setting value
   */
  getSetting<K extends keyof T>(key: K): T[K] {
    return this.settings[key];
  }
}

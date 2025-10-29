import { Plugin } from 'obsidian';
import { ILogger, ISettingsService } from './interfaces';
import {
  PluginSettings,
  DEFAULT_SETTINGS,
  mergeSettings,
  isValidSettings,
} from '../types/settings';

/**
 * Settings service implementation - Single Responsibility Principle
 */
export class SettingsService implements ISettingsService {
  private settings: PluginSettings;

  constructor(
    private readonly plugin: Plugin,
    private readonly logger: ILogger
  ) {
    this.settings = { ...DEFAULT_SETTINGS };
  }

  getSettings(): PluginSettings {
    return this.settings;
  }

  async updateSettings(newSettings: Partial<PluginSettings>): Promise<void> {
    this.settings = { ...this.settings, ...newSettings };
    await this.saveSettings();
    this.logger.log('Settings updated', newSettings);
  }

  async loadSettings(): Promise<void> {
    const loadedData = await this.plugin.loadData();

    // Validate and merge settings
    if (loadedData && isValidSettings(loadedData)) {
      this.settings = mergeSettings(loadedData);
    } else {
      this.logger.warn('Invalid settings data, using defaults');
      this.settings = { ...DEFAULT_SETTINGS };
    }

    this.logger.log('Settings loaded');
  }

  async saveSettings(): Promise<void> {
    await this.plugin.saveData(this.settings);
    this.logger.log('Settings saved');
  }
}

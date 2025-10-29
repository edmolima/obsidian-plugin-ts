import { App, Plugin } from 'obsidian';
import { PluginSettings } from '../types/settings';

/**
 * Logger interface - Single Responsibility Principle
 */
export interface ILogger {
  log(...args: unknown[]): void;
  warn(...args: unknown[]): void;
  error(...args: unknown[]): void;
}

/**
 * Settings service interface - Interface Segregation Principle
 */
export interface ISettingsService {
  getSettings(): PluginSettings;
  updateSettings(settings: Partial<PluginSettings>): Promise<void>;
  loadSettings(): Promise<void>;
  saveSettings(): Promise<void>;
}

/**
 * Command registration interface - Open/Closed Principle
 */
export interface ICommandRegistrar {
  register(plugin: Plugin): void;
}

/**
 * Plugin context - Dependency Injection container
 */
export interface IPluginContext {
  app: App;
  plugin: Plugin;
  logger: ILogger;
  settingsService: ISettingsService;
}

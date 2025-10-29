import { Plugin } from 'obsidian';
import { ILogger, IPluginContext, ISettingsService } from './core/interfaces';
import { Logger } from './core/Logger';
import { SettingsService } from './core/SettingsService';
import { SettingsTab } from './settings/SettingsTab';
import { registerCommands } from './commands';

/**
 * Main plugin class with Dependency Injection
 * Follows SOLID principles:
 * - Single Responsibility: Orchestrates plugin lifecycle
 * - Dependency Inversion: Depends on abstractions (interfaces)
 * - Interface Segregation: Uses specific interfaces
 */
export default class MyPlugin extends Plugin {
  private readonly logger: ILogger;
  private readonly settingsService: ISettingsService;
  private readonly context: IPluginContext;

  constructor(app: any, manifest: any) {
    super(app, manifest);

    // Initialize dependencies
    this.logger = new Logger(this.manifest.name);
    this.settingsService = new SettingsService(this, this.logger);

    // Create plugin context for dependency injection
    this.context = {
      app: this.app,
      plugin: this,
      logger: this.logger,
      settingsService: this.settingsService,
    };
  }

  async onload(): Promise<void> {
    this.logger.log('Loading plugin');

    // Load settings
    await this.settingsService.loadSettings();

    // Register commands with injected dependencies
    registerCommands(this.context);

    // Add settings tab with injected dependencies
    this.addSettingTab(new SettingsTab(this.app, this, this.settingsService));

    // Add ribbon icon (optional)
    this.addRibbonIcon('dice', 'Example Plugin', () => {
      this.logger.log('Ribbon icon clicked');
    });

    this.logger.log('Plugin loaded');
  }

  onunload(): void {
    this.logger.log('Unloading plugin');
  }
}

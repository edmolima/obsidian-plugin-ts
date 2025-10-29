import { App, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { ISettingsService } from '../core/interfaces';

/**
 * Settings tab implementation - Dependency Injection
 */
export class SettingsTab extends PluginSettingTab {
  constructor(
    app: App,
    plugin: Plugin,
    private readonly settingsService: ISettingsService
  ) {
    super(app, plugin);
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl('h2', { text: 'Plugin Settings' });

    const settings = this.settingsService.getSettings();

    new Setting(containerEl)
      .setName('Example Setting')
      .setDesc('This is an example setting')
      .addText((text) =>
        text
          .setPlaceholder('Enter value')
          .setValue(settings.exampleSetting)
          .onChange(async (value) => {
            await this.settingsService.updateSettings({ exampleSetting: value });
          })
      );
  }
}

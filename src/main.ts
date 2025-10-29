import { Plugin } from 'obsidian';
import { ExampleModal } from './features/example-modal';
import { SettingsTab } from './features/settings';
import { DEFAULT_SETTINGS, Storage, type PluginSettings } from './shared/lib/storage';
import './shared/styles/globals.css';

export default class MyPlugin extends Plugin {
  storage!: Storage<PluginSettings>;

  async onload() {
    console.log('Loading plugin');

    // Initialize storage with default settings
    this.storage = new Storage(this, DEFAULT_SETTINGS);
    await this.storage.loadSettings();

    // Add settings tab
    this.addSettingTab(new SettingsTab(this.app, this, this.storage));

    // Add commands
    this.addCommand({
      id: 'open-example-modal',
      name: 'Open Example Modal',
      callback: () => {
        new ExampleModal(this.app).open();
      },
    });

    // Add ribbon icon
    this.addRibbonIcon('dice', 'Example Plugin', () => {
      new ExampleModal(this.app).open();
    });
  }

  onunload() {
    console.log('Unloading plugin');
  }
}

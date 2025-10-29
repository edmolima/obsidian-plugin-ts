import React from 'react';
import type { App, Plugin } from 'obsidian';
import { ReactSettingsTab } from '../../components/SettingsTab';
import { SettingsView } from './SettingsView';
import type { Storage, PluginSettings } from '../../shared/lib/storage';

export class SettingsTab extends ReactSettingsTab {
  constructor(
    app: App,
    plugin: Plugin,
    private readonly storage: Storage<PluginSettings>
  ) {
    super(app, plugin);
  }

  render(): React.ReactElement {
    return (
      <SettingsView
        getSettings={() => this.storage.getSettings()}
        updateSettings={(partial) => this.storage.updateSettings(partial)}
      />
    );
  }
}

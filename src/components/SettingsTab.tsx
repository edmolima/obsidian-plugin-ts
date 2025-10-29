import type { App, Plugin } from 'obsidian';
import { PluginSettingTab } from 'obsidian';
import type { Root } from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import type React from 'react';

/**
 * Abstract base class for Obsidian settings tabs using React
 * Bridges Obsidian's PluginSettingTab API with React components
 */
export abstract class ReactSettingsTab extends PluginSettingTab {
  protected root: Root | null = null;

  constructor(app: App, plugin: Plugin) {
    super(app, plugin);
  }

  /**
   * Render the React component for this settings tab
   * Must be implemented by subclasses
   */
  abstract render(): React.ReactElement;

  /**
   * Called when the settings tab is displayed
   * Creates React root and renders the component
   */
  display(): void {
    this.containerEl.empty();
    this.root = createRoot(this.containerEl);
    this.root.render(this.render());
  }

  /**
   * Called when the settings tab is hidden
   * Unmounts React component and cleans up
   */
  hide(): void {
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
  }
}

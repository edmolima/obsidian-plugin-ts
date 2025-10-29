import type { App } from 'obsidian';
import { Modal } from 'obsidian';
import type { Root } from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import type React from 'react';

/**
 * Abstract base class for Obsidian modals using React
 * Bridges Obsidian's Modal API with React components
 */
export abstract class ReactModal extends Modal {
  protected root: Root | null = null;

  constructor(app: App) {
    super(app);
  }

  /**
   * Render the React component for this modal
   * Must be implemented by subclasses
   */
  abstract render(): React.ReactElement;

  /**
   * Called when the modal is opened
   * Creates React root and renders the component
   */
  onOpen(): void {
    this.root = createRoot(this.contentEl);
    this.root.render(this.render());
  }

  /**
   * Called when the modal is closed
   * Unmounts React component and cleans up
   */
  onClose(): void {
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
    this.contentEl.empty();
  }
}

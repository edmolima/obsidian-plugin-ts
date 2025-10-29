import React from 'react';
import type { App } from 'obsidian';
import { Notice } from 'obsidian';
import { ReactModal } from '../../components/Modal';
import { ExampleModalView } from './ExampleModalView';

/**
 * Example modal demonstrating React integration with Obsidian
 */
export class ExampleModal extends ReactModal {
  constructor(app: App) {
    super(app);
  }

  render(): React.ReactElement {
    return (
      <ExampleModalView
        onClose={() => this.close()}
        onSubmit={(text: string) => {
          new Notice(`You entered: ${text}`);
        }}
      />
    );
  }
}

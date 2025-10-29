import { App, Modal } from 'obsidian';

export class ExampleModal extends Modal {
  constructor(app: App) {
    super(app);
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.createEl('h2', { text: 'Example Modal' });
    contentEl.createEl('p', { text: 'This is an example modal dialog.' });
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
}

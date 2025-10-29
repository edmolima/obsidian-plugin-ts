import {
  Editor,
  MarkdownView,
  MarkdownFileInfo,
  Plugin,
} from 'obsidian';
import { ICommandRegistrar, IPluginContext } from '../core/interfaces';
import { COMMAND_IDS } from '../types/commands';

/**
 * Example editor command - Single Responsibility Principle
 */
export class ExampleEditorCommand implements ICommandRegistrar {
  constructor(private readonly context: IPluginContext) {}

  register(plugin: Plugin): void {
    plugin.addCommand({
      id: COMMAND_IDS.EXAMPLE_EDITOR_COMMAND,
      name: 'Example Editor Command',
      editorCallback: (editor: Editor, ctx: MarkdownView | MarkdownFileInfo) =>
        this.execute(editor, ctx),
    });
  }

  private execute(
    editor: Editor,
    ctx: MarkdownView | MarkdownFileInfo
  ): void {
    const selection = editor.getSelection();
    this.context.logger.log('Modifying selection:', selection);
    editor.replaceSelection(`Modified: ${selection}`);
  }
}

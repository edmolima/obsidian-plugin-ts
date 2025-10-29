import { Plugin } from 'obsidian';
import { ICommandRegistrar, IPluginContext } from '../core/interfaces';
import { ExampleModal } from '../modals/ExampleModal';
import { COMMAND_IDS } from '../types/commands';

/**
 * Example modal command - Single Responsibility Principle
 */
export class ExampleModalCommand implements ICommandRegistrar {
  constructor(private readonly context: IPluginContext) {}

  register(plugin: Plugin): void {
    plugin.addCommand({
      id: COMMAND_IDS.OPEN_EXAMPLE_MODAL,
      name: 'Open Example Modal',
      callback: () => this.execute(),
    });
  }

  private execute(): void {
    this.context.logger.log('Opening example modal');
    new ExampleModal(this.context.app).open();
  }
}

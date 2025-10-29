import { ICommandRegistrar, IPluginContext } from '../core/interfaces';
import { ExampleModalCommand } from './ExampleModalCommand';
import { ExampleEditorCommand } from './ExampleEditorCommand';

/**
 * Command registry - Open/Closed Principle
 * New commands can be added without modifying existing code
 */
export class CommandRegistry {
  private readonly commands: ICommandRegistrar[];

  constructor(context: IPluginContext) {
    this.commands = [
      new ExampleModalCommand(context),
      new ExampleEditorCommand(context),
    ];
  }

  registerAll(plugin: any): void {
    this.commands.forEach((command) => command.register(plugin));
  }
}

/**
 * Register all commands - uses context for dependency injection
 */
export function registerCommands(context: IPluginContext): void {
  const registry = new CommandRegistry(context);
  registry.registerAll(context.plugin);
}

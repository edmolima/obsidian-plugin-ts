/**
 * Command Types
 * Type-safe command definitions
 */

import { Command, Editor, MarkdownView } from 'obsidian';

/**
 * Command IDs - centralized and type-safe
 */
export const COMMAND_IDS = {
  OPEN_EXAMPLE_MODAL: 'open-example-modal',
  EXAMPLE_EDITOR_COMMAND: 'example-editor-command',
} as const;

export type CommandId = (typeof COMMAND_IDS)[keyof typeof COMMAND_IDS];

/**
 * Command callback types
 */
export type CommandCallback = () => void;
export type EditorCommandCallback = (
  editor: Editor,
  view: MarkdownView
) => void;
export type CheckCallback = () => boolean;

/**
 * Command definition with type safety
 */
export interface TypedCommand extends Omit<Command, 'id'> {
  id: CommandId;
}

/**
 * Type guard for command ID
 */
export function isValidCommandId(id: string): id is CommandId {
  return Object.values(COMMAND_IDS).includes(id as CommandId);
}

/**
 * Event Types
 * Type-safe event handling
 */

/**
 * Event names - centralized and type-safe
 */
export const EVENT_NAMES = {
  SETTINGS_CHANGED: 'settings-changed',
  PLUGIN_LOADED: 'plugin-loaded',
  PLUGIN_UNLOADED: 'plugin-unloaded',
} as const;

export type EventName = (typeof EVENT_NAMES)[keyof typeof EVENT_NAMES];

/**
 * Event payload types
 */
export interface SettingsChangedEvent {
  oldSettings: Record<string, unknown>;
  newSettings: Record<string, unknown>;
}

export interface PluginLoadedEvent {
  timestamp: number;
}

export interface PluginUnloadedEvent {
  timestamp: number;
}

/**
 * Event type mapping
 */
export interface EventMap {
  [EVENT_NAMES.SETTINGS_CHANGED]: SettingsChangedEvent;
  [EVENT_NAMES.PLUGIN_LOADED]: PluginLoadedEvent;
  [EVENT_NAMES.PLUGIN_UNLOADED]: PluginUnloadedEvent;
}

/**
 * Type-safe event emitter interface
 */
export interface IEventEmitter {
  on<K extends EventName>(
    event: K,
    callback: (payload: EventMap[K]) => void
  ): void;
  off<K extends EventName>(
    event: K,
    callback: (payload: EventMap[K]) => void
  ): void;
  emit<K extends EventName>(event: K, payload: EventMap[K]): void;
}

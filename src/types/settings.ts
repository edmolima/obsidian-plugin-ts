/**
 * Plugin Settings Types
 * Type-safe settings configuration
 */

export interface PluginSettings {
  /** Example setting */
  exampleSetting: string;
  // Add more settings here with proper types and documentation
}

export const DEFAULT_SETTINGS: Readonly<PluginSettings> = {
  exampleSetting: 'default value',
} as const;

/**
 * Type guard to check if settings are valid
 */
export function isValidSettings(settings: unknown): settings is PluginSettings {
  if (typeof settings !== 'object' || settings === null) {
    return false;
  }

  const s = settings as Record<string, unknown>;

  return typeof s.exampleSetting === 'string';
}

/**
 * Merge partial settings with defaults
 */
export function mergeSettings(
  partial: Partial<PluginSettings>
): PluginSettings {
  return {
    ...DEFAULT_SETTINGS,
    ...partial,
  };
}

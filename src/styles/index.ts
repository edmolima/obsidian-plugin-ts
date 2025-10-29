/**
 * Styles barrel export
 * Import all styles here for centralized management
 */

// Note: CSS files will be bundled separately by Rollup
// This file is for organizing style-related TypeScript utilities

/**
 * CSS class names - type-safe class names
 */
export const CSS_CLASSES = {
  modal: {
    example: 'example-modal',
  },
  settings: {
    container: 'plugin-settings-container',
  },
} as const;

/**
 * Type-safe CSS class getter
 */
export type CSSClassPath = {
  modal: keyof typeof CSS_CLASSES.modal;
  settings: keyof typeof CSS_CLASSES.settings;
};

/**
 * Get CSS class name safely
 */
export function getCSSClass(
  category: keyof typeof CSS_CLASSES,
  name: string
): string {
  const classes = CSS_CLASSES[category];
  if (name in classes) {
    return (classes as Record<string, string>)[name];
  }
  throw new Error(`CSS class ${category}.${name} not found`);
}

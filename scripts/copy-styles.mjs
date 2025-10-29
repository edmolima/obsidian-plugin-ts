import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

/**
 * Copy CSS files to dist
 */
function copyStyles() {
  try {
    const distDir = join(rootDir, 'dist');

    // Ensure dist directory exists
    if (!existsSync(distDir)) {
      mkdirSync(distDir, { recursive: true });
    }

    // Copy main CSS file
    const sourceCss = join(rootDir, 'src', 'styles', 'main.css');
    const destCss = join(distDir, 'styles.css');

    copyFileSync(sourceCss, destCss);
    console.log(`✓ Copied styles: src/styles/main.css → dist/styles.css`);
  } catch (error) {
    console.error('Failed to copy styles:', error.message);
    process.exit(1);
  }
}

copyStyles();

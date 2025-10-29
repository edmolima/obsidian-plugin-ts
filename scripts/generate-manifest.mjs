import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

/**
 * Generate manifest.json from manifest.ts
 * This allows type-safe manifest configuration
 */
async function generateManifest() {
  try {
    // Prefer a JSON manifest source if present (works in dev without TS loader)
    const jsonPath = join(rootDir, 'src', 'shared', 'lib', 'manifest.json');
    let manifest;

    try {
      // Try reading the JSON manifest first
      const content = await import(`file://${jsonPath}`);
      manifest = content.default || content;
    } catch (e) {
      // Fallback to importing the TypeScript manifest (requires TS loader)
      const manifestModule = await import(
        join(rootDir, 'src', 'shared', 'lib', 'manifest.ts')
      );
      manifest = manifestModule.manifest || manifestModule.default;
    }

    // Write to dist/manifest.json
    const manifestPath = join(rootDir, 'dist', 'manifest.json');
    writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

    console.log(`✓ Generated dist/manifest.json`);
    console.log(`  - Name: ${manifest.name}`);
    console.log(`  - Version: ${manifest.version}`);
    console.log(`  - ID: ${manifest.id}`);
  } catch (error) {
    console.error('Failed to generate manifest.json:', error.message);
    process.exit(1);
  }
}

generateManifest();

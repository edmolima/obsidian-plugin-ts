import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

/**
 * Generate manifest.json from manifest.ts
 * This allows type-safe manifest configuration
 */
async function generateManifest() {
  try {
    // Import the manifest configuration
    const manifestModule = await import(
      join(rootDir, 'src', 'config', 'manifest.ts')
    );
    const manifest = manifestModule.manifest || manifestModule.default;

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

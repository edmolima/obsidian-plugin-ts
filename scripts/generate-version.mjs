import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

/**
 * Generate version.json from manifest.ts
 */
async function generateVersion() {
  try {
    // Import the manifest configuration
    const manifestModule = await import(
      join(rootDir, 'src', 'config', 'manifest.ts')
    );
    const manifest = manifestModule.manifest || manifestModule.default;

    // Create version.json for distribution
    const versionInfo = {
      version: manifest.version,
      minAppVersion: manifest.minAppVersion,
    };

    const versionPath = join(rootDir, 'dist', 'version.json');
    writeFileSync(versionPath, JSON.stringify(versionInfo, null, 2));

    console.log(`✓ Generated dist/version.json for version ${manifest.version}`);
  } catch (error) {
    console.error('Failed to generate version.json:', error.message);
    process.exit(1);
  }
}

generateVersion();

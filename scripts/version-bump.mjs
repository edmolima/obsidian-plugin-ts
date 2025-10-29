import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const targetVersion = process.env.npm_package_version;

/**
 * Update manifest.ts version
 * This updates the TypeScript source file
 */
async function updateManifestVersion() {
  const manifestPath = join(rootDir, 'src', 'shared', 'lib', 'manifest.ts');
  let manifestContent = readFileSync(manifestPath, 'utf8');

  // Import to get minAppVersion
  const manifestModule = await import(manifestPath);
  const { minAppVersion } = manifestModule.manifest || manifestModule.default;

  // Replace version in the source file
  manifestContent = manifestContent.replace(
    /version:\s*['"][\d.]+['"]/,
    `version: '${targetVersion}'`
  );

  writeFileSync(manifestPath, manifestContent);
  console.log(`✓ Updated manifest.ts version to ${targetVersion}`);

  // Update versions.json
  const versionsPath = join(rootDir, 'versions.json');
  let versions = JSON.parse(readFileSync(versionsPath, 'utf8'));
  versions[targetVersion] = minAppVersion;
  writeFileSync(versionsPath, JSON.stringify(versions, null, 2));

  console.log(`✓ Version bumped to ${targetVersion}`);
}

updateManifestVersion();

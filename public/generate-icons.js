import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceLogo = join(__dirname, 'logo.png');
const outputDir = __dirname;

if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

const faviconConfigs = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
];

const iconConfigs = [
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
  { name: 'maskable-icon-192.png', size: 192, maskable: true },
  { name: 'maskable-icon-512.png', size: 512, maskable: true },
];

async function generateIcon(config, sourceImage = sourceLogo) {
  const outputPath = join(outputDir, config.name);

  try {
    let image = sharp(sourceImage);

    if (config.maskable) {
      const safeSize = Math.round(config.size * 0.8);
      const padding = (config.size - safeSize) / 2;

      image = image
        .resize(safeSize, safeSize, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .extend({
          top: padding,
          bottom: padding,
          left: padding,
          right: padding,
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        });
    } else if (typeof config.size === 'object') {
      image = image.resize(config.size.width, config.size.height, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      });
    } else {
      image = image.resize(config.size, config.size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      });
    }

    await image.png().toFile(outputPath);
    const relativePath = outputPath.replace(outputDir, '').replace(/\\/g, '/');
    console.log(`✓ Generated ${relativePath}`);
  } catch (error) {
    console.error(`✗ Failed to generate ${config.name}:`, error.message);
  }
}

async function generateFaviconICO() {
  const icoPath = join(outputDir, 'favicon.ico');

  try {
    await sharp(sourceLogo)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toFile(icoPath);

    console.log(`✓ Generated favicon.ico`);
  } catch (error) {
    console.error(`✗ Failed to generate favicon.ico:`, error.message);
  }
}

async function generateFaviconSVG() {
  const svgPath = join(outputDir, 'favicon.svg');

  try {
    const buffer = await sharp(sourceLogo)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();

    const base64 = buffer.toString('base64');

    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32" viewBox="0 0 32 32">
  <image width="32" height="32" xlink:href="data:image/png;base64,${base64}"/>
</svg>`;

    const fs = await import('fs/promises');
    await fs.writeFile(svgPath, svg, 'utf-8');
    console.log(`✓ Generated favicon.svg`);
  } catch (error) {
    console.error(`✗ Failed to generate favicon.svg:`, error.message);
  }
}

async function main() {
  console.log('🎨 Generating icons from logo.png...\n');

  if (!existsSync(sourceLogo)) {
    console.error(`✗ Source logo not found: ${sourceLogo}`);
    process.exit(1);
  }

  console.log('📌 Favicons and app icons\n');
  for (const config of faviconConfigs) {
    await generateIcon(config);
  }
  for (const config of iconConfigs) {
    await generateIcon(config);
  }

  await generateFaviconICO();
  await generateFaviconSVG();

  console.log('\n✨ Icon generation complete!');
}

main().catch(console.error);

// One-off local generation script for derived brand assets (favicon +
// Open Graph image). Run with `node scripts/generate-brand-assets.mjs`.
//
// Reads the existing official FM mark (`public/assets/brand/flowmind-ai-navbar.png`,
// a transparent-background crop of the full brand asset) and produces:
//   - app/icon.png          (square favicon, trimmed + padded FM mark)
//   - app/apple-icon.png    (same mark, iOS/touch-icon sizing)
//   - public/assets/brand/flowmind-ai-og.png (1200x630 social share image)
//
// Does NOT modify the original brand assets in public/assets/brand/.
import { existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const markPath = join(root, "public/assets/brand/flowmind-ai-navbar.png");

async function buildFavicon() {
  // Trim transparent padding around the FM mark, then re-pad evenly into a
  // square canvas so the icon is centered and not stretched.
  const trimmed = await sharp(markPath).trim().toBuffer();
  const trimmedMeta = await sharp(trimmed).metadata();
  const side = Math.max(trimmedMeta.width ?? 0, trimmedMeta.height ?? 0);
  // ~10% breathing room around the mark.
  const canvas = Math.round(side * 1.18);

  const square = await sharp({
    create: {
      width: canvas,
      height: canvas,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: trimmed,
        left: Math.round((canvas - (trimmedMeta.width ?? 0)) / 2),
        top: Math.round((canvas - (trimmedMeta.height ?? 0)) / 2),
      },
    ])
    .png()
    .toBuffer();

  await sharp(square).resize(512, 512).png().toFile(join(root, "app/icon.png"));
  await sharp(square).resize(180, 180).png().toFile(join(root, "app/apple-icon.png"));
  console.log("Wrote app/icon.png (512x512) and app/apple-icon.png (180x180)");
}

async function buildOgImage() {
  const width = 1200;
  const height = 630;
  const markSize = 300;
  const markBuffer = await sharp(markPath)
    .resize(markSize, markSize, { fit: "inside" })
    .png()
    .toBuffer();
  const markMeta = await sharp(markBuffer).metadata();

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#05070d"/>
          <stop offset="100%" stop-color="#0b1220"/>
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#bg)"/>
      <text x="600" y="430" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="800" fill="#ffffff" text-anchor="middle">FlowMind AI</text>
      <text x="600" y="480" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="400" fill="#9fb3d1" text-anchor="middle">AI Solutions That Automate, Convert &amp; Scale Your Business.</text>
    </svg>
  `;

  const textLayer = Buffer.from(svg);

  await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 5, g: 7, b: 13, alpha: 1 },
    },
  })
    .composite([
      { input: textLayer, left: 0, top: 0 },
      {
        input: markBuffer,
        left: Math.round((width - (markMeta.width ?? markSize)) / 2),
        top: 90,
      },
    ])
    .png()
    .toFile(join(root, "public/assets/brand/flowmind-ai-og.png"));

  console.log("Wrote public/assets/brand/flowmind-ai-og.png (1200x630)");
}

async function main() {
  if (!existsSync(markPath)) {
    throw new Error(`Source brand mark not found at ${markPath}`);
  }
  mkdirSync(join(root, "app"), { recursive: true });
  await buildFavicon();
  await buildOgImage();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

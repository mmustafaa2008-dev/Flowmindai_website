// One-off local generation script for derived brand assets (favicon +
// Open Graph image). Run with `node scripts/generate-brand-assets.mjs`.
//
// Reads the existing official FM mark (`public/assets/brand/flowmind-ai-navbar.png`,
// a transparent-background crop of the full brand asset) and produces:
//   - app/icon.png          (square favicon, trimmed + padded FM mark)
//   - app/apple-icon.png    (same mark, iOS/touch-icon sizing)
//   - app/favicon.ico       (replaces the leftover default Next.js favicon.ico)
//   - public/assets/brand/flowmind-ai-og.png (1200x630 social share image)
//
// Does NOT modify the original brand assets in public/assets/brand/.
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const markPath = join(root, "public/assets/brand/flowmind-ai-navbar.png");

/**
 * Packs one or more same-format PNG buffers into a minimal multi-size
 * ICO container (the "PNG-in-ICO" format supported by all modern
 * browsers/OSes since Windows Vista — no legacy BMP encoding needed).
 * Avoids pulling in an extra npm dependency for a one-off asset build.
 */
function buildIco(pngEntries) {
  const headerSize = 6;
  const dirEntrySize = 16;
  const dirSize = headerSize + dirEntrySize * pngEntries.length;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: 1 = icon
  header.writeUInt16LE(pngEntries.length, 4); // image count

  let offset = dirSize;
  const dirEntries = [];
  const imageBuffers = [];

  for (const { size, buffer } of pngEntries) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 == 256)
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height (0 == 256)
    entry.writeUInt8(0, 2); // color palette count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(buffer.length, 8); // image data size
    entry.writeUInt32LE(offset, 12); // image data offset
    dirEntries.push(entry);
    imageBuffers.push(buffer);
    offset += buffer.length;
  }

  return Buffer.concat([header, ...dirEntries, ...imageBuffers]);
}

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

  // Replace the leftover default Next.js app/favicon.ico with a real
  // multi-size ICO derived from the same trimmed FM mark, so browsers
  // that request /favicon.ico directly (bookmarks, some tab-bar code
  // paths) also get the brand mark instead of the scaffold default.
  const icoSizes = [16, 32, 48, 256];
  const icoEntries = await Promise.all(
    icoSizes.map(async (size) => ({
      size,
      buffer: await sharp(square).resize(size, size).png().toBuffer(),
    })),
  );
  writeFileSync(join(root, "app/favicon.ico"), buildIco(icoEntries));
  console.log(`Wrote app/favicon.ico (sizes: ${icoSizes.join(", ")})`);
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

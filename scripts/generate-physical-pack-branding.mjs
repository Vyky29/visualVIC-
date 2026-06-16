/**
 * Physical Activity pack branding — green logo + back card (#43A047).
 * Distinct from brushing teeth sage (#D4E1C2 / backcard3).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

/** Matches PHYSICAL_CATEGORY_COLOUR — vibrant fitness green. */
const GREEN = { r: 67, g: 160, b: 71 };
const GREEN_HEX = "#43A047";
const GREEN_TINT = "#E8F5E9";

const srcLogo = path.join(root, "public", "cards", "at the hotel", "logo-hotel.png");
const outDir = path.join(root, "public", "cards", "physical");
const outLogo = path.join(outDir, "logo-physical.png");
const outBack = path.join(outDir, "backcard-physical.png");

async function tintLogo(from, to, rgb) {
  const { data, info } = await sharp(from)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3];
    if (a < 16) continue;
    const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    if (lum > 240) continue;
    data[i] = rgb.r;
    data[i + 1] = rgb.g;
    data[i + 2] = rgb.b;
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(to);
}

function backcardSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="744" height="1054" viewBox="0 0 744 1054">
  <rect width="744" height="1054" fill="${GREEN_HEX}"/>
  <rect x="72" y="120" width="600" height="814" rx="48" fill="${GREEN_TINT}"/>
  <text x="372" y="540" text-anchor="middle" font-family="system-ui,sans-serif" font-size="38" font-weight="700" fill="${GREEN_HEX}">Physical Activity</text>
</svg>`;
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  await tintLogo(srcLogo, outLogo, GREEN);
  await sharp(Buffer.from(backcardSvg())).png().toFile(outBack);
  console.log("wrote", outLogo);
  console.log("wrote", outBack);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

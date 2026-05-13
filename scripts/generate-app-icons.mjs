/**
 * Builds square PWA / apple-touch icons from `public/brand/pixtolearn-logo.png`.
 * Run from repo root: `node scripts/generate-app-icons.mjs`
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const src = path.join(root, "public", "brand", "pixtolearn-logo.png");
const outDir = path.join(root, "public", "brand");
/** Matches manifest `theme_color` / app shell */
const BG = "#f4f6f4";
/** Logo fits inside this fraction so circular/squircle masks do not clip artwork */
const INNER_FRACTION = 0.72;

/**
 * @param {number} size
 * @param {string} filename
 */
async function writeIcon(size, filename) {
  const inner = Math.round(size * INNER_FRACTION);
  const resized = await sharp(src)
    .resize(inner, inner, { fit: "inside" })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 3,
      background: BG,
    },
  })
    .composite([{ input: resized, gravity: "center" }])
    .png()
    .toFile(path.join(outDir, filename));

  console.log("wrote", filename);
}

await writeIcon(512, "pixtolearn-app-icon-512.png");
await writeIcon(192, "pixtolearn-app-icon-192.png");
await writeIcon(180, "pixtolearn-app-icon-180.png");

/**
 * Day Centre · General — Home icon only (no people, no Ikram).
 * PixtoLearn: simple house, transparent PNG, 531×648.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const W = 531;
const H = 648;
const outDir = path.join(root, "public", "cards", "day centre", "general");

const HOME_SVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <path d="M108 400 L266 208 L424 400 Z" fill="#E05C9A" stroke="#C2185B" stroke-width="4"/>
  <rect x="156" y="348" width="220" height="120" rx="8" fill="#FFFFFF" stroke="#BDBDBD" stroke-width="4"/>
  <rect x="214" y="392" width="56" height="76" rx="6" fill="#8B5E3C" stroke="#5D4037" stroke-width="3"/>
  <circle cx="256" cy="432" r="5" fill="#F5C84D"/>
  <rect x="300" y="372" width="40" height="40" rx="6" fill="#B8E3F4" stroke="#64B5F6" stroke-width="3"/>
  <line x1="320" y1="372" x2="320" y2="412" stroke="#64B5F6" stroke-width="2"/>
  <line x1="300" y1="392" x2="340" y2="392" stroke="#64B5F6" stroke-width="2"/>
  <rect x="168" y="372" width="32" height="32" rx="6" fill="#B8E3F4" stroke="#64B5F6" stroke-width="3"/>
  <line x1="184" y1="372" x2="184" y2="404" stroke="#64B5F6" stroke-width="2"/>
  <line x1="168" y1="388" x2="200" y2="388" stroke="#64B5F6" stroke-width="2"/>
</svg>`;

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const dest = path.join(outDir, "home.png");
  await sharp(Buffer.from(HOME_SVG)).png().toFile(dest);
  console.log("ok: general/home.png (house only, no people)");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

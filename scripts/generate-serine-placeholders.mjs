/**
 * Placeholder cards for Serine physical schedule — until 2D/3D art is imported.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { SERINE_PHYSICAL_SCHEDULE } from "./serine-physical-manifest.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const serineDir = path.join(root, "public", "cards", "day centre", "serine");
const scenesDir = path.join(serineDir, "scenes");

const W = 531;
const H = 648;
const PINK = "#E05C9A";

async function placeholderSvg(title, slug) {
  const safeTitle = title.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="100%" height="100%" fill="#ffffff"/>
  <rect x="24" y="24" width="${W - 48}" height="${H - 48}" rx="20" fill="${PINK}" fill-opacity="0.12" stroke="${PINK}" stroke-width="3"/>
  <text x="50%" y="42%" text-anchor="middle" font-family="system-ui,sans-serif" font-size="28" font-weight="700" fill="${PINK}">Serine</text>
  <text x="50%" y="52%" text-anchor="middle" font-family="system-ui,sans-serif" font-size="22" fill="#333">${safeTitle}</text>
  <text x="50%" y="62%" text-anchor="middle" font-family="system-ui,sans-serif" font-size="14" fill="#888">${slug}</text>
  <text x="50%" y="72%" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" fill="#aaa">2D cartoon pending</text>
</svg>`;
  return sharp(Buffer.from(svg)).png().toBuffer();
}

async function main() {
  fs.mkdirSync(scenesDir, { recursive: true });

  for (const { slug, title } of SERINE_PHYSICAL_SCHEDULE) {
    const buf = await placeholderSvg(title, slug);
    for (const dest of [
      path.join(serineDir, `${slug}.png`),
      path.join(scenesDir, `${slug}.png`),
      path.join(scenesDir, `${slug}-focus.png`),
    ]) {
      await sharp(buf).png().toFile(dest);
    }
    console.log("placeholder:", slug);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

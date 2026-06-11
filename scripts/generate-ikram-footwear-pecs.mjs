/**
 * Ikram PECS — socks, shoes & walking with footwear always visible.
 * Outputs 531×648 + 531×663 focus PNGs under ikram/scenes/.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const NOW_W = 531;
const NOW_H = 648;
const FOCUS_H = 663;

const ikramDir = path.join(root, "public", "cards", "day centre", "ikram");
const scenesDir = path.join(ikramDir, "scenes");

/** Shared Ikram figure — pink sweatshirt, brown skin, socks + trainers on feet. */
const IKRAM_UPPER = `
  <circle cx="266" cy="168" r="44" fill="#C68642" stroke="#8D5524" stroke-width="3"/>
  <ellipse cx="266" cy="132" rx="46" ry="28" fill="#3D2314" stroke="#2A180D" stroke-width="2"/>
  <circle cx="266" cy="196" r="6" fill="#8D5524" opacity="0.35"/>
  <path d="M222 208 Q266 228 310 208 L318 296 Q266 312 214 296 Z" fill="#FF1493" stroke="#C2185B" stroke-width="4"/>
  <path d="M234 296 L234 360" stroke="#C68642" stroke-width="14" stroke-linecap="round"/>
  <path d="M298 296 L298 360" stroke="#C68642" stroke-width="14" stroke-linecap="round"/>
`;

/** White ankle socks — always drawn on both feet. */
const SOCKS_BOTH = `
  <rect x="214" y="356" width="40" height="28" rx="10" fill="#F8F8F8" stroke="#BDBDBD" stroke-width="3"/>
  <rect x="278" y="356" width="40" height="28" rx="10" fill="#F8F8F8" stroke="#BDBDBD" stroke-width="3"/>
`;

/** Grey trainers on both feet (over socks). */
const SHOES_BOTH = `
  <ellipse cx="234" cy="404" rx="34" ry="18" fill="#9E9E9E" stroke="#616161" stroke-width="3"/>
  <ellipse cx="298" cy="404" rx="34" ry="18" fill="#9E9E9E" stroke="#616161" stroke-width="3"/>
  <rect x="206" y="388" width="56" height="14" rx="6" fill="#BDBDBD" stroke="#757575" stroke-width="2"/>
  <rect x="270" y="388" width="56" height="14" rx="6" fill="#BDBDBD" stroke="#757575" stroke-width="2"/>
`;

/** @type {Record<string, string>} */
const ILLUSTRATIONS = {
  "socks-on": `
    <rect x="96" y="420" width="340" height="24" rx="8" fill="#E0E0E0" stroke="#BDBDBD" stroke-width="2"/>
    ${IKRAM_UPPER}
    <ellipse cx="266" cy="340" rx="72" ry="20" fill="#FF1493" stroke="#C2185B" stroke-width="3"/>
    <rect x="214" y="356" width="40" height="28" rx="10" fill="#F8F8F8" stroke="#BDBDBD" stroke-width="3"/>
    <rect x="278" y="368" width="40" height="16" rx="8" fill="#F8F8F8" stroke="#BDBDBD" stroke-width="3" stroke-dasharray="6 4"/>
    <path d="M248 320 Q266 300 284 320" fill="none" stroke="#C68642" stroke-width="10" stroke-linecap="round"/>
    <rect x="292" y="352" width="36" height="40" rx="12" fill="#F8F8F8" stroke="#BDBDBD" stroke-width="3" transform="rotate(-18 310 372)"/>
    <ellipse cx="234" cy="396" rx="30" ry="14" fill="#EEEEEE" stroke="#BDBDBD" stroke-width="2"/>
  `,

  "shoes-on": `
    <rect x="96" y="420" width="340" height="24" rx="8" fill="#E0E0E0" stroke="#BDBDBD" stroke-width="2"/>
    ${IKRAM_UPPER}
    ${SOCKS_BOTH}
    <ellipse cx="234" cy="404" rx="34" ry="18" fill="#9E9E9E" stroke="#616161" stroke-width="3"/>
    <rect x="270" y="388" width="56" height="14" rx="6" fill="#BDBDBD" stroke="#757575" stroke-width="2"/>
    <ellipse cx="298" cy="404" rx="34" ry="18" fill="#EEEEEE" stroke="#9E9E9E" stroke-width="2" stroke-dasharray="8 5"/>
    <path d="M252 318 Q266 298 280 318" fill="none" stroke="#C68642" stroke-width="10" stroke-linecap="round"/>
    <path d="M286 376 L310 360" stroke="#616161" stroke-width="4" stroke-linecap="round"/>
  `,

  walking: `
    <rect x="0" y="440" width="531" height="48" fill="#ECEFF1" stroke="none"/>
    <line x1="40" y1="468" x2="491" y2="468" stroke="#B0BEC5" stroke-width="4" stroke-dasharray="16 12"/>
    ${IKRAM_UPPER.replace("234 296 L234 360", "222 296 L208 380").replace("298 296 L298 360", "310 296 L324 372")}
    ${SOCKS_BOTH.replace("214", "198").replace("278", "292").replace("356", "364").replace("356", "364")}
    <ellipse cx="218" cy="408" rx="34" ry="18" fill="#9E9E9E" stroke="#616161" stroke-width="3"/>
    <ellipse cx="312" cy="408" rx="34" ry="18" fill="#9E9E9E" stroke="#616161" stroke-width="3"/>
    <rect x="190" y="392" width="56" height="14" rx="6" fill="#BDBDBD" stroke="#757575" stroke-width="2"/>
    <rect x="284" y="392" width="56" height="14" rx="6" fill="#BDBDBD" stroke="#757575" stroke-width="2"/>
    <rect x="330" y="248" width="56" height="72" rx="14" fill="#7B1FA2" stroke="#4A148C" stroke-width="3"/>
    <path d="M346 248 L358 220 L374 248" fill="none" stroke="#4A148C" stroke-width="3" stroke-linecap="round"/>
  `,
};

const SLUGS = ["socks-on", "shoes-on", "walking"];

function illustrationSvg(body, height) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${NOW_W}" height="${height}" viewBox="0 0 ${NOW_W} ${height}">
  <rect width="100%" height="100%" fill="#ffffff"/>
  ${body}
</svg>`;
}

async function writeIllustration(slug, body) {
  const nowSvg = illustrationSvg(body, NOW_H);
  const focusSvg = illustrationSvg(body, FOCUS_H);

  const paths = [
    path.join(scenesDir, `${slug}.png`),
    path.join(scenesDir, `${slug}-focus.png`),
    path.join(ikramDir, `${slug}.png`),
    path.join(scenesDir, `_raw-${slug}.png`),
  ];

  for (const dest of paths) {
    const svg = dest.includes("focus") ? focusSvg : nowSvg;
    await sharp(Buffer.from(svg)).png().toFile(dest);
  }
}

async function main() {
  fs.mkdirSync(scenesDir, { recursive: true });

  for (const slug of SLUGS) {
    await writeIllustration(slug, ILLUSTRATIONS[slug]);
    console.log("ok:", slug);
  }

  console.log(`Done — footwear PECS → ${scenesDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

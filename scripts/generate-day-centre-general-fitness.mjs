/**
 * Level 1 — Generic Day Centre fitness & stretching illustrations.
 * Equipment/objects only — no people.
 * Output: public/cards/day centre/general/{slug}.png
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
const STROKE = "#212121";

/** @type {Record<string, string>} */
const ILLUSTRATIONS = {
  "therapy-ball": `
    <circle cx="266" cy="360" r="110" fill="#42A5F5" stroke="${STROKE}" stroke-width="4"/>
    <ellipse cx="230" cy="310" rx="36" ry="20" fill="#90CAF9" opacity="0.55"/>
    <ellipse cx="266" cy="470" rx="90" ry="18" fill="#1E88E5" opacity="0.2"/>
  `,
  trampoline: `
    <ellipse cx="266" cy="420" rx="140" ry="36" fill="#5D4037" stroke="${STROKE}" stroke-width="4"/>
    <ellipse cx="266" cy="400" rx="120" ry="28" fill="#B0BEC5" stroke="${STROKE}" stroke-width="3"/>
    <line x1="140" y1="400" x2="140" y2="460" stroke="${STROKE}" stroke-width="6"/>
    <line x1="392" y1="400" x2="392" y2="460" stroke="${STROKE}" stroke-width="6"/>
    <line x1="140" y1="460" x2="392" y2="460" stroke="${STROKE}" stroke-width="5"/>
    <path d="M180 400 Q266 360 352 400" fill="none" stroke="#78909C" stroke-width="2"/>
    <path d="M200 400 Q266 370 332 400" fill="none" stroke="#78909C" stroke-width="2"/>
  `,
  "step-platform": `
    <rect x="148" y="360" width="236" height="48" rx="6" fill="#E05C9A" stroke="${STROKE}" stroke-width="4"/>
    <rect x="168" y="312" width="196" height="48" rx="6" fill="#F48FB1" stroke="${STROKE}" stroke-width="4"/>
    <rect x="188" y="264" width="156" height="48" rx="6" fill="#F8BBD0" stroke="${STROKE}" stroke-width="4"/>
    <rect x="160" y="408" width="24" height="32" fill="#5D4037" stroke="${STROKE}" stroke-width="2"/>
    <rect x="348" y="408" width="24" height="32" fill="#5D4037" stroke="${STROKE}" stroke-width="2"/>
  `,
  treadmill: `
    <rect x="140" y="280" width="252" height="120" rx="16" fill="#37474F" stroke="${STROKE}" stroke-width="4"/>
    <rect x="156" y="296" width="220" height="72" rx="8" fill="#263238" stroke="${STROKE}" stroke-width="2"/>
    <line x1="168" y1="332" x2="364" y2="332" stroke="#546E7A" stroke-width="3"/>
    <rect x="300" y="240" width="72" height="52" rx="8" fill="#78909C" stroke="${STROKE}" stroke-width="3"/>
    <rect x="312" y="252" width="48" height="20" rx="4" fill="#B0BEC5" stroke="${STROKE}" stroke-width="1"/>
    <ellipse cx="200" cy="420" rx="28" ry="28" fill="#212121" stroke="${STROKE}" stroke-width="3"/>
    <ellipse cx="332" cy="420" rx="28" ry="28" fill="#212121" stroke="${STROKE}" stroke-width="3"/>
  `,
  "exercise-machine": `
    <rect x="180" y="320" width="172" height="100" rx="12" fill="#78909C" stroke="${STROKE}" stroke-width="4"/>
    <rect x="200" y="260" width="48" height="72" rx="8" fill="#546E7A" stroke="${STROKE}" stroke-width="3"/>
    <rect x="284" y="260" width="48" height="72" rx="8" fill="#546E7A" stroke="${STROKE}" stroke-width="3"/>
    <rect x="220" y="220" width="92" height="48" rx="10" fill="#B0BEC5" stroke="${STROKE}" stroke-width="3"/>
    <circle cx="224" cy="430" r="20" fill="#212121" stroke="${STROKE}" stroke-width="2"/>
    <circle cx="308" cy="430" r="20" fill="#212121" stroke="${STROKE}" stroke-width="2"/>
    <rect x="248" y="300" width="36" height="56" rx="6" fill="#455A64" stroke="${STROKE}" stroke-width="2"/>
  `,
  skis: `
    <path d="M160 420 Q200 280 240 200 L252 200 Q220 300 200 420 Z" fill="#E53935" stroke="${STROKE}" stroke-width="4"/>
    <path d="M280 420 Q320 280 360 200 L372 200 Q340 300 320 420 Z" fill="#1E88E5" stroke="${STROKE}" stroke-width="4"/>
    <rect x="236" y="196" width="8" height="48" rx="2" fill="#5D4037" stroke="${STROKE}" stroke-width="1"/>
    <rect x="356" y="196" width="8" height="48" rx="2" fill="#5D4037" stroke="${STROKE}" stroke-width="1"/>
    <ellipse cx="248" cy="408" rx="16" ry="8" fill="#FFD54F" stroke="${STROKE}" stroke-width="2"/>
    <ellipse cx="368" cy="408" rx="16" ry="8" fill="#FFD54F" stroke="${STROKE}" stroke-width="2"/>
  `,
  "exercise-bike": `
    <ellipse cx="266" cy="400" rx="100" ry="80" fill="none" stroke="#546E7A" stroke-width="8"/>
    <circle cx="266" cy="400" r="16" fill="#78909C" stroke="${STROKE}" stroke-width="2"/>
    <rect x="300" y="280" width="80" height="48" rx="10" fill="#B0BEC5" stroke="${STROKE}" stroke-width="3"/>
    <rect x="316" y="292" width="48" height="16" rx="4" fill="#ECEFF1" stroke="${STROKE}" stroke-width="1"/>
    <rect x="220" y="320" width="16" height="100" rx="6" fill="#37474F" stroke="${STROKE}" stroke-width="2"/>
    <rect x="200" y="420" width="56" height="12" rx="4" fill="#37474F" stroke="${STROKE}" stroke-width="2"/>
    <rect x="340" y="420" width="56" height="12" rx="4" fill="#37474F" stroke="${STROKE}" stroke-width="2"/>
  `,
  "exercise-mat": `
    <rect x="148" y="300" width="236" height="140" rx="12" fill="#7E57C2" stroke="${STROKE}" stroke-width="4"/>
    <rect x="168" y="320" width="196" height="100" rx="8" fill="#9575CD" stroke="${STROKE}" stroke-width="2" opacity="0.5"/>
    <rect x="148" y="300" width="20" height="140" rx="8" fill="#5E35B1" stroke="${STROKE}" stroke-width="2"/>
  `,
  "resistance-bands": `
    <path d="M180 280 Q266 360 352 280" fill="none" stroke="#E53935" stroke-width="14" stroke-linecap="round"/>
    <path d="M180 320 Q266 400 352 320" fill="none" stroke="#FDD835" stroke-width="14" stroke-linecap="round"/>
    <path d="M180 360 Q266 440 352 360" fill="none" stroke="#1E88E5" stroke-width="14" stroke-linecap="round"/>
    <rect x="168" y="268" width="24" height="104" rx="6" fill="#5D4037" stroke="${STROKE}" stroke-width="2"/>
    <rect x="340" y="268" width="24" height="104" rx="6" fill="#5D4037" stroke="${STROKE}" stroke-width="2"/>
  `,
  "foam-roller": `
    <rect x="128" y="328" width="276" height="72" rx="36" fill="#4FC3F7" stroke="${STROKE}" stroke-width="4"/>
    <ellipse cx="128" cy="364" rx="20" ry="36" fill="#29B6F6" stroke="${STROKE}" stroke-width="3"/>
    <ellipse cx="404" cy="364" rx="20" ry="36" fill="#29B6F6" stroke="${STROKE}" stroke-width="3"/>
    <rect x="180" y="348" width="172" height="12" rx="4" fill="#B3E5FC" opacity="0.6"/>
  `,
  stretching: `
    <path d="M160 360 Q220 280 280 300 Q340 320 372 260" fill="none" stroke="#43A047" stroke-width="12" stroke-linecap="round"/>
    <circle cx="160" cy="360" r="20" fill="#2E7D32" stroke="${STROKE}" stroke-width="3"/>
    <circle cx="372" cy="260" r="20" fill="#2E7D32" stroke="${STROKE}" stroke-width="3"/>
    <rect x="148" y="400" width="236" height="24" rx="8" fill="#7E57C2" stroke="${STROKE}" stroke-width="2" opacity="0.35"/>
  `,
};

const SLUGS = Object.keys(ILLUSTRATIONS);

function illustrationSvg(body) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#FFFFFF"/>
  ${body}
</svg>`;
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });

  for (const slug of SLUGS) {
    const dest = path.join(outDir, `${slug}.png`);
    await sharp(Buffer.from(illustrationSvg(ILLUSTRATIONS[slug]))).png().toFile(dest);
    console.log("ok:", path.relative(root, dest));
  }

  console.log(`Done — ${SLUGS.length} fitness illustrations → ${outDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

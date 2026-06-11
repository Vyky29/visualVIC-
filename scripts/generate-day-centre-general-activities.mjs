/**
 * Level 1 — Generic Day Centre activity & material illustrations.
 * Object-only (no people), white background.
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
  apron: `
    <path d="M196 180 Q266 140 336 180 L356 420 Q266 460 176 420 Z" fill="#E05C9A" stroke="${STROKE}" stroke-width="4"/>
    <path d="M226 180 L226 260 M306 180 L306 260" stroke="${STROKE}" stroke-width="4"/>
    <rect x="236" y="300" width="60" height="80" rx="8" fill="#FFFFFF" stroke="${STROKE}" stroke-width="3" opacity="0.35"/>
  `,
  "mixing-bowl": `
    <ellipse cx="266" cy="400" rx="120" ry="28" fill="#E0E0E0" stroke="${STROKE}" stroke-width="4"/>
    <path d="M146 400 Q146 260 266 240 Q386 260 386 400 Z" fill="#B3E5FC" stroke="${STROKE}" stroke-width="4"/>
    <ellipse cx="266" cy="268" rx="72" ry="18" fill="#81D4FA" stroke="${STROKE}" stroke-width="2"/>
  `,
  "wooden-spoon": `
    <ellipse cx="266" cy="260" rx="72" ry="88" fill="#D7A86E" stroke="${STROKE}" stroke-width="4"/>
    <rect x="252" y="340" width="28" height="200" rx="12" fill="#C98B4A" stroke="${STROKE}" stroke-width="3"/>
  `,
  "rolling-pin": `
    <rect x="118" y="308" width="296" height="48" rx="24" fill="#D7A86E" stroke="${STROKE}" stroke-width="4"/>
    <rect x="88" y="318" width="36" height="28" rx="10" fill="#C98B4A" stroke="${STROKE}" stroke-width="3"/>
    <rect x="408" y="318" width="36" height="28" rx="10" fill="#C98B4A" stroke="${STROKE}" stroke-width="3"/>
  `,
  "cheese-grater": `
    <rect x="210" y="220" width="112" height="220" rx="16" fill="#B0BEC5" stroke="${STROKE}" stroke-width="4"/>
    <rect x="228" y="248" width="76" height="12" rx="2" fill="#78909C"/>
    <rect x="228" y="276" width="76" height="12" rx="2" fill="#78909C"/>
    <rect x="228" y="304" width="76" height="12" rx="2" fill="#78909C"/>
    <rect x="228" y="332" width="76" height="12" rx="2" fill="#78909C"/>
    <path d="M236 400 L296 400 L266 430 Z" fill="#FFD54F" stroke="${STROKE}" stroke-width="2"/>
  `,
  "vegetable-peeler": `
    <path d="M180 360 Q220 280 280 240 L320 220" fill="none" stroke="#B0BEC5" stroke-width="14" stroke-linecap="round"/>
    <rect x="300" y="200" width="120" height="48" rx="14" fill="#4CAF50" stroke="${STROKE}" stroke-width="3"/>
    <ellipse cx="200" cy="400" rx="56" ry="72" fill="#FF8F00" stroke="${STROKE}" stroke-width="4"/>
    <path d="M176 360 Q200 320 224 360" fill="#C76B00" stroke="${STROKE}" stroke-width="2"/>
  `,
  "chopping-board": `
    <rect x="128" y="280" width="276" height="180" rx="28" fill="#D7A86E" stroke="${STROKE}" stroke-width="4"/>
    <ellipse cx="220" cy="360" rx="28" ry="20" fill="#C62828" stroke="${STROKE}" stroke-width="2"/>
    <path d="M300 330 L340 390 L280 400 Z" fill="#4CAF50" stroke="${STROKE}" stroke-width="2"/>
  `,
  "tomato-sauce": `
    <rect x="220" y="300" width="92" height="140" rx="16" fill="#C62828" stroke="${STROKE}" stroke-width="4"/>
    <rect x="232" y="260" width="68" height="52" rx="12" fill="#E53935" stroke="${STROKE}" stroke-width="3"/>
    <ellipse cx="266" cy="360" rx="28" ry="36" fill="#FFCDD2" opacity="0.5"/>
    <rect x="248" y="248" width="36" height="20" rx="4" fill="#FFD54F" stroke="${STROKE}" stroke-width="2"/>
  `,
  paintbrush: `
    <rect x="248" y="160" width="36" height="200" rx="8" fill="#8D6E63" stroke="${STROKE}" stroke-width="3"/>
    <path d="M220 360 Q266 320 312 360 L296 420 Q266 440 236 420 Z" fill="#42A5F5" stroke="${STROKE}" stroke-width="3"/>
    <ellipse cx="266" cy="368" rx="40" ry="16" fill="#1E88E5" stroke="${STROKE}" stroke-width="2"/>
  `,
  "paint-palette": `
    <ellipse cx="266" cy="360" rx="130" ry="100" fill="#F5F5F5" stroke="${STROKE}" stroke-width="4"/>
    <circle cx="210" cy="330" r="22" fill="#E53935" stroke="${STROKE}" stroke-width="2"/>
    <circle cx="266" cy="300" r="22" fill="#FDD835" stroke="${STROKE}" stroke-width="2"/>
    <circle cx="322" cy="330" r="22" fill="#1E88E5" stroke="${STROKE}" stroke-width="2"/>
    <circle cx="240" cy="390" r="22" fill="#43A047" stroke="${STROKE}" stroke-width="2"/>
    <circle cx="292" cy="390" r="22" fill="#8E24AA" stroke="${STROKE}" stroke-width="2"/>
    <ellipse cx="330" cy="380" rx="28" ry="22" fill="#FFFFFF" stroke="${STROKE}" stroke-width="3"/>
  `,
  scissors: `
    <circle cx="200" cy="300" r="36" fill="#B0BEC5" stroke="${STROKE}" stroke-width="3"/>
    <circle cx="332" cy="300" r="36" fill="#B0BEC5" stroke="${STROKE}" stroke-width="3"/>
    <path d="M236 300 L296 420 M332 300 L272 420" stroke="#78909C" stroke-width="10" stroke-linecap="round"/>
    <circle cx="200" cy="300" r="14" fill="#ECEFF1" stroke="${STROKE}" stroke-width="2"/>
    <circle cx="332" cy="300" r="14" fill="#ECEFF1" stroke="${STROKE}" stroke-width="2"/>
  `,
  "glue-stick": `
    <rect x="228" y="260" width="76" height="180" rx="20" fill="#FFCA28" stroke="${STROKE}" stroke-width="4"/>
    <rect x="240" y="220" width="52" height="52" rx="10" fill="#FFFFFF" stroke="${STROKE}" stroke-width="3"/>
    <rect x="248" y="400" width="36" height="48" rx="8" fill="#F57F17" stroke="${STROKE}" stroke-width="2"/>
  `,
  "coloured-paper": `
    <rect x="160" y="280" width="100" height="140" rx="6" fill="#E53935" stroke="${STROKE}" stroke-width="3" transform="rotate(-8 210 350)"/>
    <rect x="200" y="270" width="100" height="140" rx="6" fill="#FDD835" stroke="${STROKE}" stroke-width="3" transform="rotate(4 250 340)"/>
    <rect x="240" y="280" width="100" height="140" rx="6" fill="#1E88E5" stroke="${STROKE}" stroke-width="3" transform="rotate(10 290 350)"/>
    <rect x="280" y="290" width="100" height="140" rx="6" fill="#43A047" stroke="${STROKE}" stroke-width="3" transform="rotate(-4 330 360)"/>
  `,
  "jigsaw-puzzle": `
    <rect x="148" y="240" width="110" height="110" rx="8" fill="#42A5F5" stroke="${STROKE}" stroke-width="4"/>
    <circle cx="203" cy="240" r="18" fill="#42A5F5" stroke="${STROKE}" stroke-width="3"/>
    <rect x="274" y="240" width="110" height="110" rx="8" fill="#FDD835" stroke="${STROKE}" stroke-width="4"/>
    <circle cx="329" cy="350" r="18" fill="#FDD835" stroke="${STROKE}" stroke-width="3"/>
    <rect x="148" y="366" width="110" height="110" rx="8" fill="#E53935" stroke="${STROKE}" stroke-width="4"/>
    <circle cx="258" cy="421" r="18" fill="#E53935" stroke="${STROKE}" stroke-width="3"/>
    <rect x="274" y="366" width="110" height="110" rx="8" fill="#43A047" stroke="${STROKE}" stroke-width="4"/>
  `,
  "sorting-trays": `
    <rect x="120" y="320" width="96" height="72" rx="10" fill="#FFCDD2" stroke="${STROKE}" stroke-width="3"/>
    <circle cx="168" cy="356" r="18" fill="#E53935" stroke="${STROKE}" stroke-width="2"/>
    <rect x="218" y="320" width="96" height="72" rx="10" fill="#BBDEFB" stroke="${STROKE}" stroke-width="3"/>
    <rect x="252" y="342" width="28" height="28" fill="#1E88E5" stroke="${STROKE}" stroke-width="2"/>
    <rect x="316" y="320" width="96" height="72" rx="10" fill="#C8E6C9" stroke="${STROKE}" stroke-width="3"/>
    <polygon points="364,342 378,370 350,370" fill="#43A047" stroke="${STROKE}" stroke-width="2"/>
  `,
  "matching-cards": `
    <rect x="140" y="280" width="120" height="160" rx="12" fill="#FFFFFF" stroke="${STROKE}" stroke-width="4"/>
    <circle cx="200" cy="360" r="40" fill="#FF8F00" stroke="${STROKE}" stroke-width="3"/>
    <rect x="272" y="280" width="120" height="160" rx="12" fill="#FFFFFF" stroke="${STROKE}" stroke-width="4"/>
    <circle cx="332" cy="360" r="40" fill="#FF8F00" stroke="${STROKE}" stroke-width="3"/>
    <path d="M260 360 L272 360" stroke="#4CAF50" stroke-width="6" stroke-linecap="round"/>
  `,
  "play-dough": `
    <ellipse cx="220" cy="400" rx="72" ry="48" fill="#E05C9A" stroke="${STROKE}" stroke-width="4"/>
    <ellipse cx="310" cy="380" rx="56" ry="40" fill="#FDD835" stroke="${STROKE}" stroke-width="3"/>
    <ellipse cx="280" cy="320" rx="40" ry="32" fill="#42A5F5" stroke="${STROKE}" stroke-width="3"/>
  `,
  pizza: `
    <circle cx="266" cy="360" r="120" fill="#FDD835" stroke="${STROKE}" stroke-width="4"/>
    <circle cx="266" cy="360" r="100" fill="#FF8F00" stroke="${STROKE}" stroke-width="2"/>
    <circle cx="220" cy="330" r="16" fill="#C62828" stroke="${STROKE}" stroke-width="2"/>
    <circle cx="300" cy="320" r="16" fill="#C62828" stroke="${STROKE}" stroke-width="2"/>
    <circle cx="266" cy="390" r="16" fill="#C62828" stroke="${STROKE}" stroke-width="2"/>
    <circle cx="240" cy="380" r="14" fill="#C62828" stroke="${STROKE}" stroke-width="2"/>
    <circle cx="310" cy="370" r="14" fill="#C62828" stroke="${STROKE}" stroke-width="2"/>
    <path d="M266 260 L276 300 L256 300 Z" fill="#FDD835" stroke="${STROKE}" stroke-width="2"/>
  `,
  cooking: `
    <ellipse cx="266" cy="420" rx="100" ry="24" fill="#9E9E9E" stroke="${STROKE}" stroke-width="3"/>
    <path d="M166 420 Q166 300 266 280 Q366 300 366 420 Z" fill="#B0BEC5" stroke="${STROKE}" stroke-width="4"/>
    <ellipse cx="266" cy="320" rx="60" ry="16" fill="#FF8F00" stroke="${STROKE}" stroke-width="2"/>
    <rect x="248" y="200" width="36" height="100" rx="8" fill="#8D6E63" stroke="${STROKE}" stroke-width="3"/>
    <ellipse cx="266" cy="196" rx="28" ry="20" fill="#D7A86E" stroke="${STROKE}" stroke-width="2"/>
  `,
  painting: `
    <ellipse cx="200" cy="380" rx="80" ry="60" fill="#F5F5F5" stroke="${STROKE}" stroke-width="3"/>
    <circle cx="180" cy="360" r="16" fill="#E53935" stroke="${STROKE}" stroke-width="2"/>
    <circle cx="220" cy="350" r="16" fill="#1E88E5" stroke="${STROKE}" stroke-width="2"/>
    <rect x="280" y="240" width="28" height="160" rx="6" fill="#8D6E63" stroke="${STROKE}" stroke-width="3"/>
    <path d="M260 400 Q300 360 340 400 L320 440 Q290 456 264 440 Z" fill="#AB47BC" stroke="${STROKE}" stroke-width="2"/>
  `,
  peeling: `
    <ellipse cx="200" cy="390" rx="64" ry="80" fill="#FF8F00" stroke="${STROKE}" stroke-width="4"/>
    <path d="M168 350 Q200 300 232 350" fill="#C76B00" stroke="${STROKE}" stroke-width="2"/>
    <path d="M300 280 Q340 240 380 260" fill="none" stroke="#B0BEC5" stroke-width="12" stroke-linecap="round"/>
    <rect x="360" y="248" width="80" height="40" rx="12" fill="#4CAF50" stroke="${STROKE}" stroke-width="3"/>
    <path d="M200 310 Q220 280 200 250" fill="none" stroke="#FFE0B2" stroke-width="8" stroke-linecap="round"/>
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

  console.log(`Done — ${SLUGS.length} activity/material illustrations → ${outDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

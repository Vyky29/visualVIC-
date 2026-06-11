/**
 * Level 1 — Generic Day Centre schedule illustrations.
 * Object-only, white background, no text/borders/people.
 * Output: public/cards/day centre/general/{slug}.png
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { LONDON_BUS_BODY } from "./pixtolearn-london-bus.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const W = 531;
const H = 648;
const outDir = path.join(root, "public", "cards", "day centre", "general");

const STROKE = "#212121";

/** @type {Record<string, string>} */
const ILLUSTRATIONS = {
  music: `
    <!-- tambourine -->
    <circle cx="178" cy="340" r="80" fill="#E53935" stroke="${STROKE}" stroke-width="4"/>
    <circle cx="178" cy="340" r="58" fill="none" stroke="#FFCDD2" stroke-width="3"/>
    <circle cx="140" cy="306" r="9" fill="#FFEB3B" stroke="${STROKE}" stroke-width="2"/>
    <circle cx="216" cy="306" r="9" fill="#FFEB3B" stroke="${STROKE}" stroke-width="2"/>
    <circle cx="140" cy="374" r="9" fill="#FFEB3B" stroke="${STROKE}" stroke-width="2"/>
    <circle cx="216" cy="374" r="9" fill="#FFEB3B" stroke="${STROKE}" stroke-width="2"/>
    <!-- maraca 1 -->
    <ellipse cx="292" cy="318" rx="40" ry="48" fill="#F5C84D" stroke="${STROKE}" stroke-width="4"/>
    <rect x="280" y="362" width="24" height="98" rx="10" fill="#4FAF6B" stroke="${STROKE}" stroke-width="3"/>
    <!-- maraca 2 -->
    <ellipse cx="396" cy="400" rx="26" ry="22" fill="#7E57C2" stroke="${STROKE}" stroke-width="3"/>
    <rect x="412" y="266" width="12" height="138" rx="5" fill="#7E57C2" stroke="${STROKE}" stroke-width="2"/>
    <!-- maraca 3 -->
    <ellipse cx="456" cy="358" rx="22" ry="18" fill="#E05C9A" stroke="${STROKE}" stroke-width="3"/>
    <rect x="468" y="246" width="10" height="116" rx="4" fill="#E05C9A" stroke="${STROKE}" stroke-width="2"/>
  `,

  cafe: `
    <!-- saucer -->
    <ellipse cx="196" cy="412" rx="60" ry="15" fill="#F0F0F0" stroke="${STROKE}" stroke-width="3"/>
    <!-- cup -->
    <path d="M154 362h84c0 46-18 68-42 68s-42-22-42-68z" fill="#FFFFFF" stroke="${STROKE}" stroke-width="4"/>
    <ellipse cx="196" cy="362" rx="42" ry="10" fill="#FFFFFF" stroke="${STROKE}" stroke-width="3"/>
    <path d="M238 378h34a14 14 0 0 1 0 28h-34" fill="none" stroke="${STROKE}" stroke-width="4"/>
    <ellipse cx="196" cy="370" rx="30" ry="8" fill="#6D4C41" opacity="0.35"/>
    <!-- pastry plate -->
    <ellipse cx="352" cy="416" rx="90" ry="22" fill="#F5F5F5" stroke="${STROKE}" stroke-width="3"/>
    <path d="M320 360c28 0 44 18 44 34s-16 34-44 34-44-16-44-34 16-34 44-34z"
      fill="#F5C84D" stroke="${STROKE}" stroke-width="3"/>
    <path d="M306 346c8-12 22-12 30 0" fill="none" stroke="${STROKE}" stroke-width="3" stroke-linecap="round"/>
    <path d="M338 372c6 4 12 4 18 0" fill="none" stroke="#E6A800" stroke-width="2" stroke-linecap="round"/>
  `,

  bus: LONDON_BUS_BODY,

  westfield: `
    <!-- shopping bags (object focus — not a building scene) -->
    <path d="M148 280 L148 420 Q148 448 176 448 L248 448 Q276 448 276 420 L276 280 Z"
      fill="#E05C9A" stroke="${STROKE}" stroke-width="4"/>
    <path d="M176 280 Q212 248 248 280" fill="none" stroke="${STROKE}" stroke-width="4"/>
    <rect x="188" y="320" width="48" height="56" rx="6" fill="#FFFFFF" stroke="${STROKE}" stroke-width="2" opacity="0.5"/>
    <path d="M296 268 L296 432 Q296 460 324 460 L404 460 Q432 460 432 432 L432 268 Z"
      fill="#F48FB1" stroke="${STROKE}" stroke-width="4"/>
    <path d="M324 268 Q368 232 404 268" fill="none" stroke="${STROKE}" stroke-width="4"/>
    <rect x="336" y="312" width="56" height="64" rx="6" fill="#FFFFFF" stroke="${STROKE}" stroke-width="2" opacity="0.45"/>
    <!-- shopping symbol -->
    <circle cx="266" cy="196" r="52" fill="#FFFFFF" stroke="${STROKE}" stroke-width="4"/>
    <path d="M236 196h60 M266 166v60" stroke="#E05C9A" stroke-width="10" stroke-linecap="round"/>
    <circle cx="266" cy="196" r="18" fill="none" stroke="#E05C9A" stroke-width="6"/>
  `,

  "black-nail-varnish": `
    <rect x="218" y="290" width="96" height="152" rx="20" fill="#1A1A1A" stroke="${STROKE}" stroke-width="4"/>
    <rect x="232" y="246" width="68" height="58" rx="14" fill="#E05C9A" stroke="${STROKE}" stroke-width="3"/>
    <path d="M266 200 L266 150" stroke="#8B5E3C" stroke-width="8" stroke-linecap="round"/>
    <ellipse cx="266" cy="142" rx="18" ry="14" fill="#1A1A1A" stroke="${STROKE}" stroke-width="2"/>
    <path d="M248 138 Q266 114 284 138" fill="none" stroke="${STROKE}" stroke-width="6" stroke-linecap="round"/>
    <rect x="234" y="310" width="64" height="108" rx="10" fill="#2A2A2A" stroke="none" opacity="0.4"/>
    <ellipse cx="266" cy="368" rx="28" ry="8" fill="#FFFFFF" opacity="0.12"/>
  `,

  mcdonalds: `
    <!-- fries box -->
    <path d="M340 232 L388 232 L402 428 L326 428 Z" fill="#E53935" stroke="${STROKE}" stroke-width="4"/>
    <path d="M336 232 Q362 204 388 232" fill="none" stroke="${STROKE}" stroke-width="4"/>
    <rect x="128" y="312" width="88" height="108" rx="12" fill="#E53935" stroke="${STROKE}" stroke-width="3"/>
    <rect x="144" y="252" width="12" height="66" rx="3" fill="#F5C84D" stroke="${STROKE}" stroke-width="2"/>
    <rect x="162" y="240" width="12" height="78" rx="3" fill="#F5C84D" stroke="${STROKE}" stroke-width="2"/>
    <rect x="180" y="246" width="12" height="72" rx="3" fill="#F5C84D" stroke="${STROKE}" stroke-width="2"/>
    <rect x="198" y="254" width="12" height="64" rx="3" fill="#F5C84D" stroke="${STROKE}" stroke-width="2"/>
    <!-- burger -->
    <ellipse cx="268" cy="400" rx="82" ry="20" fill="#F5DEB3" stroke="${STROKE}" stroke-width="3"/>
    <rect x="188" y="364" width="160" height="24" rx="8" fill="#8B5E3C" stroke="${STROKE}" stroke-width="2"/>
    <rect x="188" y="336" width="160" height="20" rx="6" fill="#4FAF6B" stroke="${STROKE}" stroke-width="2"/>
    <ellipse cx="268" cy="322" rx="80" ry="22" fill="#F5DEB3" stroke="${STROKE}" stroke-width="3"/>
    <ellipse cx="268" cy="304" rx="74" ry="18" fill="#F5DEB3" stroke="${STROKE}" stroke-width="3"/>
    <ellipse cx="268" cy="292" rx="68" ry="14" fill="#E6A800" stroke="${STROKE}" stroke-width="2"/>
  `,

  "bean-bag": `
    <path d="M96 420 Q96 268 266 250 Q436 268 436 420 Q436 472 266 482 Q96 472 96 420 Z"
      fill="#64B5F6" stroke="${STROKE}" stroke-width="4"/>
    <path d="M132 392 Q266 318 400 392 Q400 438 266 446 Q132 438 132 392 Z"
      fill="#90CAF9" stroke="none"/>
    <ellipse cx="266" cy="348" rx="110" ry="54" fill="#BBDEFB" stroke="none" opacity="0.6"/>
    <path d="M168 368 Q266 328 364 368" fill="none" stroke="#1976D2" stroke-width="3" stroke-linecap="round" opacity="0.35"/>
    <path d="M148 400 Q266 370 384 400" fill="none" stroke="#1976D2" stroke-width="2" stroke-linecap="round" opacity="0.25"/>
  `,

  cab: `
    <path d="M88 388 L88 328 Q88 296 122 282 L172 270 L328 270 L378 288 Q408 300 408 328 L408 388 Z"
      fill="#1A1A1A" stroke="${STROKE}" stroke-width="4"/>
    <path d="M88 328 L122 282 L172 270 L172 328 Z" fill="#111" stroke="${STROKE}" stroke-width="2"/>
    <rect x="388" y="312" width="32" height="64" rx="6" fill="#1A1A1A" stroke="${STROKE}" stroke-width="2"/>
    <rect x="172" y="248" width="164" height="32" rx="12" fill="#1A1A1A" stroke="${STROKE}" stroke-width="3"/>
    <rect x="128" y="296" width="76" height="52" rx="8" fill="#FFF8E1" stroke="${STROKE}" stroke-width="3"/>
    <rect x="216" y="296" width="76" height="52" rx="8" fill="#FFF8E1" stroke="${STROKE}" stroke-width="3"/>
    <rect x="304" y="296" width="76" height="52" rx="8" fill="#FFF8E1" stroke="${STROKE}" stroke-width="3"/>
    <circle cx="152" cy="404" r="28" fill="#212121" stroke="${STROKE}" stroke-width="3"/>
    <circle cx="152" cy="404" r="11" fill="#BDBDBD"/>
    <circle cx="368" cy="404" r="28" fill="#212121" stroke="${STROKE}" stroke-width="3"/>
    <circle cx="368" cy="404" r="11" fill="#BDBDBD"/>
    <rect x="192" y="256" width="24" height="16" rx="3" fill="#FDD835" stroke="${STROKE}" stroke-width="1"/>
    <rect x="224" y="256" width="24" height="16" rx="3" fill="#FDD835" stroke="${STROKE}" stroke-width="1"/>
    <rect x="256" y="256" width="24" height="16" rx="3" fill="#FDD835" stroke="${STROKE}" stroke-width="1"/>
    <rect x="288" y="256" width="24" height="16" rx="3" fill="#FDD835" stroke="${STROKE}" stroke-width="1"/>
    <rect x="248" y="272" width="36" height="8" rx="2" fill="#FDD835" stroke="${STROKE}" stroke-width="1"/>
  `,

  home: `
    <path d="M108 400 L266 208 L424 400 Z" fill="#E05C9A" stroke="${STROKE}" stroke-width="4"/>
    <rect x="156" y="348" width="220" height="120" rx="8" fill="#FFFFFF" stroke="${STROKE}" stroke-width="4"/>
    <rect x="214" y="392" width="56" height="76" rx="6" fill="#8B5E3C" stroke="${STROKE}" stroke-width="3"/>
    <circle cx="256" cy="432" r="5" fill="#F5C84D" stroke="${STROKE}" stroke-width="1"/>
    <rect x="300" y="372" width="40" height="40" rx="6" fill="#B8E3F4" stroke="${STROKE}" stroke-width="3"/>
    <line x1="320" y1="372" x2="320" y2="412" stroke="${STROKE}" stroke-width="2"/>
    <line x1="300" y1="392" x2="340" y2="392" stroke="${STROKE}" stroke-width="2"/>
    <rect x="168" y="372" width="32" height="32" rx="6" fill="#B8E3F4" stroke="${STROKE}" stroke-width="3"/>
    <line x1="184" y1="372" x2="184" y2="404" stroke="${STROKE}" stroke-width="2"/>
    <line x1="168" y1="388" x2="200" y2="388" stroke="${STROKE}" stroke-width="2"/>
    <rect x="248" y="248" width="36" height="28" rx="4" fill="#B71C1C" stroke="${STROKE}" stroke-width="2"/>
  `,

  finished: `
    <rect x="108" y="248" width="10" height="168" rx="4" fill="#757575" stroke="${STROKE}" stroke-width="2"/>
    <rect x="118" y="256" width="64" height="32" fill="#212121"/>
    <rect x="182" y="256" width="64" height="32" fill="#FFFFFF" stroke="#BDBDBD" stroke-width="1"/>
    <rect x="118" y="288" width="64" height="32" fill="#FFFFFF" stroke="#BDBDBD" stroke-width="1"/>
    <rect x="182" y="288" width="64" height="32" fill="#212121"/>
    <circle cx="368" cy="340" r="98" fill="#4CAF50" stroke="${STROKE}" stroke-width="5"/>
    <path d="M310 340 L352 380 L424 292" fill="none" stroke="#FFFFFF" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
  `,
};

const SLUGS = [
  "music",
  "cafe",
  "bus",
  "westfield",
  "black-nail-varnish",
  "mcdonalds",
  "bean-bag",
  "cab",
  "home",
  "finished",
];

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
    const body = ILLUSTRATIONS[slug];
    if (!body) {
      console.warn("skip — no art:", slug);
      continue;
    }
    const dest = path.join(outDir, `${slug}.png`);
    await sharp(Buffer.from(illustrationSvg(body))).png().toFile(dest);
    console.log("ok:", path.relative(root, dest));
  }

  console.log(`Done — ${SLUGS.length} Level 1 illustrations → ${outDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

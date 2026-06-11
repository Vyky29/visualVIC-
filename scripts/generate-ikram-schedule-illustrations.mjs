/**
 * PixtoLearn schedule illustrations — Ikram Saturday routine.
 * Transparent PNG, object-only, centred, no text/borders/shadows.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { LONDON_BUS_BODY } from "./pixtolearn-london-bus.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const NOW_W = 531;
const NOW_H = 648;
const FOCUS_H = 663;

const ikramDir = path.join(root, "public", "cards", "day centre", "ikram");
const scenesDir = path.join(ikramDir, "scenes");

/** @type {Record<string, string>} */
const ILLUSTRATIONS = {
  music: `
    <circle cx="178" cy="340" r="78" fill="#E53935" stroke="#B71C1C" stroke-width="4"/>
    <circle cx="178" cy="340" r="56" fill="none" stroke="#FFCDD2" stroke-width="3"/>
    <circle cx="142" cy="308" r="8" fill="#FFEB3B" stroke="#E6A800" stroke-width="2"/>
    <circle cx="214" cy="308" r="8" fill="#FFEB3B" stroke="#E6A800" stroke-width="2"/>
    <circle cx="142" cy="372" r="8" fill="#FFEB3B" stroke="#E6A800" stroke-width="2"/>
    <circle cx="214" cy="372" r="8" fill="#FFEB3B" stroke="#E6A800" stroke-width="2"/>
    <ellipse cx="288" cy="318" rx="38" ry="46" fill="#F5C84D" stroke="#E6A800" stroke-width="4"/>
    <rect x="276" y="360" width="24" height="96" rx="10" fill="#4FAF6B" stroke="#2E7D32" stroke-width="3"/>
    <ellipse cx="388" cy="400" rx="24" ry="20" fill="#7E57C2" stroke="#5E35B1" stroke-width="3"/>
    <rect x="404" y="268" width="12" height="136" rx="5" fill="#7E57C2" stroke="#5E35B1" stroke-width="2"/>
    <ellipse cx="448" cy="356" rx="20" ry="16" fill="#E05C9A" stroke="#C2185B" stroke-width="3"/>
    <rect x="460" y="248" width="10" height="112" rx="4" fill="#E05C9A" stroke="#C2185B" stroke-width="2"/>
  `,

  cafe: `
    <ellipse cx="196" cy="408" rx="58" ry="14" fill="#F0F0F0" stroke="#BDBDBD" stroke-width="3"/>
    <path d="M156 360h80c0 44-16 66-40 66s-40-22-40-66z" fill="#FFFFFF" stroke="#8B5E3C" stroke-width="4"/>
    <ellipse cx="196" cy="360" rx="40" ry="9" fill="#FFFFFF" stroke="#8B5E3C" stroke-width="3"/>
    <path d="M236 376h32a14 14 0 0 1 0 28h-32" fill="none" stroke="#8B5E3C" stroke-width="4"/>
    <ellipse cx="196" cy="368" rx="28" ry="7" fill="#6D4C41" opacity="0.3"/>
    <ellipse cx="348" cy="412" rx="88" ry="22" fill="#F5F5F5" stroke="#BDBDBD" stroke-width="3"/>
    <path d="M318 360c26 0 40 16 40 32s-16 32-40 32-40-16-40-32 14-32 40-32z" fill="#F5C84D" stroke="#E6A800" stroke-width="3"/>
    <path d="M304 348c8-10 20-10 28 0" fill="none" stroke="#E6A800" stroke-width="3" stroke-linecap="round"/>
  `,

  bus: LONDON_BUS_BODY,

  westfield: `
    <path d="M120 248 L266 200 L412 248 L412 420 L120 420 Z" fill="#F5F5F5" stroke="#9E9E9E" stroke-width="4"/>
    <rect x="148" y="280" width="236" height="120" rx="6" fill="#E3F2FD" stroke="#64B5F6" stroke-width="3"/>
    <rect x="168" y="300" width="44" height="76" rx="4" fill="#FFFFFF" stroke="#90CAF9" stroke-width="2"/>
    <rect x="224" y="300" width="44" height="76" rx="4" fill="#FFFFFF" stroke="#90CAF9" stroke-width="2"/>
    <rect x="280" y="300" width="44" height="76" rx="4" fill="#FFFFFF" stroke="#90CAF9" stroke-width="2"/>
    <rect x="336" y="300" width="32" height="76" rx="4" fill="#FFFFFF" stroke="#90CAF9" stroke-width="2"/>
    <rect x="196" y="368" width="140" height="52" rx="6" fill="#E05C9A" stroke="#C2185B" stroke-width="3"/>
    <rect x="224" y="384" width="84" height="36" rx="4" fill="#FFFFFF" stroke="#F48FB1" stroke-width="2"/>
    <rect x="248" y="176" width="36" height="36" rx="4" fill="#E05C9A" stroke="#C2185B" stroke-width="2"/>
  `,

  "black-nail-varnish": `
    <rect x="220" y="288" width="92" height="148" rx="18" fill="#1A1A1A" stroke="#000" stroke-width="4"/>
    <rect x="234" y="244" width="64" height="56" rx="12" fill="#E05C9A" stroke="#C2185B" stroke-width="3"/>
    <path d="M266 200 L266 152" stroke="#8B5E3C" stroke-width="7" stroke-linecap="round"/>
    <ellipse cx="266" cy="144" rx="16" ry="12" fill="#1A1A1A" stroke="#000" stroke-width="2"/>
    <path d="M250 140 Q266 118 282 140" fill="none" stroke="#1A1A1A" stroke-width="6" stroke-linecap="round"/>
  `,

  mcdonalds: `
    <path d="M340 232 L388 232 L402 428 L326 428 Z" fill="#E53935" stroke="#B71C1C" stroke-width="4"/>
    <path d="M336 232 Q362 204 388 232" fill="none" stroke="#B71C1C" stroke-width="4"/>
    <rect x="128" y="312" width="88" height="108" rx="12" fill="#E53935" stroke="#B71C1C" stroke-width="3"/>
    <rect x="144" y="252" width="12" height="66" rx="3" fill="#F5C84D" stroke="#E6A800" stroke-width="2"/>
    <rect x="162" y="240" width="12" height="78" rx="3" fill="#F5C84D" stroke="#E6A800" stroke-width="2"/>
    <rect x="180" y="246" width="12" height="72" rx="3" fill="#F5C84D" stroke="#E6A800" stroke-width="2"/>
    <rect x="198" y="254" width="12" height="64" rx="3" fill="#F5C84D" stroke="#E6A800" stroke-width="2"/>
    <ellipse cx="268" cy="400" rx="80" ry="20" fill="#F5DEB3" stroke="#C9A86C" stroke-width="3"/>
    <rect x="188" y="364" width="160" height="24" rx="8" fill="#8B5E3C" stroke="#5D4037" stroke-width="2"/>
    <rect x="188" y="336" width="160" height="20" rx="6" fill="#4FAF6B" stroke="#2E7D32" stroke-width="2"/>
    <ellipse cx="268" cy="322" rx="80" ry="22" fill="#F5DEB3" stroke="#C9A86C" stroke-width="3"/>
    <ellipse cx="268" cy="304" rx="74" ry="18" fill="#F5DEB3" stroke="#C9A86C" stroke-width="3"/>
  `,

  "bean-bag": `
    <path d="M96 420 Q96 268 266 250 Q436 268 436 420 Q436 472 266 482 Q96 472 96 420 Z"
      fill="#64B5F6" stroke="#1976D2" stroke-width="4"/>
    <path d="M132 392 Q266 318 400 392 Q400 438 266 446 Q132 438 132 392 Z"
      fill="#90CAF9" stroke="none"/>
    <ellipse cx="266" cy="348" rx="108" ry="52" fill="#BBDEFB" stroke="none" opacity="0.55"/>
    <path d="M168 368 Q266 328 364 368" fill="none" stroke="#1976D2" stroke-width="3" stroke-linecap="round" opacity="0.3"/>
  `,

  cab: `
    <path d="M88 388 L88 328 Q88 296 122 282 L172 270 L328 270 L378 288 Q408 300 408 328 L408 388 Z"
      fill="#1A1A1A" stroke="#000" stroke-width="4"/>
    <path d="M88 328 L122 282 L172 270 L172 328 Z" fill="#111" stroke="#000" stroke-width="2"/>
    <rect x="388" y="312" width="32" height="64" rx="6" fill="#1A1A1A" stroke="#000" stroke-width="2"/>
    <rect x="172" y="248" width="164" height="32" rx="12" fill="#1A1A1A" stroke="#000" stroke-width="3"/>
    <rect x="128" y="296" width="76" height="52" rx="8" fill="#FFF8E1" stroke="#F9A825" stroke-width="3"/>
    <rect x="216" y="296" width="76" height="52" rx="8" fill="#FFF8E1" stroke="#F9A825" stroke-width="3"/>
    <rect x="304" y="296" width="76" height="52" rx="8" fill="#FFF8E1" stroke="#F9A825" stroke-width="3"/>
    <circle cx="152" cy="404" r="26" fill="#212121" stroke="#000" stroke-width="3"/>
    <circle cx="152" cy="404" r="10" fill="#BDBDBD"/>
    <circle cx="368" cy="404" r="26" fill="#212121" stroke="#000" stroke-width="3"/>
    <circle cx="368" cy="404" r="10" fill="#BDBDBD"/>
    <rect x="192" y="256" width="24" height="16" rx="3" fill="#FDD835"/>
    <rect x="224" y="256" width="24" height="16" rx="3" fill="#FDD835"/>
    <rect x="256" y="256" width="24" height="16" rx="3" fill="#FDD835"/>
    <rect x="288" y="256" width="24" height="16" rx="3" fill="#FDD835"/>
  `,

  finished: `
    <rect x="108" y="248" width="10" height="168" rx="4" fill="#757575" stroke="#424242" stroke-width="2"/>
    <rect x="118" y="256" width="64" height="32" fill="#212121"/>
    <rect x="182" y="256" width="64" height="32" fill="#FFFFFF" stroke="#BDBDBD" stroke-width="1"/>
    <rect x="118" y="288" width="64" height="32" fill="#FFFFFF" stroke="#BDBDBD" stroke-width="1"/>
    <rect x="182" y="288" width="64" height="32" fill="#212121"/>
    <circle cx="368" cy="340" r="96" fill="#4CAF50" stroke="#2E7D32" stroke-width="5"/>
    <path d="M312 340 L352 380 L424 292" fill="none" stroke="#FFFFFF" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
  `,
};

const SLUGS = [
  "music",
  "cafe",
  "bus",
  "westfield",
  "black-nail-varnish",
  "mcdonalds",
  "bus-return",
  "bean-bag",
  "cab",
  "finished",
];

function illustrationSvg(body, height) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${NOW_W}" height="${height}" viewBox="0 0 ${NOW_W} ${height}">
  ${body}
</svg>`;
}

async function writeIllustration(slug, body) {
  const nowSvg = illustrationSvg(body, NOW_H);
  const focusSvg = illustrationSvg(body, FOCUS_H);

  const scenePath = path.join(scenesDir, `${slug}.png`);
  const focusPath = path.join(scenesDir, `${slug}-focus.png`);
  const rootPath = path.join(ikramDir, `${slug}.png`);
  const rawPath = path.join(scenesDir, `_raw-${slug}.png`);

  for (const [svg, dest] of [
    [nowSvg, scenePath],
    [focusSvg, focusPath],
    [nowSvg, rootPath],
    [nowSvg, rawPath],
  ]) {
    await sharp(Buffer.from(svg)).png().toFile(dest);
  }
}

async function main() {
  fs.mkdirSync(scenesDir, { recursive: true });

  for (const slug of SLUGS) {
    const body = slug === "bus-return" ? ILLUSTRATIONS.bus : ILLUSTRATIONS[slug];
    if (!body) {
      console.warn("skip — no art:", slug);
      continue;
    }
    await writeIllustration(slug, body);
    console.log("ok:", slug);
  }

  console.log(`Done — ${SLUGS.length} PixtoLearn illustrations → ${scenesDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

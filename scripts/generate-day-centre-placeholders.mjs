/**
 * Illustrated placeholders — Day Centre · General pack.
 * Output: public/cards/day centre/general/*.png
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const packDir = path.join(root, "public", "cards", "day centre");
const outDir = path.join(packDir, "general");

const W = 531;
const H = 648;
const PINK = "#E05C9A";

const SCENES = {
  bus:
    '<rect x="118" y="268" width="295" height="118" rx="22" fill="#E05C9A" opacity="0.88"/>' +
    '<rect x="138" y="292" width="88" height="62" rx="10" fill="#FFF8FC"/>' +
    '<rect x="242" y="292" width="88" height="62" rx="10" fill="#FFF8FC"/>' +
    '<circle cx="168" cy="404" r="24" fill="#4A3F55"/>' +
    '<circle cx="363" cy="404" r="24" fill="#4A3F55"/>',
  music:
    '<path d="M248 360V248l92 24v88" stroke="#9B5DE5" stroke-width="14" stroke-linecap="round"/>' +
    '<circle cx="214" cy="360" r="28" fill="#9B5DE5"/>' +
    '<circle cx="318" cy="372" r="28" fill="#E05C9A"/>',
  cafe:
    '<path d="M214 360h104" stroke="#C57A4A" stroke-width="12" stroke-linecap="round"/>' +
    '<rect x="232" y="286" width="68" height="58" rx="10" fill="#FFF"/>' +
    '<path d="M300 310h34a18 18 0 0 1 0 36h-34" stroke="#C57A4A" stroke-width="8" fill="none"/>',
  park:
    '<ellipse cx="266" cy="410" rx="180" ry="42" fill="#4FAF6B" opacity="0.22"/>' +
    '<circle cx="198" cy="286" r="54" fill="#4FAF6B" opacity="0.75"/>' +
    '<circle cx="334" cy="300" r="64" fill="#6BCF8E" opacity="0.8"/>',
  "park-and-swing":
    '<rect x="210" y="250" width="12" height="150" fill="#8B5E3C"/>' +
    '<rect x="310" y="250" width="12" height="150" fill="#8B5E3C"/>' +
    '<rect x="210" y="250" width="112" height="12" fill="#8B5E3C"/>' +
    '<rect x="236" y="340" width="60" height="14" rx="6" fill="#E05C9A"/>',
  "hair-salon":
    '<circle cx="266" cy="286" r="58" fill="#F7D7C4"/>' +
    '<path d="M208 360c18-42 108-42 116 0" fill="#5C4033"/>' +
    '<path d="M330 300h42l-18 48h-24z" fill="#E05C9A"/>',
  "make-up":
    '<ellipse cx="266" cy="300" rx="72" ry="88" fill="#F7D7C4"/>' +
    '<circle cx="236" cy="292" r="8" fill="#5C4033"/>' +
    '<circle cx="296" cy="292" r="8" fill="#5C4033"/>' +
    '<path d="M248 330q18 18 36 0" stroke="#E05C9A" stroke-width="6" fill="none"/>',
  "birthday-cake":
    '<rect x="176" y="330" width="180" height="72" rx="18" fill="#F9C8E0"/>' +
    '<rect x="196" y="302" width="140" height="42" rx="14" fill="#E05C9A" opacity="0.75"/>' +
    '<circle cx="266" cy="256" r="8" fill="#FF8A3D"/>',
  "birthday-party":
    '<circle cx="210" cy="320" r="22" fill="#9B5DE5"/>' +
    '<circle cx="266" cy="300" r="26" fill="#E05C9A"/>' +
    '<circle cx="322" cy="320" r="22" fill="#F5C84D"/>',
  westfield:
    '<rect x="176" y="286" width="72" height="72" rx="10" fill="#FFF"/>' +
    '<rect x="266" y="286" width="90" height="60" rx="8" fill="#E05C9A" opacity="0.45"/>',
  home:
    '<path d="M170 360 266 230 362 360Z" fill="#E05C9A" opacity="0.55"/>' +
    '<rect x="220" y="300" width="92" height="60" rx="8" fill="#FFF"/>',
  cab:
    '<rect x="150" y="320" width="230" height="70" rx="18" fill="#E05C9A" opacity="0.7"/>' +
    '<circle cx="198" cy="404" r="22" fill="#333"/>' +
    '<circle cx="332" cy="404" r="22" fill="#333"/>',
  "bean-bag":
    '<ellipse cx="266" cy="360" rx="120" ry="70" fill="#E05C9A" opacity="0.5"/>' +
    '<ellipse cx="266" cy="330" rx="90" ry="50" fill="#F9C8E0"/>',
  mcdonalds:
    '<text x="266" y="340" text-anchor="middle" font-size="96" font-weight="800" fill="#E05C9A" font-family="system-ui,sans-serif">M</text>',
  "black-nail-varnish":
    '<rect x="236" y="280" width="60" height="110" rx="12" fill="#111"/>' +
    '<rect x="248" y="250" width="36" height="36" rx="8" fill="#E05C9A"/>',
  "swimming-pool":
    '<rect x="120" y="300" width="292" height="90" rx="16" fill="#7EC8E3"/>' +
    '<path d="M150 345h232" stroke="#FFF" stroke-width="8" stroke-linecap="round"/>',
  toilet:
    '<ellipse cx="266" cy="360" rx="70" ry="44" fill="#F0F0F0" stroke="#CCC" stroke-width="4"/>' +
    '<rect x="220" y="250" width="92" height="70" rx="12" fill="#F8F8F8" stroke="#CCC" stroke-width="4"/>',
  "wash-hands":
    '<ellipse cx="220" cy="360" rx="42" ry="28" fill="#B8E3F4"/>' +
    '<ellipse cx="312" cy="360" rx="42" ry="28" fill="#B8E3F4"/>' +
    '<path d="M200 300c20-30 80-30 100 0" stroke="#7EC8E3" stroke-width="8" fill="none"/>',
  shower:
    '<path d="M220 250v80M266 230v110M312 250v80" stroke="#7EC8E3" stroke-width="10" stroke-linecap="round"/>',
  walk:
    '<circle cx="266" cy="270" r="28" fill="#F7D7C4"/>' +
    '<path d="M236 360c12-50 52-50 60 0M286 360c8-40 36-40 44 0" stroke="#E05C9A" stroke-width="10" stroke-linecap="round" fill="none"/>',
  yes:
    '<circle cx="266" cy="330" r="72" fill="#4FAF6B"/>' +
    '<path d="M230 330l28 28 54-58" stroke="#FFF" stroke-width="14" stroke-linecap="round" fill="none"/>',
  no:
    '<circle cx="266" cy="330" r="72" fill="#E05C9A"/>' +
    '<path d="M230 294l72 72M302 294l-72 72" stroke="#FFF" stroke-width="14" stroke-linecap="round"/>',
  "hair-care":
    '<rect x="200" y="300" width="132" height="18" rx="8" fill="#8B5E3C"/>' +
    '<ellipse cx="266" cy="280" rx="48" ry="12" fill="#E05C9A" opacity="0.45"/>',
  library:
    '<rect x="160" y="250" width="212" height="130" rx="12" fill="#E8D4B8"/>' +
    '<rect x="178" y="268" width="28" height="94" fill="#9B5DE5" opacity="0.55"/>' +
    '<rect x="218" y="268" width="28" height="94" fill="#E05C9A" opacity="0.55"/>' +
    '<rect x="258" y="268" width="28" height="94" fill="#4FAF6B" opacity="0.55"/>',
  breakfast:
    '<ellipse cx="266" cy="360" rx="90" ry="34" fill="#F9C8E0"/>' +
    '<ellipse cx="266" cy="330" rx="70" ry="48" fill="#FFF8E8" stroke="#E05C9A" stroke-width="4"/>',
  dinner:
    '<circle cx="266" cy="340" r="72" fill="#FFF" stroke="#E05C9A" stroke-width="4"/>' +
    '<circle cx="248" cy="328" r="14" fill="#4FAF6B"/>' +
    '<circle cx="286" cy="332" r="12" fill="#FF8A3D"/>',
  "bus-stop":
    '<rect x="180" y="280" width="172" height="90" rx="10" fill="#E05C9A" opacity="0.2"/>' +
    '<rect x="200" y="300" width="132" height="12" fill="#8B5E3C"/>' +
    '<rect x="210" y="250" width="8" height="62" fill="#666"/>',
  "community-centre":
    '<rect x="170" y="270" width="192" height="110" rx="12" fill="#E05C9A" opacity="0.35"/>' +
    '<rect x="220" y="310" width="40" height="70" fill="#FFF"/>' +
    '<rect x="286" y="300" width="36" height="36" fill="#B8E3F4"/>',
  shops:
    '<rect x="150" y="290" width="72" height="80" rx="8" fill="#F9C8E0"/>' +
    '<rect x="236" y="280" width="72" height="90" rx="8" fill="#E05C9A" opacity="0.55"/>' +
    '<rect x="322" y="290" width="72" height="80" rx="8" fill="#9B5DE5" opacity="0.45"/>',
  playground:
    '<path d="M220 380h92" stroke="#8B5E3C" stroke-width="8" stroke-linecap="round"/>' +
    '<path d="M236 380V290l40 48V290" stroke="#E05C9A" stroke-width="8" stroke-linecap="round" fill="none"/>' +
    '<circle cx="310" cy="320" r="28" fill="#F5C84D"/>',
};

/** @type {{ slug: string; title: string }[]} */
const CARDS = [
  { slug: "music", title: "Music" },
  { slug: "cafe", title: "Cafe" },
  { slug: "bus", title: "Bus" },
  { slug: "westfield", title: "Westfield" },
  { slug: "black-nail-varnish", title: "Nail varnish" },
  { slug: "mcdonalds", title: "McDonald's" },
  { slug: "bean-bag", title: "Bean bag" },
  { slug: "cab", title: "Cab" },
  { slug: "home", title: "Home" },
  { slug: "walk", title: "Walk" },
  { slug: "park", title: "Park" },
  { slug: "park-and-swing", title: "Park & swing" },
  { slug: "hair-salon", title: "Hair salon" },
  { slug: "make-up", title: "Make up" },
  { slug: "swimming-pool", title: "Swimming pool" },
  { slug: "toilet", title: "Toilet" },
  { slug: "wash-hands", title: "Wash hands" },
  { slug: "shower", title: "Shower" },
  { slug: "brush-teeth", title: "Brush teeth" },
  { slug: "get-dressed", title: "Get dressed" },
  { slug: "taxi", title: "Taxi" },
  { slug: "cross-road", title: "Cross road" },
  { slug: "wait", title: "Wait" },
  { slug: "karaoke", title: "Karaoke" },
  { slug: "market", title: "Market" },
  { slug: "supermarket", title: "Supermarket" },
  { slug: "shopping", title: "Shopping" },
  { slug: "shopping-basket", title: "Basket" },
  { slug: "pay", title: "Pay" },
  { slug: "queue", title: "Queue" },
  { slug: "eat", title: "Eat" },
  { slug: "drink", title: "Drink" },
  { slug: "snack", title: "Snack" },
  { slug: "restaurant", title: "Restaurant" },
  { slug: "help", title: "Help" },
  { slug: "stop", title: "Stop" },
  { slug: "finished", title: "Finished" },
  { slug: "more", title: "More" },
  { slug: "yes", title: "Yes" },
  { slug: "no", title: "No" },
  { slug: "not-now", title: "Not now" },
  { slug: "birthday-cake", title: "Birthday cake" },
  { slug: "birthday-party", title: "Birthday party" },
  { slug: "hair-care", title: "Hair care" },
  { slug: "library", title: "Library" },
  { slug: "breakfast", title: "Breakfast" },
  { slug: "dinner", title: "Dinner" },
  { slug: "bus-stop", title: "Bus stop" },
  { slug: "community-centre", title: "Community centre" },
  { slug: "shops", title: "Shops" },
  { slug: "playground", title: "Playground" },
];

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function defaultScene(title) {
  const safe = escapeXml(title);
  return (
    `<rect x="156" y="250" width="220" height="150" rx="24" fill="${PINK}" opacity="0.12"/>` +
    `<text x="266" y="340" text-anchor="middle" font-size="22" font-weight="600" fill="${PINK}" font-family="system-ui,sans-serif">${safe}</text>`
  );
}

function cardSvg({ title, scene }) {
  const safeTitle = escapeXml(title);
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#FFF5FA"/>
  <rect x="28" y="28" width="${W - 56}" height="${H - 56}" rx="28" fill="#FFFFFF" stroke="${PINK}" stroke-width="4"/>
  ${scene}
  <text x="${W / 2}" y="92" text-anchor="middle" font-family="system-ui,sans-serif" font-size="26" font-weight="700" fill="#2A2E32">${safeTitle}</text>
  <text x="${W / 2}" y="${H - 42}" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" fill="#9AA3AD">General · illustration</text>
</svg>`;
}

function logoSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="85" height="85" viewBox="0 0 85 85">
  <rect width="85" height="85" rx="18" fill="${PINK}"/>
  <circle cx="42" cy="34" r="14" fill="#FFF"/>
  <path d="M22 62c6-14 35-14 41 0" stroke="#FFF" stroke-width="6" stroke-linecap="round" fill="none"/>
</svg>`;
}

function backcardSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="744" height="1054" viewBox="0 0 744 1054">
  <rect width="744" height="1054" fill="${PINK}"/>
  <rect x="72" y="120" width="600" height="814" rx="48" fill="#FFF5FA"/>
  <text x="372" y="540" text-anchor="middle" font-family="system-ui,sans-serif" font-size="42" font-weight="700" fill="${PINK}">Day centre</text>
</svg>`;
}

async function writePng(svg, filePath) {
  await sharp(Buffer.from(svg)).png().toFile(filePath);
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  for (const card of CARDS) {
    const scene = SCENES[card.slug] ?? defaultScene(card.title);
    await writePng(cardSvg({ title: card.title, scene }), path.join(outDir, `${card.slug}.png`));
    console.log("general:", card.slug);
  }
  await writePng(logoSvg(), path.join(packDir, "logo-day-centre.png"));
  await writePng(backcardSvg(), path.join(packDir, "backcard-day-centre.png"));
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

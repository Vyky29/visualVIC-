/**
 * Photo-slot placeholders — Day Centre · Ikram pack.
 * Replace files in public/cards/day centre/ikram/ with real Ikram photos (same slug.png).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "cards", "day centre", "ikram");

const W = 531;
const H = 648;
const PINK = "#E05C9A";

const SLUGS = [
  "toilet",
  "wash-hands",
  "brush-teeth",
  "get-dressed",
  "hair-care",
  "bus",
  "taxi",
  "cab",
  "walking",
  "cross-road",
  "wait",
  "home",
  "bus-stop",
  "swimming",
  "hairdresser",
  "karaoke",
  "park",
  "playground",
  "cafe",
  "library",
  "music",
  "bean-bag",
  "supermarket",
  "market",
  "shops",
  "shopping",
  "basket",
  "pay",
  "queue",
  "westfield",
  "black-nail-varnish",
  "eat",
  "drink",
  "snack",
  "restaurant",
  "breakfast",
  "dinner",
  "mcdonalds",
  "help",
  "stop",
  "wait-one",
  "finished",
  "more",
  "yes",
  "no",
  "not-now",
  "swimming-pool",
  "hair-salon",
  "community-centre",
  "birthday-party",
  "bus-return",
];

function titleFromSlug(slug) {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function photoPlaceholderSvg(title) {
  const safe = title.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FFF8FC"/>
      <stop offset="100%" stop-color="#FCE4F0"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect x="36" y="36" width="${W - 72}" height="${H - 72}" rx="24" fill="#FFFFFF" stroke="${PINK}" stroke-width="5"/>
  <circle cx="266" cy="290" r="72" fill="#F7D7C4" stroke="${PINK}" stroke-width="4"/>
  <ellipse cx="266" cy="410" rx="88" ry="100" fill="#FF69B4" opacity="0.35"/>
  <text x="266" y="120" text-anchor="middle" font-family="system-ui,sans-serif" font-size="22" font-weight="700" fill="${PINK}">Ikram</text>
  <text x="266" y="155" text-anchor="middle" font-family="system-ui,sans-serif" font-size="20" font-weight="600" fill="#2A2E32">${safe}</text>
  <text x="266" y="${H - 48}" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" fill="#9AA3AD">Photo placeholder — replace with real image</text>
</svg>`;
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const refSrc = path.join(
    root,
    "..",
    ".cursor",
    "projects",
    "Users-victor-cursor-visualVIC",
    "assets",
    "image-66b8e7f7-33d9-4847-82aa-d1bb09fbcfe5.png",
  );
  const refDst = path.join(outDir, "_reference-ikram-grid.png");
  if (fs.existsSync(refSrc)) {
    fs.copyFileSync(refSrc, refDst);
    console.log("copied reference grid");
  }

  for (const slug of SLUGS) {
    const title = titleFromSlug(slug);
    await sharp(Buffer.from(photoPlaceholderSvg(title)))
      .png()
      .toFile(path.join(outDir, `${slug}.png`));
    console.log("ikram:", slug);
  }
  console.log("Done. Drop real photos as {slug}.png in", outDir);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

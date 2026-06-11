/**
 * Reference mockup: mobile landscape First & Then focus — full-width pair + vertical menu rail.
 * Output: docs/mockups/first-then-landscape-focus-reference.png
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const W = 844;
const H = 390;
const GAP = 12;
const MENU_W = 70;
const CARD_W = 744;
const CARD_H = 1054;
const HOTEL_COLOUR = "#8C1E2E";
const CANVAS = "#E8E4DA";

const firstIllustration = path.join(
  root,
  "public/cards/at the hotel/receive-your-room-key.PNG",
);
const secondIllustration = path.join(
  root,
  "public/cards/at the hotel/enter-your-room.PNG",
);
const logo = path.join(root, "public/cards/at the hotel/logo-hotel.png");
const outDir = path.join(root, "docs/mockups");
const outFile = path.join(outDir, "first-then-landscape-focus-reference.png");

async function cardSvg({
  title,
  category,
  illustrationBuffer,
  width,
  height,
}) {
  const illW = Math.round(width * 0.714);
  const illH = Math.round(height * 0.615);
  const illX = Math.round((width - illW) / 2);
  const illY = Math.round(height * 0.1);
  const titleY = Math.round(height * 0.76);
  const ribbonH = Math.round(height * 0.1);
  const mark = Math.round(width * 0.11);

  const illB64 = illustrationBuffer.toString("base64");
  const logoMeta = await sharp(logo).resize(mark, mark).png().toBuffer();
  const logoB64 = logoMeta.toString("base64");

  return Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="24" fill="#fff" stroke="${HOTEL_COLOUR}" stroke-width="2"/>
  <image href="data:image/png;base64,${illB64}" x="${illX}" y="${illY}" width="${illW}" height="${illH}" preserveAspectRatio="xMidYMid meet"/>
  <image href="data:image/png;base64,${logoB64}" x="${width - mark - 16}" y="16" width="${mark}" height="${mark}" preserveAspectRatio="xMidYMid meet"/>
  <text x="${width / 2}" y="${titleY}" text-anchor="middle" font-family="system-ui,sans-serif" font-size="${Math.round(width * 0.038)}" font-weight="600" fill="#141C18">${title}</text>
  <rect x="0" y="${height - ribbonH}" width="${width}" height="${ribbonH}" fill="${HOTEL_COLOUR}" rx="0"/>
  <rect x="0" y="${height - ribbonH}" width="${width}" height="12" fill="${HOTEL_COLOUR}"/>
  <text x="${width / 2}" y="${height - ribbonH / 3}" text-anchor="middle" font-family="system-ui,sans-serif" font-size="${Math.round(width * 0.028)}" font-weight="600" fill="#fff">${category}</text>
</svg>`);
}

function chromeSvg() {
  return Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${CANVAS}"/>
  <g transform="translate(${W - MENU_W - 8}, ${H - 150})">
    <rect x="0" y="0" width="58" height="26" rx="12" fill="#fff" stroke="#141C1820"/>
    <text x="29" y="17" text-anchor="middle" font-family="system-ui,sans-serif" font-size="7" font-weight="700" fill="#141C18">MODO ENFOQUE</text>
    <circle cx="29" cy="44" r="14" fill="#fff" stroke="#141C1820"/>
    <text x="29" y="48" text-anchor="middle" font-family="system-ui,sans-serif" font-size="18" font-weight="300" fill="#141C18">+</text>
  </g>
  <text x="${W / 2}" y="18" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" fill="#141C1888">MÓVIL HORIZONTAL — cartas a ancho completo · menú vertical a la derecha</text>
</svg>`);
}

function labelSvg(text, x, colour) {
  return Buffer.from(`<svg width="120" height="22" xmlns="http://www.w3.org/2000/svg">
  <circle cx="11" cy="11" r="9" fill="${colour}" stroke="#141C1820"/>
  <text x="11" y="15" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" font-weight="700" fill="#fff">${text === "PRIMERO" ? "1" : "2"}</text>
  <text x="58" y="15" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" font-weight="700" fill="#141C18">${text}</text>
</svg>`);
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });

  const contentW = W - MENU_W - 16;
  const labelBand = 24;
  const availH = H - labelBand - 16;
  const scale = Math.min(
    (contentW - GAP) / (CARD_W * 2),
    availH / CARD_H,
  );
  const slotW = Math.round(CARD_W * scale);
  const slotH = Math.round(CARD_H * scale);
  const pairW = slotW * 2 + GAP;
  const startX = Math.round((contentW - pairW) / 2) + 8;
  const startY = Math.round((H - slotH - labelBand) / 2) + labelBand;

  const [ill1, ill2] = await Promise.all([
    sharp(firstIllustration).resize(Math.round(slotW * 0.714), Math.round(slotH * 0.615)).png().toBuffer(),
    sharp(secondIllustration).resize(Math.round(slotW * 0.714), Math.round(slotH * 0.615)).png().toBuffer(),
  ]);

  const [card1, card2] = await Promise.all([
    sharp(await cardSvg({
      title: "recibe la llave",
      category: "en el hotel",
      illustrationBuffer: ill1,
      width: slotW,
      height: slotH,
    })).png().toBuffer(),
    sharp(await cardSvg({
      title: "entra en tu habitación",
      category: "en el hotel",
      illustrationBuffer: ill2,
      width: slotW,
      height: slotH,
    })).png().toBuffer(),
  ]);

  const chrome = await sharp(chromeSvg()).png().toBuffer();
  const label1 = await sharp(labelSvg("PRIMERO", startX + slotW / 2, "#6B8F71")).png().toBuffer();
  const label2 = await sharp(labelSvg("DESPUÉS", startX + slotW + GAP + slotW / 2, "#C84C57")).png().toBuffer();

  await sharp(chrome)
    .composite([
      { input: label1, left: Math.round(startX + slotW / 2 - 60), top: startY - 22 },
      { input: label2, left: Math.round(startX + slotW + GAP + slotW / 2 - 60), top: startY - 22 },
      { input: card1, left: startX, top: startY },
      { input: card2, left: startX + slotW + GAP, top: startY },
    ])
    .png()
    .toFile(outFile);

  console.log(`Wrote ${outFile}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

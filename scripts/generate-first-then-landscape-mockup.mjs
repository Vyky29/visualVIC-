/**
 * Reference mockups for First & Then demo — two screens.
 * 1. Intro portrait (vertical, no focus)
 * 2. Focus landscape (full-width pair + right menu rail)
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const HOTEL_COLOUR = "#8C1E2E";
const CANVAS = "#E8E4DA";
const CARD_W = 744;
const CARD_H = 1054;

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

async function cardSvg({ title, category, illustrationBuffer, width, height }) {
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
  <rect x="0" y="${height - ribbonH}" width="${width}" height="${ribbonH}" fill="${HOTEL_COLOUR}"/>
  <text x="${width / 2}" y="${height - ribbonH / 3}" text-anchor="middle" font-family="system-ui,sans-serif" font-size="${Math.round(width * 0.028)}" font-weight="600" fill="#fff">${category}</text>
</svg>`);
}

function labelColumnSvg(text, number, colour) {
  return Buffer.from(`<svg width="52" height="52" xmlns="http://www.w3.org/2000/svg">
  <circle cx="26" cy="18" r="11" fill="${colour}" stroke="#141C1820"/>
  <text x="26" y="22" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" font-weight="700" fill="#fff">${number}</text>
  <text x="26" y="44" text-anchor="middle" font-family="system-ui,sans-serif" font-size="7" font-weight="700" fill="#141C18">${text}</text>
</svg>`);
}

async function renderCard(slotW, slotH, illPath, title) {
  const ill = await sharp(illPath)
    .resize(Math.round(slotW * 0.714), Math.round(slotH * 0.615))
    .png()
    .toBuffer();
  return sharp(
    await cardSvg({
      title,
      category: "en el hotel",
      illustrationBuffer: ill,
      width: slotW,
      height: slotH,
    }),
  )
    .png()
    .toBuffer();
}

async function introPortraitMockup() {
  const W = 390;
  const H = 844;
  const labelCol = 52;
  const pad = 12;
  const headerH = 72;
  const footerH = 52;
  const contentH = H - headerH - footerH - pad * 2;
  const rowH = Math.floor((contentH - 8) / 2);
  const cardColW = W - labelCol - pad * 3;
  const scale = Math.min(cardColW / CARD_W, rowH / CARD_H);
  const slotW = Math.round(CARD_W * scale);
  const slotH = Math.round(CARD_H * scale);

  const [card1, card2] = await Promise.all([
    renderCard(slotW, slotH, firstIllustration, "recibe la llave"),
    renderCard(slotW, slotH, secondIllustration, "entra en tu habitación"),
  ]);

  const bg = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${CANVAS}"/>
  <text x="${W / 2}" y="38" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" font-weight="600" fill="#141C18">Primero / Después</text>
  <rect x="${pad}" y="${headerH}" width="${labelCol}" height="${rowH}" fill="transparent"/>
  <rect x="${pad + labelCol + 8}" y="${headerH}" width="${cardColW}" height="${rowH}" fill="transparent"/>
  <rect x="${pad}" y="${headerH + rowH + 8}" width="${labelCol}" height="${rowH}" fill="transparent"/>
  <rect x="${pad + labelCol + 8}" y="${headerH + rowH + 8}" width="${cardColW}" height="${rowH}" fill="transparent"/>
  <text x="${W / 2}" y="${H - 18}" text-anchor="middle" font-family="system-ui,sans-serif" font-size="8" fill="#141C1888">PANTALLA 1 — vertical · columna fina + tarjetas</text>
  <rect x="28" y="${H - 44}" width="48" height="22" rx="10" fill="#fff" stroke="#141C1820"/>
  <text x="52" y="${H - 29}" text-anchor="middle" font-size="7" font-weight="700" fill="#141C18">MENÚ</text>
  <rect x="84" y="${H - 44}" width="88" height="22" rx="10" fill="#fff" stroke="#141C1820"/>
  <text x="128" y="${H - 29}" text-anchor="middle" font-size="7" font-weight="700" fill="#141C18">MODO ENFOQUE</text>
</svg>`);

  const label1 = await sharp(labelColumnSvg("PRIMERO", "1", "#6B8F71")).png().toBuffer();
  const label2 = await sharp(labelColumnSvg("DESPUÉS", "2", "#C84C57")).png().toBuffer();
  const cardX = pad + labelCol + 8 + Math.round((cardColW - slotW) / 2);

  await sharp(bg)
    .composite([
      { input: label1, left: pad, top: headerH + Math.round((rowH - 52) / 2) },
      { input: card1, left: cardX, top: headerH + Math.round((rowH - slotH) / 2) },
      {
        input: label2,
        left: pad,
        top: headerH + rowH + 8 + Math.round((rowH - 52) / 2),
      },
      {
        input: card2,
        left: cardX,
        top: headerH + rowH + 8 + Math.round((rowH - slotH) / 2),
      },
    ])
    .png()
    .toFile(path.join(outDir, "first-then-intro-portrait-reference.png"));
}

async function focusLandscapeMockup() {
  const W = 844;
  const H = 390;
  const GAP = 12;
  const MENU_W = 70;
  const contentW = W - MENU_W - 16;
  const labelBand = 24;
  const availH = H - labelBand - 16;
  const scale = Math.min((contentW - GAP) / (CARD_W * 2), availH / CARD_H);
  const slotW = Math.round(CARD_W * scale);
  const slotH = Math.round(CARD_H * scale);
  const pairW = slotW * 2 + GAP;
  const startX = Math.round((contentW - pairW) / 2) + 8;
  const startY = Math.round((H - slotH - labelBand) / 2) + labelBand;

  const [card1, card2] = await Promise.all([
    renderCard(slotW, slotH, firstIllustration, "recibe la llave"),
    renderCard(slotW, slotH, secondIllustration, "entra en tu habitación"),
  ]);

  const chrome = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${CANVAS}"/>
  <g transform="translate(${W - MENU_W - 8}, ${H - 150})">
    <rect x="0" y="0" width="58" height="26" rx="12" fill="#fff" stroke="#141C1820"/>
    <text x="29" y="17" text-anchor="middle" font-size="7" font-weight="700" fill="#141C18">MODO ENFOQUE</text>
    <circle cx="29" cy="44" r="14" fill="#fff" stroke="#141C1820"/>
    <text x="29" y="48" text-anchor="middle" font-size="18" fill="#141C18">+</text>
  </g>
  <text x="${W / 2}" y="16" text-anchor="middle" font-size="9" fill="#141C1888">PANTALLA 2 — horizontal · tarjetas lado a lado · menú derecha (pulgar)</text>
</svg>`);

  const label1 = await sharp(labelColumnSvg("PRIMERO", "1", "#6B8F71")).resize(120, 22).png().toBuffer();
  const label2 = await sharp(labelColumnSvg("DESPUÉS", "2", "#C84C57")).resize(120, 22).png().toBuffer();

  await sharp(chrome)
    .composite([
      { input: label1, left: Math.round(startX + slotW / 2 - 60), top: startY - 22 },
      { input: label2, left: Math.round(startX + slotW + GAP + slotW / 2 - 60), top: startY - 22 },
      { input: card1, left: startX, top: startY },
      { input: card2, left: startX + slotW + GAP, top: startY },
    ])
    .png()
    .toFile(path.join(outDir, "first-then-landscape-focus-reference.png"));
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });
  await introPortraitMockup();
  await focusLandscapeMockup();
  console.log("Wrote intro + focus mockups in docs/mockups/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

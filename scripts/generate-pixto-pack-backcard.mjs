/**
 * PixtoLearn pack back card — same layout as brushing-teeth/backcard3.png,
 * recoloured per category (main + tint).
 *
 *   node scripts/generate-pixto-pack-backcard.mjs physical
 *   node scripts/generate-pixto-pack-backcard.mjs day-centre
 *   node scripts/generate-pixto-pack-backcard.mjs tailored
 *   node scripts/generate-pixto-pack-backcard.mjs --all
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const TEMPLATE = path.join(root, "public", "cards", "brushing-teeth", "backcard3.png");

/** @type {Record<string, { main: { r: number; g: number; b: number }; tint: { r: number; g: number; b: number }; out: string }>} */
const PACKS = {
  physical: {
    main: { r: 67, g: 160, b: 71 },
    tint: { r: 232, g: 245, b: 233 },
    out: path.join(root, "public", "cards", "physical", "backcard-physical.png"),
  },
  "day-centre": {
    main: { r: 229, g: 57, b: 53 },
    tint: { r: 255, g: 235, b: 238 },
    out: path.join(
      root,
      "public",
      "cards",
      "day centre",
      "backcard-day-centre.png",
    ),
  },
  tailored: {
    main: { r: 224, g: 92, b: 154 },
    tint: { r: 253, g: 232, b: 244 },
    out: path.join(
      root,
      "public",
      "cards",
      "tailored schedules",
      "backcard-tailored.png",
    ),
  },
  "tailored-navy": {
    main: { r: 30, g: 74, b: 115 },
    tint: { r: 232, g: 240, b: 248 },
    out: path.join(
      root,
      "public",
      "cards",
      "tailored schedules",
      "backcard-tailored-navy.png",
    ),
  },
};

function lum(r, g, b) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

/** Source backcard3 foreground = lime green PIX TO LEARN + icon strokes. */
function isForeground(r, g, b, a) {
  if (a < 128) return false;
  const l = lum(r, g, b);
  return g > r + 12 && g > b + 4 && g > 70 && l < 210;
}

function isTintBackground(r, g, b, a) {
  if (a < 128) return false;
  return lum(r, g, b) > 195;
}

async function recolorBackcard({ main, tint, out }) {
  const { data, info } = await sharp(TEMPLATE)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3];
    if (a < 16) continue;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    if (isForeground(r, g, b, a)) {
      data[i] = main.r;
      data[i + 1] = main.g;
      data[i + 2] = main.b;
    } else if (isTintBackground(r, g, b, a)) {
      data[i] = tint.r;
      data[i + 1] = tint.g;
      data[i + 2] = tint.b;
    }
  }

  fs.mkdirSync(path.dirname(out), { recursive: true });
  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(out);
}

async function tintLogo(from, to, rgb) {
  const { data, info } = await sharp(from)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3];
    if (a < 16) continue;
    const l = lum(data[i], data[i + 1], data[i + 2]);
    if (l > 240) continue;
    data[i] = rgb.r;
    data[i + 1] = rgb.g;
    data[i + 2] = rgb.b;
  }

  fs.mkdirSync(path.dirname(to), { recursive: true });
  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(to);
}

async function main() {
  const arg = process.argv[2] ?? "--all";
  const keys = arg === "--all" ? Object.keys(PACKS) : [arg];
  const logoSrc = path.join(root, "public", "cards", "at the hotel", "logo-hotel.png");

  for (const key of keys) {
    const pack = PACKS[key];
    if (!pack) {
      console.error(`Unknown pack "${key}". Use: ${Object.keys(PACKS).join(", ")}`);
      process.exit(1);
    }
    await recolorBackcard(pack);
    console.log("backcard:", pack.out);

    if (key === "physical") {
      await tintLogo(logoSrc, path.join(root, "public", "cards", "physical", "logo-physical.png"), pack.main);
      console.log("logo: physical");
    }
    if (key === "day-centre") {
      await tintLogo(
        logoSrc,
        path.join(root, "public", "cards", "day centre", "logo-day-centre.png"),
        pack.main,
      );
      console.log("logo: day-centre (red)");
    }
    if (key === "tailored") {
      await tintLogo(
        logoSrc,
        path.join(root, "public", "cards", "tailored schedules", "logo-tailored.png"),
        pack.main,
      );
      await tintLogo(
        logoSrc,
        path.join(root, "public", "cards", "day centre", "logo-day-centre-ikram.png"),
        pack.main,
      );
      console.log("logo: tailored + ikram mark");
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

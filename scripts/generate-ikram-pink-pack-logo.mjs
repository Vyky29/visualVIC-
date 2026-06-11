/**
 * PixtoLearn pack mark (same glyph as airport / hotel) tinted Day Centre pink.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const PINK = { r: 224, g: 92, b: 154 };

const src = path.join(root, "public", "cards", "at the hotel", "logo-hotel.png");
const outIkram = path.join(root, "public", "cards", "day centre", "logo-day-centre-ikram.png");
const outPack = path.join(root, "public", "cards", "day centre", "logo-day-centre.png");

async function pinkLogo(from, to) {
  const { data, info } = await sharp(from)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3];
    if (a < 16) continue;
    const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    if (lum > 240) continue;
    data[i] = PINK.r;
    data[i + 1] = PINK.g;
    data[i + 2] = PINK.b;
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(to);
  console.log("wrote", to);
}

await pinkLogo(src, outIkram);
await pinkLogo(src, outPack);

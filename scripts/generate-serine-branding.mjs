/**
 * Serine pack mark + avatar from reference photo — knock out black studio background.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { fitIllustrationToCard } from "./pixtolearn-card-fit.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const caraSrc = path.join(
  root,
  "public",
  "cards",
  "day centre",
  "serine",
  "_references",
  "serine-cara.png",
);

const avatarOut = path.join(root, "public", "avatars", "serine-cartoon.png");
const logoOut = path.join(
  root,
  "public",
  "cards",
  "day centre",
  "logo-day-centre-serine.png",
);

async function knockOutBlackPng(inputPath) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r < 48 && g < 48 && b < 48) {
      data[i + 3] = 0;
    }
  }

  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  }).png();
}

async function main() {
  if (!fs.existsSync(caraSrc)) {
    console.error("missing", caraSrc);
    process.exit(1);
  }

  const cutout = await knockOutBlackPng(caraSrc);
  const cutoutBuf = await cutout.toBuffer();

  await fitIllustrationToCard(cutoutBuf, avatarOut);
  console.log("avatar:", avatarOut);

  await sharp(cutoutBuf)
    .flatten({ background: "#ffffff" })
    .resize(85, 85, { fit: "cover", position: "centre" })
    .png()
    .toFile(logoOut);
  console.log("pack logo:", logoOut);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

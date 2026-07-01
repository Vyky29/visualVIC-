/**
 * Serine pack mark + avatar — prefer 3D cartoon art (like Ikram), fallback to photo cutout.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { fitIllustrationToCard } from "./pixtolearn-card-fit.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const assets =
  process.env.SERINE_ASSETS_DIR ??
  path.join(
    process.env.HOME ?? "/Users/victor",
    ".cursor",
    "projects",
    "Users-victor-cursor-visualVIC",
    "assets",
  );

const caraSrc = path.join(
  root,
  "public",
  "cards",
  "day centre",
  "serine",
  "_references",
  "serine-cara.png",
);

const cartoonSrc = path.join(assets, "serine-cartoon-3d-adult.png");
const refCartoon = path.join(
  root,
  "public",
  "cards",
  "day centre",
  "serine",
  "_references",
  "serine-cartoon-3d-adult.png",
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

async function publishCartoonAvatar(src) {
  fs.mkdirSync(path.dirname(refCartoon), { recursive: true });
  fs.copyFileSync(src, refCartoon);
  // Library folder headers — full landscape source (like Ikram); UI crops with object-cover.
  await sharp(src).png().toFile(avatarOut);
  await sharp(src)
    .resize(85, 85, { fit: "cover", position: "attention" })
    .png()
    .toFile(logoOut);
}

async function publishPhotoFallback() {
  if (!fs.existsSync(caraSrc)) {
    console.error("missing", caraSrc);
    process.exit(1);
  }
  const cutout = await knockOutBlackPng(caraSrc);
  const cutoutBuf = await cutout.toBuffer();
  await fitIllustrationToCard(cutoutBuf, avatarOut);
  await sharp(cutoutBuf)
    .flatten({ background: "#ffffff" })
    .resize(85, 85, { fit: "cover", position: "centre" })
    .png()
    .toFile(logoOut);
}

async function main() {
  if (fs.existsSync(cartoonSrc)) {
    await publishCartoonAvatar(cartoonSrc);
    console.log("avatar (3D cartoon):", avatarOut);
    console.log("pack logo:", logoOut);
    return;
  }

  console.warn("no cartoon source — falling back to serine-cara cutout");
  await publishPhotoFallback();
  console.log("avatar:", avatarOut);
  console.log("pack logo:", logoOut);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

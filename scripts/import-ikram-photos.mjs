/**
 * Import Ikram reference photos + cartoon avatar into the Ikram day-centre pack.
 * Real photos where they match an activity; cartoon 3D avatar everywhere else.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const assets =
  process.env.IKRAM_ASSETS_DIR ??
  path.join(
    process.env.HOME ?? "/Users/victor",
    ".cursor",
    "projects",
    "Users-victor-cursor-visualVIC",
    "assets",
  );

const W = 531;
const H = 648;
const PINK = "#E05C9A";

const ikramDir = path.join(root, "public", "cards", "day centre", "ikram");
const avatarDir = path.join(root, "public", "avatars");
const refDir = path.join(ikramDir, "_references");

const PHOTOS = {
  outdoorVest: "image-41652cc1-9690-4058-8919-31e2d24ca27b.png",
  leopard: "image-3389be13-d300-45f5-bfde-74e03f46fe89.png",
  beanie: "image-21903700-2962-4d64-bf6c-be205edc17f8.png",
  headphones: "image-cdf3555a-42fb-43e8-8364-ce9b1842c91c.png",
  birthday: "image-df98e809-e05c-4936-b279-7d78ba673dae.png",
  pinkShirt: "image-6ed93bd2-2d4b-40ca-beb0-60b8e36b5361.png",
  cartoonPink: "ikram-cartoon-pink-adult.png",
  cartoonLeopard: "ikram-cartoon-leopard-adult.png",
};

/** Activity-matched real photos (slug → asset key). */
const REAL_PHOTO_SLUGS = {
  music: "headphones",
  karaoke: "headphones",
  "birthday-party": "birthday",
  walking: "outdoorVest",
  walk: "outdoorVest",
  park: "outdoorVest",
  playground: "outdoorVest",
  home: "beanie",
  library: "pinkShirt",
  westfield: "pinkShirt",
  shopping: "pinkShirt",
};

async function coverPng(src, dest) {
  await sharp(src)
    .resize(W, H, { fit: "cover", position: "attention" })
    .png()
    .toFile(dest);
}

async function cartoonCardPng(src, dest) {
  await sharp(src)
    .resize(W, H, {
      fit: "contain",
      background: { r: 255, g: 245, b: 250, alpha: 1 },
    })
    .png()
    .toFile(dest);
}

function listIkramSlugs() {
  return fs
    .readdirSync(ikramDir)
    .filter((f) => f.endsWith(".png") && !f.startsWith("_"))
    .map((f) => f.replace(/\.png$/, ""));
}

async function main() {
  fs.mkdirSync(avatarDir, { recursive: true });
  fs.mkdirSync(refDir, { recursive: true });

  for (const [key, file] of Object.entries(PHOTOS)) {
    const src = path.join(assets, file);
    if (!fs.existsSync(src)) {
      console.warn("missing asset:", file);
      continue;
    }
    fs.copyFileSync(src, path.join(refDir, file));
  }

  const cartoonPinkSrc = path.join(assets, PHOTOS.cartoonPink);
  const cartoonLeopardSrc = path.join(assets, PHOTOS.cartoonLeopard);
  if (fs.existsSync(cartoonPinkSrc)) {
    await sharp(cartoonPinkSrc).png().toFile(path.join(avatarDir, "ikram-cartoon.png"));
    await sharp(cartoonPinkSrc)
      .resize(85, 85, { fit: "cover", position: "attention" })
      .png()
      .toFile(path.join(root, "public", "cards", "day centre", "logo-day-centre-ikram.png"));
    console.log("avatar (pink adult) + ikram pack logo");
  }
  if (fs.existsSync(cartoonLeopardSrc)) {
    await sharp(cartoonLeopardSrc)
      .png()
      .toFile(path.join(avatarDir, "ikram-cartoon-leopard.png"));
    console.log("avatar variant (leopard adult)");
  }

  const photoSrc = {};
  for (const [key, file] of Object.entries(PHOTOS)) {
    if (key.startsWith("cartoon")) continue;
    const p = path.join(assets, file);
    if (fs.existsSync(p)) photoSrc[key] = p;
  }

  const slugs = listIkramSlugs();
  let real = 0;
  let cartoonPink = 0;
  let cartoonLeopard = 0;

  for (const slug of slugs) {
    const dest = path.join(ikramDir, `${slug}.png`);
    const photoKey = REAL_PHOTO_SLUGS[slug];
    if (photoKey && photoSrc[photoKey]) {
      await coverPng(photoSrc[photoKey], dest);
      real++;
      console.log("photo:", slug, "←", photoKey);
    } else if (slug === "cafe" && fs.existsSync(cartoonLeopardSrc)) {
      await cartoonCardPng(cartoonLeopardSrc, dest);
      cartoonLeopard++;
      console.log("cartoon leopard:", slug);
    } else if (fs.existsSync(cartoonPinkSrc)) {
      await cartoonCardPng(cartoonPinkSrc, dest);
      cartoonPink++;
    }
  }

  console.log(
    `Done — ${real} real photos, ${cartoonPink} pink cartoon, ${cartoonLeopard} leopard cartoon.`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

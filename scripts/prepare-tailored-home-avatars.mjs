/**
 * Home · Tailored schedules — square 2D face tiles (contain, full head visible).
 *
 *   node scripts/prepare-tailored-home-avatars.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const avatarDir = path.join(root, "public", "avatars");

/** @type {{ dest: string; src: string }[]} */
const AVATARS = [
  {
    dest: "ikram-cartoon-home.png",
    src: path.join(avatarDir, "ikram-cartoon-leopard-2d.png"),
  },
  {
    dest: "serine-cartoon-home.png",
    src: path.join(avatarDir, "serine-cartoon-2d.png"),
  },
  {
    dest: "ayaan-cartoon-home.png",
    src: path.join(avatarDir, "ayaan-cartoon-2d.png"),
  },
  {
    dest: "emmanuel-cartoon-home.png",
    src: path.join(avatarDir, "emmanuel-cartoon-2d.png"),
  },
];

const SIZE = 960;
const PAD = 20;

async function exportHomeAvatar(src, dest) {
  let img = sharp(src);
  try {
    img = img.trim({ threshold: 20 });
  } catch {
    // keep original
  }

  const max = SIZE - 2 * PAD;
  const resized = await img
    .resize(max, max, { fit: "inside" })
    .png()
    .toBuffer();

  await sharp({
    create: { width: SIZE, height: SIZE, channels: 3, background: "#ffffff" },
  })
    .composite([{ input: resized, gravity: "centre" }])
    .png()
    .toFile(dest);
}

async function main() {
  for (const { dest, src } of AVATARS) {
    if (!fs.existsSync(src)) {
      console.warn("missing:", src);
      continue;
    }
    await exportHomeAvatar(src, path.join(avatarDir, dest));
    console.log("home avatar:", path.basename(src), "→", dest);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

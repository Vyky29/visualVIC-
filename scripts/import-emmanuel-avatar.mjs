/**
 * Publish Emmanuel 2D / 3D cartoon avatars from Cursor assets.
 *
 *   node scripts/import-emmanuel-avatar.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const assets =
  process.env.EMMANUEL_ASSETS_DIR ??
  path.join(
    process.env.HOME ?? "/Users/victor",
    ".cursor",
    "projects",
    "Users-victor-cursor-visualVIC",
    "assets",
  );

const avatarDir = path.join(root, "public", "avatars");
const refDir = path.join(avatarDir, "_references");

const CARTOON = {
  "2d": {
    asset: "emmanuel-cartoon-2d-adult.png",
    avatar: "emmanuel-cartoon-2d.png",
  },
  "3d": {
    asset: "emmanuel-cartoon-3d-adult.png",
    avatar: "emmanuel-cartoon.png",
  },
};

async function main() {
  fs.mkdirSync(refDir, { recursive: true });

  for (const [style, { asset, avatar }] of Object.entries(CARTOON)) {
    const src = path.join(assets, asset);
    if (!fs.existsSync(src)) {
      console.warn("missing cartoon:", asset, `(phase ${style})`);
      continue;
    }
    await sharp(src).png().toFile(path.join(avatarDir, avatar));
    fs.copyFileSync(src, path.join(refDir, asset));
    console.log("avatar:", style, "→", avatar);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

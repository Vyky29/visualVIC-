/**
 * Copy Portal staff photos and publish square avatar PNGs for Circle Time.
 *
 *   node scripts/import-staff-avatars.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const portalPhotos =
  process.env.PORTAL_STAFF_PHOTOS ??
  path.join(
    process.env.HOME ?? "/Users/victor",
    "cursor",
    "PORTALVIC",
    "working_ui",
    "portal",
    "staff_photos",
  );

const avatarDir = path.join(root, "public", "avatars");
const refDir = path.join(avatarDir, "_references", "staff");

const STAFF = [
  { id: "youssef", source: "youssef.png" },
  { id: "luliya", source: "luliya.png" },
  { id: "michelle", source: "michelle.png" },
  { id: "raul", source: "raul.png" },
  { id: "roberto", source: "roberto.png" },
  { id: "victor", source: "victor.png" },
];

async function publishAvatar(id, srcPath) {
  const out = path.join(avatarDir, `${id}-cartoon-2d.png`);
  await sharp(srcPath)
    .rotate()
    .resize(512, 512, { fit: "cover", position: "attention" })
    .png()
    .toFile(out);
  console.log("avatar:", id, "→", path.relative(root, out));
}

async function main() {
  fs.mkdirSync(refDir, { recursive: true });

  for (const { id, source } of STAFF) {
    const src = path.join(portalPhotos, source);
    if (!fs.existsSync(src)) {
      console.warn("missing staff photo:", source);
      continue;
    }
    const refOut = path.join(refDir, source);
    fs.copyFileSync(src, refOut);
    await publishAvatar(id, src);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

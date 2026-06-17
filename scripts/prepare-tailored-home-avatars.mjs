/**
 * Home · Tailored schedules — square face close-ups (Ikram reference).
 * Crops 3D portrait sources to fill tile previews with object-cover.
 *
 *   node scripts/prepare-tailored-home-avatars.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const assets =
  process.env.TAILORED_HOME_ASSETS_DIR ??
  path.join(
    process.env.HOME ?? "/Users/victor",
    ".cursor",
    "projects",
    "Users-victor-cursor-visualVIC",
    "assets",
  );

const avatarDir = path.join(root, "public", "avatars");
const refDir = path.join(avatarDir, "_references");

/** @type {{ dest: string; candidates: string[]; position?: string }[]} */
const AVATARS = [
  {
    dest: "ikram-cartoon-home.png",
    candidates: [
      path.join(assets, "ikram-cartoon-pink-adult.png"),
      path.join(assets, "ikram-cartoon-avatar.png"),
      path.join(avatarDir, "ikram-cartoon.png"),
    ],
    position: "north",
  },
  {
    dest: "serine-cartoon-home.png",
    candidates: [
      path.join(assets, "serine-cartoon-3d-adult.png"),
      path.join(refDir, "serine-cartoon-3d-adult.png"),
      path.join(
        root,
        "public",
        "cards",
        "day centre",
        "serine",
        "_references",
        "serine-cartoon-3d-adult.png",
      ),
    ],
    position: "north",
  },
  {
    dest: "ayaan-cartoon-home.png",
    candidates: [
      path.join(assets, "ayaan-cartoon-3d-adult.png"),
      path.join(refDir, "ayaan-cartoon-3d-adult.png"),
      path.join(avatarDir, "ayaan-cartoon.png"),
    ],
    position: "north",
  },
  {
    dest: "emmanuel-cartoon-home.png",
    candidates: [
      path.join(assets, "emmanuel-cartoon-3d-adult.png"),
      path.join(refDir, "emmanuel-cartoon-3d-adult.png"),
      path.join(avatarDir, "emmanuel-cartoon.png"),
    ],
    position: "north",
  },
];

function resolveSrc(candidates) {
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

/**
 * @param {string} src
 * @param {string} dest
 * @param {string} position
 */
async function exportHomeAvatar(src, dest, position) {
  let img = sharp(src);
  try {
    img = img.trim({ threshold: 20 });
  } catch {
    // keep original
  }

  await img
    .resize(960, 960, { fit: "cover", position })
    .png()
    .toFile(dest);
}

async function main() {
  fs.mkdirSync(avatarDir, { recursive: true });

  for (const { dest, candidates, position = "north" } of AVATARS) {
    const src = resolveSrc(candidates);
    if (!src) {
      console.warn("missing source for", dest);
      continue;
    }
    const out = path.join(avatarDir, dest);
    await exportHomeAvatar(src, out, position);
    console.log("home avatar:", path.basename(src), "→", dest);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

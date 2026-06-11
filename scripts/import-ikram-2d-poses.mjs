/**
 * Ikram 2D cartoon poses — standing (walk) and sitting (sit-down).
 * Sources: ikram-adult-standing-raw.png, ikram-adult-sitting-wait-raw.png (box + arrow)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { fitIllustrationToCard, FOCUS_H } from "./pixtolearn-card-fit.mjs";

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

const ikramDir = path.join(root, "public", "cards", "day centre", "ikram");
const scenesDir = path.join(ikramDir, "scenes");

const POSES = [
  {
    slug: "walk",
    src: "ikram-adult-standing-raw.png",
    title: "Walk (2D standing)",
  },
  {
    slug: "sit-down",
    src: "ikram-adult-sitting-wait-raw.png",
    title: "Sit down (2D, on box)",
  },
];

async function trimmedPosePng(src, dest) {
  await sharp(src)
    .trim({ threshold: 12, background: "#ffffff" })
    .png()
    .toFile(dest);
}

async function main() {
  fs.mkdirSync(scenesDir, { recursive: true });

  for (const { slug, src, title } of POSES) {
    const rawPath = path.join(assets, src);
    if (!fs.existsSync(rawPath)) {
      console.warn("skip — missing:", src);
      continue;
    }

    const rootDest = path.join(ikramDir, `${slug}.png`);
    const sceneDest = path.join(scenesDir, `${slug}.png`);
    const rawLocal = path.join(scenesDir, `_raw-${slug}.png`);
    const focusDest = path.join(scenesDir, `${slug}-focus.png`);

    fs.copyFileSync(rawPath, rawLocal);
    await trimmedPosePng(rawPath, rootDest);
    await trimmedPosePng(rawPath, sceneDest);
    await fitIllustrationToCard(rawPath, focusDest, { height: FOCUS_H });

    console.log("ok:", title, "→", slug);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

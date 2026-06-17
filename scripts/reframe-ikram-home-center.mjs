/**
 * Home illustration — Ikram with her cat, centred for PixtoLearn frames.
 * PixtoLearn: Now/Next 531×648, Focus 531×663.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
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

function resolveSrc() {
  const candidates = [
    path.join(assets, "ikram-home-black-cat-v2-raw.png"),
    path.join(assets, "ikram-home-black-cat-raw.png"),
    path.join(assets, "ikram-home-cat-raw.png"),
    path.join(assets, "ikram-pecs-home-raw.png"),
    path.join(assets, "ikram-scene-home-raw.png"),
    path.join(scenesDir, "_raw-home.png"),
    path.join(scenesDir, "home.png"),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error("home source not found");
}

async function main() {
  const src = resolveSrc();
  console.log("source:", src);

  const rawLocal = path.join(scenesDir, "_raw-home.png");
  if (src !== rawLocal) {
    fs.mkdirSync(scenesDir, { recursive: true });
    fs.copyFileSync(src, rawLocal);
  }

  const fitOpts = { fit: "cover-padded", position: "north" };
  await fitIllustrationToCard(src, path.join(scenesDir, "home.png"), fitOpts);
  await fitIllustrationToCard(src, path.join(scenesDir, "home-focus.png"), {
    ...fitOpts,
    height: FOCUS_H,
  });
  await fitIllustrationToCard(src, path.join(ikramDir, "home.png"), fitOpts);

  console.log("Done — home reframed (cover-padded), Ikram + black cat.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

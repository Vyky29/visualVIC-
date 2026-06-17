/**
 * Re-frame Serine scene illustrations from RAW sources.
 * Set SERINE_ILLUSTRATION_STYLE=2d (default) or 3d to pick raw asset prefix.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fitIllustrationToCard, FOCUS_H } from "./pixtolearn-card-fit.mjs";
import { serineScheduleSlugs } from "./serine-physical-manifest.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const style = (process.env.SERINE_ILLUSTRATION_STYLE ?? "2d").toLowerCase();
if (style !== "2d" && style !== "3d") {
  console.error("SERINE_ILLUSTRATION_STYLE must be 2d or 3d");
  process.exit(1);
}

const assets =
  process.env.SERINE_ASSETS_DIR ??
  path.join(
    process.env.HOME ?? "/Users/victor",
    ".cursor",
    "projects",
    "Users-victor-cursor-visualVIC",
    "assets",
  );

const serineDir = path.join(root, "public", "cards", "day centre", "serine");
const scenesDir = path.join(serineDir, "scenes");

function rawAssetNames(slug) {
  return [`serine-${style}-${slug}-raw.png`, `serine-pecs-${slug}-raw.png`];
}

function resolveSrc(slug) {
  const candidates = [
    ...rawAssetNames(slug).map((n) => path.join(assets, n)),
    path.join(scenesDir, `_raw-${slug}.png`),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

async function main() {
  fs.mkdirSync(scenesDir, { recursive: true });

  let ok = 0;
  let skip = 0;

  for (const slug of serineScheduleSlugs()) {
    const src = resolveSrc(slug);
    if (!src) {
      console.warn("skip — no raw:", slug, `(style=${style})`);
      skip++;
      continue;
    }

    const rawLocal = path.join(scenesDir, `_raw-${slug}.png`);
    if (src !== rawLocal) {
      fs.copyFileSync(src, rawLocal);
    }

    await fitIllustrationToCard(src, path.join(scenesDir, `${slug}.png`));
    await fitIllustrationToCard(src, path.join(scenesDir, `${slug}-focus.png`), {
      height: FOCUS_H,
    });
    await fitIllustrationToCard(src, path.join(serineDir, `${slug}.png`));

    console.log("ok:", slug);
    ok++;
  }

  console.log(`Done (${style}) — ${ok} reframed, ${skip} skipped.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

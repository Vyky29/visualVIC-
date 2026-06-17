/**
 * Temporary Serine library/player cards from reference photos until 2D/3D art ships.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fitIllustrationToCard, FOCUS_H } from "./pixtolearn-card-fit.mjs";
import { SERINE_PHYSICAL_SCHEDULE } from "./serine-physical-manifest.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const refDir = path.join(root, "public", "cards", "day centre", "serine", "_references");
const serineDir = path.join(root, "public", "cards", "day centre", "serine");
const scenesDir = path.join(serineDir, "scenes");

/** Reference photo per step until personalised scene art exists. */
const REF_FOR_SLUG = {
  toilet: "serine-cara.png",
  finished: "serine-cara.png",
  "therapy-ball-bouncing": "serine-pe1.png",
  "sandbag-carry": "serine-pe1.png",
};

function refForSlug(slug) {
  return path.join(refDir, REF_FOR_SLUG[slug] ?? "serine-pe1.png");
}

async function main() {
  fs.mkdirSync(scenesDir, { recursive: true });

  for (const { slug } of SERINE_PHYSICAL_SCHEDULE) {
    const rawScene = path.join(scenesDir, `_raw-${slug}.png`);
    if (fs.existsSync(rawScene)) {
      console.log("skip — 3D raw exists:", slug);
      continue;
    }

    const src = refForSlug(slug);
    if (!fs.existsSync(src)) {
      console.warn("skip — missing ref for", slug);
      continue;
    }

    const fitOpts = {
      fit: "cover-padded",
      position: "north",
      background: "#000000",
    };
    await fitIllustrationToCard(
      src,
      path.join(scenesDir, `${slug}.png`),
      fitOpts,
    );
    await fitIllustrationToCard(
      src,
      path.join(scenesDir, `${slug}-focus.png`),
      { ...fitOpts, height: FOCUS_H },
    );
    await fitIllustrationToCard(src, path.join(serineDir, `${slug}.png`), fitOpts);

    console.log("preview:", slug);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

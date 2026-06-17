/**
 * Re-frame all Level 1 Generic Day Centre cards from `_raw-{slug}.png` sources.
 * Ensures illustrations sit inside the 531×648 box with safe margins.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fitIllustrationToCard } from "./pixtolearn-card-fit.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "cards", "day centre", "general");

async function main() {
  const raws = fs
    .readdirSync(outDir)
    .filter((f) => f.startsWith("_raw-") && f.endsWith(".png"))
    .sort();

  if (raws.length === 0) {
    console.error("No _raw-*.png files in", outDir);
    process.exit(1);
  }

  let ok = 0;

  for (const raw of raws) {
    const slug = raw.slice(5, -4);
    const src = path.join(outDir, raw);
    const dest = path.join(outDir, `${slug}.png`);
    await fitIllustrationToCard(src, dest);
    console.log("ok:", slug);
    ok++;
  }

  console.log(`Done — ${ok} cards reframed → ${outDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

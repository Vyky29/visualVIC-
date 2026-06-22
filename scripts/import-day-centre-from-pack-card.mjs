/**
 * Import illustration from a full PixtoLearn WOW pack card (core / shower / etc.)
 * into Level 1 general/{slug}.png (531×648 illustration-only, no logo/title/ribbon).
 *
 * Usage: node scripts/import-day-centre-from-pack-card.mjs <slug> <pack-card.png>
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  extractBundledPackCardIllustration531x648,
  importDesignerIllustration531x648,
} from "./pixtolearn-card-fit.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "cards", "day centre", "general");

async function main() {
  const slug = process.argv[2];
  const srcPath = process.argv[3];

  if (!slug || !srcPath) {
    console.error(
      "Usage: node scripts/import-day-centre-from-pack-card.mjs <slug> <pack-card.png>",
    );
    process.exit(1);
  }

  const resolved = path.isAbsolute(srcPath) ? srcPath : path.join(root, srcPath);
  if (!fs.existsSync(resolved)) {
    console.error("Source not found:", resolved);
    process.exit(1);
  }

  fs.mkdirSync(outDir, { recursive: true });

  const extracted = await extractBundledPackCardIllustration531x648(resolved);
  const rawDest = path.join(outDir, `_raw-${slug}.png`);
  const dest = path.join(outDir, `${slug}.png`);

  fs.writeFileSync(rawDest, extracted);
  await importDesignerIllustration531x648(extracted, dest);

  console.log("ok:", path.relative(root, dest));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

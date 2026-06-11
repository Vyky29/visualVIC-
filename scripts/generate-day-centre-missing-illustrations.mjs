/**
 * Import AI-generated missing Level 1 illustrations.
 * Generate PNGs first (Cursor assets), then:
 *   node scripts/generate-day-centre-missing-illustrations.mjs [assets-dir]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const defaultAssets = path.join(
  process.env.HOME ?? "/Users/victor",
  ".cursor",
  "projects",
  "Users-victor-cursor-visualVIC",
  "assets",
);

/** slug → expected raw filename in assets dir */
export const MISSING_ILLUSTRATIONS = {
  restaurant:
    "dcg-restaurant-raw.png",
  breakfast:
    "dcg-breakfast-raw.png",
  dinner:
    "dcg-dinner-raw.png",
  snack:
    "dcg-snack-raw.png",
  supermarket:
    "dcg-supermarket-raw.png",
  shopping:
    "dcg-shopping-raw.png",
  shops:
    "dcg-shops-raw.png",
  pay:
    "dcg-pay-raw.png",
  queue:
    "dcg-queue-raw.png",
  "not-now":
    "dcg-not-now-raw.png",
  "community-centre":
    "dcg-community-centre-raw.png",
  "birthday-party":
    "dcg-birthday-party-raw.png",
  karaoke:
    "dcg-karaoke-raw.png",
  library:
    "dcg-library-raw.png",
  "hair-salon":
    "dcg-hair-salon-raw.png",
  "hair-care":
    "dcg-hair-care-raw.png",
  "get-dressed":
    "dcg-get-dressed-raw.png",
  park:
    "dcg-park-raw.png",
  "cross-road":
    "dcg-cross-road-raw.png",
  "bus-stop":
    "dcg-bus-stop-raw.png",
};

const assetsDir = process.argv[2] ?? defaultAssets;
const importScript = path.join(__dirname, "import-day-centre-general-asset.mjs");

let ok = 0;
let skip = 0;

for (const [slug, file] of Object.entries(MISSING_ILLUSTRATIONS)) {
  const src = path.join(assetsDir, file);
  if (!fs.existsSync(src)) {
    console.warn("skip — missing:", file);
    skip++;
    continue;
  }
  const result = spawnSync(process.execPath, [importScript, slug, src], {
    cwd: root,
    stdio: "inherit",
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
  ok++;
}

console.log(`Done — ${ok} imported, ${skip} skipped.`);

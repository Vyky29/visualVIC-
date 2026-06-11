/**
 * Fill remaining Level 1 general placeholders from pack cards + existing raws.
 * Run before generate-day-centre-missing-illustrations.mjs for AI subjects.
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const general = path.join(root, "public", "cards", "day centre", "general");

const node = process.execPath;

function run(script, args) {
  const result = spawnSync(node, [path.join(__dirname, script), ...args], {
    cwd: root,
    stdio: "inherit",
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

/** @type {Array<[string, string]>} */
const FROM_CORE = [
  ["help", "public/cards/core/help.png"],
  ["stop", "public/cards/core/stop.png"],
  ["more", "public/cards/core/more.png"],
  ["finished", "public/cards/core/finish.png"],
  ["yes", "public/cards/core/yes.png"],
  ["no", "public/cards/core/no.png"],
  ["wait", "public/cards/core/wait.png"],
  ["walk", "public/cards/core/walk.png"],
];

/** @type {Array<[string, string]>} */
const FROM_EXISTING_RAW = [
  ["birthday-cake", path.join(general, "_raw-cake.png")],
  ["shopping-basket", path.join(general, "_raw-shoop.png")],
  ["make-up", path.join(general, "_raw-lipstick.png")],
  ["playground", path.join(general, "_raw-swing.png")],
  ["taxi", path.join(general, "_raw-cab.png")],
];

for (const [slug, src] of FROM_CORE) {
  run("import-day-centre-from-pack-card.mjs", [slug, src]);
}

for (const [slug, src] of FROM_EXISTING_RAW) {
  run("import-day-centre-general-asset.mjs", [slug, src]);
}

console.log("Done — pack + existing raw imports.");

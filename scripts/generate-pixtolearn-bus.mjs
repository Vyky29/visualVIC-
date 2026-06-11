/**
 * London red double-decker bus — PixtoLearn cards (531×648 / 531×663).
 * Writes to Ikram scenes + General pack.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { londonBusSvg } from "./pixtolearn-london-bus.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const ikramDir = path.join(root, "public", "cards", "day centre", "ikram");
const scenesDir = path.join(ikramDir, "scenes");
const generalDir = path.join(root, "public", "cards", "day centre", "general");

async function writePng(svg, dest) {
  await sharp(Buffer.from(svg)).png().toFile(dest);
}

async function main() {
  fs.mkdirSync(scenesDir, { recursive: true });
  fs.mkdirSync(generalDir, { recursive: true });

  const nowSvg = londonBusSvg(648);
  const focusSvg = londonBusSvg(663);

  const targets = [
    [nowSvg, path.join(scenesDir, "bus.png")],
    [focusSvg, path.join(scenesDir, "bus-focus.png")],
    [nowSvg, path.join(scenesDir, "bus-return.png")],
    [focusSvg, path.join(scenesDir, "bus-return-focus.png")],
    [nowSvg, path.join(ikramDir, "bus.png")],
    [nowSvg, path.join(ikramDir, "bus-return.png")],
    [nowSvg, path.join(scenesDir, "_raw-bus.png")],
    [nowSvg, path.join(scenesDir, "_raw-bus-return.png")],
    [nowSvg, path.join(generalDir, "bus.png")],
  ];

  for (const [svg, dest] of targets) {
    await writePng(svg, dest);
    console.log("ok:", path.relative(root, dest));
  }

  console.log("Done — London red double-decker bus.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

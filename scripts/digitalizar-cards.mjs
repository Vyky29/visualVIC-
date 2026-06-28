#!/usr/bin/env node
/**
 * Digitalizar cards: strip the PixtoLearn frame (ribete), top-right logo and
 * bottom title text from a bundled designer PNG, crop to the illustration and
 * enlarge it to fill the NOW card (531×648) with a small even pad.
 *
 * Usage:
 *   node scripts/digitalizar-cards.mjs --json <review.json> [--preview] [--limit N] [--only pickId,pickId]
 *   node scripts/digitalizar-cards.mjs --files "public/cards/a.png,public/cards/b.png" [--preview]
 *
 * --preview writes to /tmp/digitalizar-preview/<safe-name>.png and never touches originals.
 * Without --preview the source PNG is overwritten in place (git history is the backup).
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const NOW_W = 531;
const NOW_H = 648;
const MIN_PAD = 22;

const INK_THRESHOLD = 238; // a pixel is "ink" if any RGB channel < this
const LOGO_ZONE = { topFrac: 0.0, bottomFrac: 0.16, leftFrac: 0.8, rightFrac: 1.0 };
/** Category-card frame decorations (coloured arcs in corners). */
const FRAME_CORNER_ZONES = [
  { topFrac: 0.0, bottomFrac: 0.14, leftFrac: 0.0, rightFrac: 0.22 },
  { topFrac: 0.0, bottomFrac: 0.14, leftFrac: 0.78, rightFrac: 1.0 },
];
const FRAME_INSET_FRAC = 0.04; // crop this off every edge first to drop a colour frame

function parseArgs(argv) {
  const args = { preview: false, limit: Infinity, only: null, json: null, files: null };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--preview") args.preview = true;
    else if (a === "--limit") args.limit = Number(argv[++i]);
    else if (a === "--only") args.only = new Set(argv[++i].split(","));
    else if (a === "--json") args.json = argv[++i];
    else if (a === "--files") args.files = argv[++i].split(",");
  }
  return args;
}

function publicPathFromUrl(root, url) {
  return path.join(root, "public", decodeURIComponent(url));
}

function isInk(data, idx) {
  return (
    data[idx] < INK_THRESHOLD ||
    data[idx + 1] < INK_THRESHOLD ||
    data[idx + 2] < INK_THRESHOLD
  );
}

/**
 * Analyse a flattened RGB raw buffer and return the illustration crop box.
 * Removes logo zone, an outer frame inset, and a separated bottom title band.
 */
function findIllustrationBox(data, width, height) {
  const inset = Math.round(Math.min(width, height) * FRAME_INSET_FRAC);
  const x0 = inset;
  const x1 = width - inset;
  const y0 = inset;
  const y1 = height - inset;

  // Logo already painted white before detection; keep zone excluded as belt-and-braces.
  const logoTop = Math.round(height * LOGO_ZONE.topFrac);
  const logoBottom = Math.round(height * LOGO_ZONE.bottomFrac);
  const logoLeft = Math.round(width * LOGO_ZONE.leftFrac);
  const logoRight = Math.round(width * LOGO_ZONE.rightFrac);

  const inLogo = (x, y) =>
    y >= logoTop && y < logoBottom && x >= logoLeft && x < logoRight;

  // Row ink counts inside the inset region, ignoring the logo zone.
  const rowInk = new Array(height).fill(0);
  for (let y = y0; y < y1; y++) {
    let count = 0;
    for (let x = x0; x < x1; x++) {
      if (inLogo(x, y)) continue;
      if (isInk(data, (y * width + x) * 3)) count++;
    }
    rowInk[y] = count;
  }

  const rowThreshold = Math.max(2, Math.round((x1 - x0) * 0.004));
  const inkedRow = (y) => rowInk[y] > rowThreshold;

  // Topmost / bottommost inked rows.
  let top = y0;
  while (top < y1 && !inkedRow(top)) top++;
  let bottom = y1 - 1;
  while (bottom > top && !inkedRow(bottom)) bottom--;

  // Strip a thin colour/black FRAME line touching an edge: if the first inked
  // band from an edge is thin (< 4% of size) and followed by a white gap, skip it.
  const thinBand = Math.round(height * 0.04);
  const minFrameGap = Math.max(2, Math.round(height * 0.008));
  // top
  {
    let b = top;
    while (b < bottom && inkedRow(b)) b++;
    if (b - top < thinBand) {
      let g = b;
      while (g < bottom && !inkedRow(g)) g++;
      if (g - b >= minFrameGap) top = g;
    }
  }
  // bottom
  {
    let b = bottom;
    while (b > top && inkedRow(b)) b--;
    if (bottom - b < thinBand) {
      let g = b;
      while (g > top && !inkedRow(g)) g--;
      if (b - g >= minFrameGap) bottom = g;
    }
  }

  // Iteratively strip short bottom bands (title text, footers, shadows): while
  // the lowest inked block is short (< 22% H), sits in the bottom region and has
  // a white gap above it, drop it. Stops at the tall illustration block.
  const minGap = Math.round(height * 0.015);
  const gapSearchStart = Math.round(height * 0.5);
  const maxBandH = height * 0.22;
  for (let guard = 0; guard < 6; guard++) {
    let blockTop = bottom;
    while (blockTop > top && inkedRow(blockTop)) blockTop--;
    const blockH = bottom - blockTop;
    if (blockTop <= gapSearchStart || blockH >= maxBandH) {
      if (process.env.DIG_DEBUG) {
        console.log(`    title-stop blockTop=${blockTop} blkH=${blockH}`);
      }
      break;
    }
    let gap = 0;
    let g = blockTop;
    while (g > top && !inkedRow(g)) {
      gap++;
      g--;
    }
    if (gap < minGap || g <= top) {
      if (process.env.DIG_DEBUG) {
        console.log(`    title-nogap blockTop=${blockTop} gap=${gap}`);
      }
      break;
    }
    if (process.env.DIG_DEBUG) {
      console.log(`    title-cut blockTop=${blockTop} blkH=${blockH} gap=${gap} -> bottom ${bottom}=>${g}`);
    }
    bottom = g; // drop this band and continue scanning upward
  }

  // Column ink counts within [top..bottom], ignoring logo zone.
  const colInk = new Array(width).fill(0);
  for (let x = x0; x < x1; x++) {
    let count = 0;
    for (let yy = top; yy <= bottom; yy++) {
      if (inLogo(x, yy)) continue;
      if (isInk(data, (yy * width + x) * 3)) count++;
    }
    colInk[x] = count;
  }
  const colThreshold = Math.max(2, Math.round((bottom - top + 1) * 0.004));
  const inkedCol = (x) => colInk[x] > colThreshold;
  let left = x0;
  while (left < x1 && !inkedCol(left)) left++;
  let right = x1 - 1;
  while (right > left && !inkedCol(right)) right--;

  // Strip thin vertical FRAME lines on the sides.
  const thinBandW = Math.round(width * 0.04);
  const minFrameGapW = Math.max(2, Math.round(width * 0.008));
  {
    let b = left;
    while (b < right && inkedCol(b)) b++;
    if (b - left < thinBandW) {
      let g = b;
      while (g < right && !inkedCol(g)) g++;
      if (g - b >= minFrameGapW) left = g;
    }
  }
  {
    let b = right;
    while (b > left && inkedCol(b)) b--;
    if (right - b < thinBandW) {
      let g = b;
      while (g > left && !inkedCol(g)) g--;
      if (b - g >= minFrameGapW) right = g;
    }
  }

  if (right <= left || bottom <= top) return null;
  const clampedLeft = Math.max(0, Math.min(left, width - 1));
  const clampedTop = Math.max(0, Math.min(top, height - 1));
  const boxW = Math.max(1, Math.min(right - left + 1, width - clampedLeft));
  const boxH = Math.max(1, Math.min(bottom - top + 1, height - clampedTop));
  return { left: clampedLeft, top: clampedTop, width: boxW, height: boxH };
}

async function paintWhiteZones(srcPath, zones) {
  const meta = await sharp(srcPath).metadata();
  const W = meta.width;
  const H = meta.height;
  const overlays = zones.map((z) => {
    const w = Math.round(W * (z.rightFrac - z.leftFrac));
    const h = Math.round(H * (z.bottomFrac - z.topFrac));
    return sharp({
      create: { width: w, height: h, channels: 3, background: "#ffffff" },
    })
      .png()
      .toBuffer()
      .then((buf) => ({
        input: buf,
        left: Math.round(W * z.leftFrac),
        top: Math.round(H * z.topFrac),
      }));
  });
  const composite = await Promise.all(overlays);
  return sharp(srcPath)
    .flatten({ background: "#ffffff" })
    .composite(composite)
    .png()
    .toBuffer();
}

async function digitalizar(srcPath, destPath) {
  const cleanBuf = await paintWhiteZones(srcPath, [LOGO_ZONE, ...FRAME_CORNER_ZONES]);

  const { data, info } = await sharp(cleanBuf)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const box = findIllustrationBox(data, info.width, info.height);
  if (process.env.DIG_DEBUG) {
    console.log("  src", info.width + "x" + info.height, "box", JSON.stringify(box));
  }
  if (!box) {
    // Fallback: simple trim + fit on the logo-cleaned buffer.
    const fbTrim = await sharp(cleanBuf).trim({ threshold: 12 }).png().toBuffer();
    const fbInner = await sharp(fbTrim)
      .resize(NOW_W - 2 * MIN_PAD, NOW_H - 2 * MIN_PAD, {
        fit: "inside",
        background: "#ffffff",
      })
      .png()
      .toBuffer();
    await sharp({
      create: { width: NOW_W, height: NOW_H, channels: 3, background: "#ffffff" },
    })
      .composite([{ input: fbInner, gravity: "centre" }])
      .png()
      .toFile(destPath);
    return { fallback: true };
  }

  // Crop the illustration from the logo-cleaned buffer.
  const extracted = await sharp(cleanBuf)
    .extract({
      left: box.left,
      top: box.top,
      width: box.width,
      height: box.height,
    })
    .png()
    .toBuffer();
  if (process.env.DIG_DEBUG_DUMP) {
    await sharp(extracted).toFile(process.env.DIG_DEBUG_DUMP);
  }

  // Tighten residual white border, then resize to fit inside the padded card.
  let tightened;
  try {
    tightened = await sharp(extracted).trim({ threshold: 10 }).png().toBuffer();
  } catch {
    tightened = extracted;
  }
  const cropped = await sharp(tightened)
    .resize(NOW_W - 2 * MIN_PAD, NOW_H - 2 * MIN_PAD, {
      fit: "inside",
      background: "#ffffff",
    })
    .png()
    .toBuffer();

  await sharp({
    create: { width: NOW_W, height: NOW_H, channels: 3, background: "#ffffff" },
  })
    .composite([{ input: cropped, gravity: "centre" }])
    .png()
    .toFile(destPath);
  return { box };
}

function safeName(url) {
  return decodeURIComponent(url).replace(/^\/+/, "").replace(/[\/\s&]+/g, "_");
}

async function main() {
  const args = parseArgs(process.argv);
  const root = process.cwd();

  let targets = [];
  if (args.files) {
    targets = args.files.map((f) => ({
      src: path.isAbsolute(f) ? f : path.join(root, f),
      url: f,
    }));
  } else if (args.json) {
    const review = JSON.parse(fs.readFileSync(args.json, "utf8"));
    targets = review.cards
      .filter((c) => c.status === "digitalizar")
      .filter((c) => !args.only || args.only.has(c.pickId))
      .map((c) => ({ src: publicPathFromUrl(root, c.imageUrl), url: c.imageUrl, pickId: c.pickId }));
  } else {
    console.error("Provide --json <file> or --files <list>");
    process.exit(1);
  }

  targets = targets.filter((t) => {
    if (fs.existsSync(t.src)) return true;
    console.warn("SKIP missing:", t.src);
    return false;
  });
  if (Number.isFinite(args.limit)) targets = targets.slice(0, args.limit);

  const previewDir = "/tmp/digitalizar-preview";
  if (args.preview) fs.mkdirSync(previewDir, { recursive: true });

  let ok = 0;
  let fb = 0;
  for (const t of targets) {
    const dest = args.preview
      ? path.join(previewDir, safeName(t.url))
      : t.src;
    try {
      const r = await digitalizar(t.src, dest);
      if (r.fallback) fb++;
      ok++;
      console.log(`${r.fallback ? "FB " : "OK "} ${t.pickId ?? t.url} -> ${dest}`);
    } catch (e) {
      console.error("ERR", t.url, e.message);
    }
  }
  console.log(`\nDone: ${ok} processed (${fb} fallback) of ${targets.length}.`);
  if (args.preview) console.log("Previews in", previewDir);
}

main();

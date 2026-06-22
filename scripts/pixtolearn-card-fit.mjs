/**
 * Fit illustration sources into a fixed PixtoLearn export canvas (531×648).
 * Use for library / batch exports only — schedule UI scales any source with
 * object-contain inside the 531×648 (or 531×663 focus) illustration slot.
 */
import sharp from "sharp";

export const NOW_W = 531;
export const NOW_H = 648;
export const FOCUS_H = 663;

/** Full PixtoLearn WOW designer card frame (744×1054). */
export const WOW_CARD_DESIGN_W = 744;
export const WOW_CARD_DESIGN_H = 1054;
/** White band above illustration in WOW layout. */
export const WOW_TOP_MARGIN_ABOVE_ILLUSTRATION = 135;
/** Centred illustration slot inside WOW card (design px). */
export const WOW_ILLUSTRATION_EXTRACT = {
  left: (WOW_CARD_DESIGN_W - NOW_W) / 2,
  top: WOW_TOP_MARGIN_ABOVE_ILLUSTRATION,
  width: NOW_W,
  height: NOW_H,
};

/** Bundled designer PNG (48/65) — drop title band; keep full illustration width. */
export const BUNDLED_PACK_CARD_INSET = {
  top: 0.095,
  right: 0,
  bottom: 0.19,
  left: 0.01,
};

/** Pack mark on bundled card — top-right corner (fractions of full card). */
export const BUNDLED_PACK_MARK_ON_CARD = {
  top: 0.012,
  right: 0.012,
  size: 0.078,
};

/** Minimum white padding (px) on every side inside the card frame. */
export const MIN_PAD = 36;

/**
 * @param {Buffer | string} src
 * @param {string} dest
 * @param {{
 *   minPad?: number;
 *   trim?: boolean;
 *   trimThreshold?: number;
 *   width?: number;
 *   height?: number;
 *   background?: string;
 *   fit?: "contain" | "cover" | "cover-padded";
 *   position?: string;
 * }} [opts]
 */
export async function fitIllustrationToCard(src, dest, opts = {}) {
  const trimThreshold = opts.trimThreshold ?? 12;
  const width = opts.width ?? NOW_W;
  const height = opts.height ?? NOW_H;
  const background = opts.background ?? "#ffffff";
  const fit = opts.fit ?? "contain";
  let img = sharp(src);

  if (opts.trim !== false) {
    try {
      img = img.trim({ threshold: trimThreshold, background });
    } catch {
      // uniform / tiny images — keep original
    }
  }

  if (fit === "cover") {
    await img
      .resize(width, height, { fit: "cover", position: opts.position ?? "centre" })
      .png()
      .toFile(dest);
    return;
  }

  const minPad = opts.minPad ?? MIN_PAD;
  const maxW = width - 2 * minPad;
  const maxH = height - 2 * minPad;

  if (fit === "cover-padded") {
    const resized = await img
      .resize(maxW, maxH, {
        fit: "cover",
        position: opts.position ?? "north",
      })
      .png()
      .toBuffer();
    await sharp({
      create: { width, height, channels: 3, background },
    })
      .composite([{ input: resized, gravity: "centre" }])
      .png()
      .toFile(dest);
    return;
  }

  const meta = await img.metadata();
  const scale = Math.min(maxW / meta.width, maxH / meta.height);
  const w = Math.round(meta.width * scale);
  const h = Math.round(meta.height * scale);
  const resized = await img.resize(w, h).png().toBuffer();

  await sharp({
    create: { width, height, channels: 3, background },
  })
    .composite([{ input: resized, gravity: "centre" }])
    .png()
    .toFile(dest);
}

/**
 * Trim whitespace only — keeps natural artwork dimensions for UI scaling.
 * @param {Buffer | string} src
 * @param {string} dest
 */
export async function trimIllustrationOnly(src, dest, opts = {}) {
  const trimThreshold = opts.trimThreshold ?? 12;
  const background = opts.background ?? "#ffffff";
  let img = sharp(src);
  try {
    img = img.trim({ threshold: trimThreshold, background });
  } catch {
    // keep original
  }
  await img.png().toFile(dest);
}

/** Designer PNG already framed for PixtoLearn — scale to 531×648, no trim, no extra pad. */
export async function importDesignerIllustration531x648(src, dest, opts = {}) {
  await fitIllustrationToCard(src, dest, {
    width: NOW_W,
    height: NOW_H,
    minPad: 0,
    fit: "contain",
    background: opts.background ?? "#ffffff",
    trim: false,
  });
}

/**
 * Crop the centred 531×648 illustration slot from a full WOW pack card
 * (title band + pack mark above/beside slot are excluded).
 * @param {Buffer | string} src
 * @returns {Promise<Buffer>}
 */
export async function extractWowCardIllustration531x648(src) {
  const meta = await sharp(src).metadata();
  const sx = meta.width / WOW_CARD_DESIGN_W;
  const sy = meta.height / WOW_CARD_DESIGN_H;
  const left = Math.max(0, Math.round(WOW_ILLUSTRATION_EXTRACT.left * sx));
  const top = Math.max(0, Math.round(WOW_ILLUSTRATION_EXTRACT.top * sy));
  const width = Math.min(
    meta.width - left,
    Math.round(WOW_ILLUSTRATION_EXTRACT.width * sx),
  );
  const height = Math.min(
    meta.height - top,
    Math.round(WOW_ILLUSTRATION_EXTRACT.height * sy),
  );

  return sharp(src)
    .extract({ left, top, width, height })
    .resize(NOW_W, NOW_H, { fit: "fill" })
    .png()
    .toBuffer();
}

/**
 * White patch rect for pack mark, only where mark intersects the extract region.
 * @returns {{ left: number; top: number; width: number; height: number } | null}
 */
export function bundledPackMarkPatchRect(fullW, fullH) {
  const inset = BUNDLED_PACK_CARD_INSET;
  const mark = BUNDLED_PACK_MARK_ON_CARD;
  const extractLeft = fullW * inset.left;
  const extractTop = fullH * inset.top;
  const extractW = fullW * (1 - inset.left - inset.right);
  const extractH = fullH * (1 - inset.top - inset.bottom);

  const markSize = fullW * mark.size;
  const markLeft = fullW * (1 - mark.right) - markSize;
  const markTop = fullH * mark.top;
  const markRight = markLeft + markSize;
  const markBottom = markTop + markSize;

  const patchLeft = Math.max(extractLeft, markLeft);
  const patchTop = Math.max(extractTop, markTop);
  const patchRight = Math.min(extractLeft + extractW, markRight);
  const patchBottom = Math.min(extractTop + extractH, markBottom);

  const width = Math.round(patchRight - patchLeft);
  const height = Math.round(patchBottom - patchTop);
  if (width <= 0 || height <= 0) return null;

  return {
    left: Math.round(patchLeft - extractLeft),
    top: Math.round(patchTop - extractTop),
    width,
    height,
  };
}

/**
 * Crop illustration from bundled Pixto pack PNG (core / shower — embedded title strip).
 * Strips title band; tiny logo patch only when mark overlaps the illustration crop.
 * @param {Buffer | string} src
 * @returns {Promise<Buffer>}
 */
export async function extractBundledPackCardIllustration531x648(src) {
  const meta = await sharp(src).metadata();
  const inset = BUNDLED_PACK_CARD_INSET;
  const left = Math.round(meta.width * inset.left);
  const top = Math.round(meta.height * inset.top);
  const width = Math.round(
    meta.width * (1 - inset.left - inset.right),
  );
  const height = Math.round(
    meta.height * (1 - inset.top - inset.bottom),
  );

  let extracted = await sharp(src)
    .extract({ left, top, width, height })
    .png()
    .toBuffer();

  const patchRect = bundledPackMarkPatchRect(meta.width, meta.height);
  if (patchRect) {
    const patch = await sharp({
      create: {
        width: patchRect.width,
        height: patchRect.height,
        channels: 3,
        background: "#ffffff",
      },
    })
      .png()
      .toBuffer();

    extracted = await sharp(extracted)
      .composite([{ input: patch, left: patchRect.left, top: patchRect.top }])
      .png()
      .toBuffer();
  }

  return extracted;
}

/** WOW pack card → illustration-only 531×648 PNG. */
export async function importWowPackCardIllustration531x648(src, dest, opts = {}) {
  const extracted = await extractWowCardIllustration531x648(src);
  await importDesignerIllustration531x648(extracted, dest, opts);
}

/** Bundled pack card (core/shower) → illustration-only 531×648 PNG. */
export async function importBundledPackCardIllustration531x648(src, dest, opts = {}) {
  const extracted = await extractBundledPackCardIllustration531x648(src);
  await importDesignerIllustration531x648(extracted, dest, opts);
}

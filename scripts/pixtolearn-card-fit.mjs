/**
 * Fit illustration sources into PixtoLearn card canvas (531×648).
 * Keeps the subject inside the yellow block with safe margins (no edge clipping).
 */
import sharp from "sharp";

export const NOW_W = 531;
export const NOW_H = 648;
export const FOCUS_H = 663;

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
 * }} [opts]
 */
export async function fitIllustrationToCard(src, dest, opts = {}) {
  const minPad = opts.minPad ?? MIN_PAD;
  const trimThreshold = opts.trimThreshold ?? 12;
  const width = opts.width ?? NOW_W;
  const height = opts.height ?? NOW_H;
  const background = opts.background ?? "#ffffff";
  let img = sharp(src);

  if (opts.trim !== false) {
    try {
      img = img.trim({ threshold: trimThreshold, background });
    } catch {
      // uniform / tiny images — keep original
    }
  }

  const meta = await img.metadata();
  const maxW = width - 2 * minPad;
  const maxH = height - 2 * minPad;
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

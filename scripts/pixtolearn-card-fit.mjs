/**
 * Fit illustration sources into PixtoLearn card canvas (531×648).
 * Keeps the subject inside the yellow block with safe margins (no edge clipping).
 */
import sharp from "sharp";

export const NOW_W = 531;
export const NOW_H = 648;

/** Minimum white padding (px) on every side inside the 531×648 frame. */
export const MIN_PAD = 36;

/**
 * @param {Buffer | string} src
 * @param {string} dest
 * @param {{ minPad?: number; trim?: boolean; trimThreshold?: number }} [opts]
 */
export async function fitIllustrationToCard(src, dest, opts = {}) {
  const minPad = opts.minPad ?? MIN_PAD;
  const trimThreshold = opts.trimThreshold ?? 12;
  let img = sharp(src);

  if (opts.trim !== false) {
    try {
      img = img.trim({ threshold: trimThreshold, background: "#ffffff" });
    } catch {
      // uniform / tiny images — keep original
    }
  }

  const meta = await img.metadata();
  const maxW = NOW_W - 2 * minPad;
  const maxH = NOW_H - 2 * minPad;
  const scale = Math.min(maxW / meta.width, maxH / meta.height);
  const w = Math.round(meta.width * scale);
  const h = Math.round(meta.height * scale);
  const resized = await img.resize(w, h).png().toBuffer();

  await sharp({
    create: { width: NOW_W, height: NOW_H, channels: 3, background: "#ffffff" },
  })
    .composite([{ input: resized, gravity: "centre" }])
    .png()
    .toFile(dest);
}

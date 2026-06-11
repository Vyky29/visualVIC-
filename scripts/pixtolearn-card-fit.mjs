/**
 * Fit illustration sources into PixtoLearn card canvas (531×648).
 * Keeps the subject inside the yellow block with safe margins (no edge clipping).
 */
import sharp from "sharp";

export const NOW_W = 531;
export const NOW_H = 648;

/** Max fraction of the frame the trimmed subject may occupy (after centre composite). */
export const SAFE_FRAC = 0.82;

/**
 * @param {Buffer | string} src
 * @param {string} dest
 * @param {{ safeFrac?: number; trim?: boolean; trimThreshold?: number }} [opts]
 */
export async function fitIllustrationToCard(src, dest, opts = {}) {
  const safeFrac = opts.safeFrac ?? SAFE_FRAC;
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
  const scale =
    Math.min(NOW_W / meta.width, NOW_H / meta.height) * safeFrac;
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

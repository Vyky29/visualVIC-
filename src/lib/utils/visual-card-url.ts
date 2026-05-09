/** True for PixtoLearn PNGs served from `/public/cards/...` (embedded title strip on asset). */
export function isPixtoLearnBundledCardUrl(url: string | undefined): boolean {
  if (!url) return false;
  return url.includes("/cards/");
}

/**
 * Bundled card art reads slightly right of geometric center with `object-cover` + `object-center`.
 * Nudge horizontal anchor so the illustration/title strip look balanced in the frame.
 */
export const pixtoBundledCardObjectPositionClass = "object-[53%_center]";

/** Same horizontal nudge with top anchor (e.g. home previews that crop from the bottom). */
export const pixtoBundledCardObjectPositionTopClass = "object-[53%_top]";

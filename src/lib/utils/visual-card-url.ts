/** True for PixtoLearn PNGs served from `/public/cards/...` (embedded title strip on asset). */
export function isPixtoLearnBundledCardUrl(url: string | undefined): boolean {
  if (!url) return false;
  return url.includes("/cards/");
}

/**
 * Stock library PNGs (`/images/library*`) — centred contain fit, white field.
 * Used in Library tiles and routine shells that reference the shared asset folders.
 */
export function isPixtoLearnLibraryStockImageUrl(
  url: string | undefined,
): boolean {
  if (!url) return false;
  const u = url.toLowerCase();
  if (u.includes("/references/")) return false;
  return (
    u.includes("/images/library-3d-gym/") ||
    u.includes("/images/library-3d/") ||
    u.includes("/images/library/")
  );
}

/**
 * Object-only item cards (Ikram items, Emmanuel icons, etc.) — centred contain, no zoom crop.
 */
export function isPixtoLearnItemObjectCardUrl(
  url: string | undefined,
): boolean {
  if (!url) return false;
  const u = url.toLowerCase();
  return u.includes("/items/") || u.includes("/icons/");
}

/**
 * Illustration-only assets (531×648) for HTML `GeneratedPixtoCard` shells — participant
 * scenes, focus variants, library stock, etc. Must use `object-contain`, not cover crop.
 */
export function isPixtoLearnIllustrationOnlyUrl(url: string | undefined): boolean {
  if (!url) return false;
  const u = url.toLowerCase();
  return (
    u.includes("/scenes/") ||
    u.includes("/scenes-2d/") ||
    u.includes("/cards/day centre/general/") ||
    u.includes("/cards/day%20centre/general/") ||
    u.includes("/cards/day centre/timi/") ||
    u.includes("/cards/day%20centre/timi/") ||
    u.includes("/cards/core/finish3d.png") ||
    isPixtoLearnItemObjectCardUrl(url) ||
    isPixtoLearnLibraryStockImageUrl(url)
  );
}

/** Schedule / Focus contain zoom — skip full WOW pack cards and tall object items. */
export function shouldApplyDigitalIllustrationContainZoom(
  url: string | undefined,
): boolean {
  if (!url) return false;
  if (isPixtoLearnFullBleedCardUrl(url)) return false;
  if (isPixtoLearnItemObjectCardUrl(url)) return false;
  return isPixtoLearnIllustrationOnlyUrl(url);
}

/** Full designer PNG cards with embedded title strip — thumbnails may cover-crop. */
export function isPixtoLearnFullBleedCardUrl(url: string | undefined): boolean {
  return isPixtoLearnBundledCardUrl(url) && !isPixtoLearnIllustrationOnlyUrl(url);
}

/**
 * Bundled card art reads slightly right of geometric center with `object-cover` + `object-center`.
 * Nudge horizontal anchor so the illustration/title strip look balanced in the frame.
 */
export const pixtoBundledCardObjectPositionClass = "object-[53%_center]";

/** Same horizontal nudge with top anchor (e.g. home previews that crop from the bottom). */
export const pixtoBundledCardObjectPositionTopClass = "object-[53%_top]";

/**
 * Home / library grid thumbnails — crop top-right pack mark and bottom title band
 * from bundled designer PNGs (744×1054). Percentages match GeneratedPixto layout.
 */
export const pixtoBundledCardThumbnailClipPath =
  "inset(9% 12% 19% 1% round 0px)" as const;

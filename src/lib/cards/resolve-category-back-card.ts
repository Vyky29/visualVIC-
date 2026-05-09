/**
 * Maps a step's front card URL to the PixtoLearn category back card
 * (transition feedback — not a generic cover).
 */

const CORE_FALLBACK = "/cards/core/1_backcard1.png";

export function resolveCategoryBackCardUrl(imageUrl?: string): string {
  if (!imageUrl) return CORE_FALLBACK;
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return CORE_FALLBACK;
  }
  const path = imageUrl.split("?")[0] ?? imageUrl;

  if (path.includes("/cards/brushing-teeth/")) {
    return "/cards/brushing-teeth/backcard3.png";
  }
  if (path.includes("/cards/climbing/")) {
    return "/cards/climbing/1_backcard5.png";
  }
  if (path.includes("/cards/shower/")) {
    return "/cards/shower/1_backcard4.png";
  }
  if (path.includes("getting-dress")) {
    return "/cards/getting-dress-&-undress/1_backcard2.png";
  }
  if (path.includes("/cards/core/")) {
    return "/cards/core/1_backcard1.png";
  }

  return CORE_FALLBACK;
}

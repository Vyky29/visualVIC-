/**
 * Maps a step's front card URL to the PixtoLearn category back card
 * (transition feedback — not a generic cover).
 */

import { coreBackCardUrl } from "@/lib/cards/core-cards";
import { gettingDressUndressBackCardUrl } from "@/lib/cards/getting-dress-undress-cards";

const CORE_FALLBACK = coreBackCardUrl();

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
    return gettingDressUndressBackCardUrl();
  }
  if (path.includes("/cards/core/")) {
    return coreBackCardUrl();
  }

  return CORE_FALLBACK;
}

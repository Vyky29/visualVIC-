/**
 * Maps a step's front card URL to the PixtoLearn category back card
 * (transition feedback — not a generic cover).
 */

import type { RoutineStep } from "@/lib/types/routine";
import { climbingBackCardUrl } from "@/lib/cards/climbing-cards";
import { coreBackCardUrl } from "@/lib/cards/core-cards";
import { showerBackCardUrl } from "@/lib/cards/shower-cards";
import { gettingDressUndressBackCardUrl } from "@/lib/cards/getting-dress-undress-cards";
import { atTheAirportBackCardUrl } from "@/lib/cards/at-the-airport-cards";
import { dayCentreBackCardUrl } from "@/lib/cards/day-centre-cards";
import { physicalBackCardUrl } from "@/lib/cards/physical-cards";
import { tailoredSchedulesBackCardUrl } from "@/lib/cards/tailored-schedules-shared";
import { atTheHotelBackCardUrl } from "@/lib/cards/at-the-hotel-cards";
import { stepCardVisualTone } from "@/lib/utils/routine-accent";

const CORE_FALLBACK = coreBackCardUrl();

export function resolveCategoryBackCardUrl(
  imageUrl?: string,
): string | undefined {
  if (!imageUrl) return CORE_FALLBACK;
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return CORE_FALLBACK;
  }
  const path = imageUrl.split("?")[0] ?? imageUrl;

  if (path.includes("at%20the%20airport")) {
    return atTheAirportBackCardUrl();
  }
  if (path.includes("at%20the%20hotel")) {
    return atTheHotelBackCardUrl();
  }
  if (path.includes("day%20centre")) {
    if (path.includes("/ikram") || path.includes("/serine") || path.includes("/ayaan")) {
      return tailoredSchedulesBackCardUrl();
    }
    return dayCentreBackCardUrl();
  }
  if (
    path.includes("/images/library/") ||
    path.includes("/images/library-3d") ||
    path.includes("/cards/physical/")
  ) {
    return physicalBackCardUrl();
  }

  if (path.includes("/cards/brushing-teeth/")) {
    return "/cards/brushing-teeth/backcard3.png";
  }
  if (path.includes("/cards/climbing/")) {
    return climbingBackCardUrl();
  }
  if (path.includes("/cards/shower/")) {
    return showerBackCardUrl();
  }
  if (path.includes("getting-dress")) {
    return gettingDressUndressBackCardUrl();
  }
  if (path.includes("/cards/core/")) {
    return coreBackCardUrl();
  }

  return CORE_FALLBACK;
}

export function resolveCategoryBackCardUrlForStep(
  step?: RoutineStep | null,
): string | undefined {
  if (!step) return CORE_FALLBACK;
  switch (stepCardVisualTone(step)) {
    case "finish":
      return undefined;
    case "brushing":
      return "/cards/brushing-teeth/backcard3.png";
    case "shower":
      return showerBackCardUrl();
    case "climbing":
      return climbingBackCardUrl();
    case "dress":
      return gettingDressUndressBackCardUrl();
    case "airport":
      return atTheAirportBackCardUrl();
    case "hotel":
      return atTheHotelBackCardUrl();
    case "daycentre":
      return dayCentreBackCardUrl();
    case "tailored":
      return tailoredSchedulesBackCardUrl();
    case "physical":
      return physicalBackCardUrl();
    case "core":
    case "swimming":
    case "custom":
    case "default":
    default:
      return resolveCategoryBackCardUrl(step.imageUrl);
  }
}

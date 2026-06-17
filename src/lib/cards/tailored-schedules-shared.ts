/**
 * Tailored schedules — participant-specific routines (Ikram pilot + future).
 */

const TAILORED_DIR_SEG = encodeURIComponent("tailored schedules");

export const TAILORED_SCHEDULES_PUBLIC_DIR = `/cards/${TAILORED_DIR_SEG}` as const;

/** Pink ribbon — tailored / participant schedules (distinct from Day Centre red). */
export const TAILORED_SCHEDULES_CATEGORY_COLOUR = "#E05C9A" as const;

export const TAILORED_SCHEDULES_CATEGORY_LABEL = "Tailored schedules" as const;

export function tailoredSchedulesPackMarkUrl(): string {
  return `${TAILORED_SCHEDULES_PUBLIC_DIR}/logo-tailored.png`;
}

/** Alpha silhouette of `logo-tailored.png` — use with CSS `mask-image` + `categoryColour`. */
export function tailoredSchedulesPackMarkMaskUrl(): string {
  return `${TAILORED_SCHEDULES_PUBLIC_DIR}/logo-tailored-mask.png`;
}

export function tailoredSchedulesPackMarkTintMaskUrl(
  packMarkUrl: string,
): string {
  return isTailoredSchedulesPackMarkUrl(packMarkUrl)
    ? tailoredSchedulesPackMarkMaskUrl()
    : packMarkUrl;
}

export function tailoredSchedulesBackCardUrl(): string {
  return `${TAILORED_SCHEDULES_PUBLIC_DIR}/backcard-tailored.png`;
}

/** Navy tailored back — Ayaan & Emmanuel (`#1E4A73`). */
export function tailoredSchedulesNavyBackCardUrl(): string {
  return `${TAILORED_SCHEDULES_PUBLIC_DIR}/backcard-tailored-navy.png`;
}

const TAILORED_NAVY_CATEGORY_COLOUR = "#1E4A73";

function normalizeCategoryHex(colour?: string): string {
  return colour?.trim().toUpperCase() ?? "";
}

export function tailoredSchedulesBackCardUrlForCategoryColour(
  categoryColour?: string,
): string {
  const normalized = normalizeCategoryHex(categoryColour);
  if (
    normalized === TAILORED_NAVY_CATEGORY_COLOUR ||
    normalized === "#143D66"
  ) {
    return tailoredSchedulesNavyBackCardUrl();
  }
  return tailoredSchedulesBackCardUrl();
}

/** Shared cards icon — tint in UI with each pack's `categoryColour`. */
export function isTailoredSchedulesPackMarkUrl(url: string | undefined): boolean {
  if (!url) return false;
  const u = url.toLowerCase();
  return (
    u.includes("logo-tailored") ||
    u.includes("logo-day-centre-ikram") ||
    u.includes("logo-day-centre-serine")
  );
}

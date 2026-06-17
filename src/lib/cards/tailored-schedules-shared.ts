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

export function tailoredSchedulesBackCardUrl(): string {
  return `${TAILORED_SCHEDULES_PUBLIC_DIR}/backcard-tailored.png`;
}

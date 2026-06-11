/** Shared Day Centre pack constants (pink ribbon). */

const DAY_CENTRE_DIR_SEG = encodeURIComponent("day centre");

export const DAY_CENTRE_PUBLIC_DIR = `/cards/${DAY_CENTRE_DIR_SEG}`;

export const DAY_CENTRE_GENERAL_DIR = `${DAY_CENTRE_PUBLIC_DIR}/general` as const;
export const DAY_CENTRE_IKRAM_DIR = `${DAY_CENTRE_PUBLIC_DIR}/ikram` as const;

/** Pink ribbon — Day Centre (hotel pack uses red #8C1E2E). */
export const DAY_CENTRE_CATEGORY_COLOUR = "#E05C9A" as const;

export function dayCentrePackMarkUrl(): string {
  return `${DAY_CENTRE_PUBLIC_DIR}/logo-day-centre.png`;
}

/** Ikram 3D cartoon avatar (32, pink) — profile + pack mark fallback. */
export function dayCentreIkramAvatarUrl(): string {
  return "/avatars/ikram-cartoon.png";
}

/** Ikram 3D cartoon variant (32, leopard print). */
export function dayCentreIkramAvatarLeopardUrl(): string {
  return "/avatars/ikram-cartoon-leopard.png";
}

export function dayCentreIkramPackMarkUrl(): string {
  return `${DAY_CENTRE_PUBLIC_DIR}/logo-day-centre-ikram.png`;
}

export function dayCentreBackCardUrl(): string {
  return `${DAY_CENTRE_PUBLIC_DIR}/backcard-day-centre.png`;
}

export function dayCentreGeneralImageUrl(slug: string): string {
  return `${DAY_CENTRE_GENERAL_DIR}/${slug}.png`;
}

export function dayCentreIkramImageUrl(slug: string): string {
  return `${DAY_CENTRE_IKRAM_DIR}/${slug}.png`;
}

/** Ikram scene illustration — Now/Next (531×648). */
export function dayCentreIkramSceneUrl(slug: string): string {
  return `${DAY_CENTRE_IKRAM_DIR}/scenes/${slug}.png`;
}

/** Ikram scene illustration — Focus mode (531×663). */
export function dayCentreIkramSceneFocusUrl(slug: string): string {
  return `${DAY_CENTRE_IKRAM_DIR}/scenes/${slug}-focus.png`;
}

/** Shared Day Centre pack constants (red ribbon). */

import { tailoredSchedulesPackMarkUrl } from "@/lib/cards/tailored-schedules-shared";

const DAY_CENTRE_DIR_SEG = encodeURIComponent("day centre");

export const DAY_CENTRE_PUBLIC_DIR = `/cards/${DAY_CENTRE_DIR_SEG}`;

export const DAY_CENTRE_GENERAL_DIR = `${DAY_CENTRE_PUBLIC_DIR}/general` as const;
export const DAY_CENTRE_IKRAM_DIR = `${DAY_CENTRE_PUBLIC_DIR}/ikram` as const;
export const DAY_CENTRE_SERINE_DIR = `${DAY_CENTRE_PUBLIC_DIR}/serine` as const;
export const DAY_CENTRE_AYAAN_DIR = `${DAY_CENTRE_PUBLIC_DIR}/ayaan` as const;
export const DAY_CENTRE_EMMANUEL_DIR = `${DAY_CENTRE_PUBLIC_DIR}/emmanuel` as const;

/** Red ribbon — Day Centre (distinct from hotel burgundy #8C1E2E). */
export const DAY_CENTRE_CATEGORY_COLOUR = "#E53935" as const;

export function dayCentrePackMarkUrl(): string {
  return `${DAY_CENTRE_PUBLIC_DIR}/logo-day-centre.png`;
}

/** Hub room photo — Library accordion icon for Day centre section. */
export function dayCentreHubRoomImageUrl(): string {
  return `${DAY_CENTRE_PUBLIC_DIR}/hub-room.png`;
}

/** Ikram library icon — pink sweatshirt + black cat on sofa. */
export function dayCentreIkramAvatarUrl(): string {
  return "/avatars/ikram-library.png";
}

/** Home · Tailored schedules — 3D face close-up (fills tile). */
export function dayCentreIkramTailoredHomeAvatarUrl(): string {
  return "/avatars/ikram-cartoon-home.png";
}

/** Library pack accordion — same 3D face close-ups, fill the icon square. */
export function dayCentreIkramLibraryPackIconUrl(): string {
  return dayCentreIkramTailoredHomeAvatarUrl();
}

/** Ikram 3D cartoon variant (32, leopard print). */
export function dayCentreIkramAvatarLeopardUrl(): string {
  return "/avatars/ikram-cartoon-leopard.png";
}

/** Ikram 2D close-up — leopard print, white background. */
export function dayCentreIkramAvatarLeopard2dUrl(): string {
  return "/avatars/ikram-cartoon-leopard-2d.png";
}

export function dayCentreIkramPackMarkUrl(): string {
  return tailoredSchedulesPackMarkUrl();
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

/** Serine portrait — white background, black studio mat removed. */
export function dayCentreSerineAvatarUrl(): string {
  return "/avatars/serine-cartoon.png";
}

/** Home · Tailored schedules — 3D face close-up (fills tile). */
export function dayCentreSerineTailoredHomeAvatarUrl(): string {
  return "/avatars/serine-cartoon-home.png";
}

/** Serine 2D close-up — card pack marks / legacy. */
export function dayCentreSerineLibraryAvatarUrl(): string {
  return "/avatars/serine-cartoon-2d.png";
}

/** Library pack accordion — 3D face close-up, fill icon square. */
export function dayCentreSerineLibraryPackIconUrl(): string {
  return dayCentreSerineTailoredHomeAvatarUrl();
}

/** Alias when explicit 3D cartoon art ships. */
export function dayCentreSerineAvatar3dUrl(): string {
  return dayCentreSerineAvatarUrl();
}

export function dayCentreSerinePackMarkUrl(): string {
  return tailoredSchedulesPackMarkUrl();
}

export function dayCentreAyaanPackMarkUrl(): string {
  return tailoredSchedulesPackMarkUrl();
}

export function dayCentreEmmanuelPackMarkUrl(): string {
  return tailoredSchedulesPackMarkUrl();
}

export function dayCentreSerineImageUrl(slug: string): string {
  return `${DAY_CENTRE_SERINE_DIR}/${slug}.png`;
}

export function dayCentreSerineSceneUrl(slug: string): string {
  return `${DAY_CENTRE_SERINE_DIR}/scenes/${slug}.png`;
}

export function dayCentreSerineSceneFocusUrl(slug: string): string {
  return `${DAY_CENTRE_SERINE_DIR}/scenes/${slug}-focus.png`;
}

/** Ayaan 3D cartoon avatar — pack mark on schedule cards. */
export function dayCentreAyaanAvatarUrl(): string {
  return "/avatars/ayaan-cartoon.png";
}

/** Home · Tailored schedules — 3D face close-up (fills tile). */
export function dayCentreAyaanTailoredHomeAvatarUrl(): string {
  return "/avatars/ayaan-cartoon-home.png";
}

/** Ayaan 2D close-up — card pack marks / legacy. */
export function dayCentreAyaanLibraryAvatarUrl(): string {
  return "/avatars/ayaan-cartoon-2d.png";
}

/** Library pack accordion — 3D face close-up, fill icon square. */
export function dayCentreAyaanLibraryPackIconUrl(): string {
  return dayCentreAyaanTailoredHomeAvatarUrl();
}

export function dayCentreAyaanImageUrl(slug: string): string {
  return `${DAY_CENTRE_AYAAN_DIR}/${slug}.png`;
}

export function dayCentreAyaanSceneUrl(slug: string): string {
  return `${DAY_CENTRE_AYAAN_DIR}/scenes/${slug}.png`;
}

export function dayCentreAyaanSceneFocusUrl(slug: string): string {
  return `${DAY_CENTRE_AYAAN_DIR}/scenes/${slug}-focus.png`;
}

/** Emmanuel 3D cartoon avatar — pack mark on schedule cards. */
export function dayCentreEmmanuelAvatarUrl(): string {
  return "/avatars/emmanuel-cartoon.png";
}

/** Home · Tailored schedules — 3D face close-up (fills tile). */
export function dayCentreEmmanuelTailoredHomeAvatarUrl(): string {
  return "/avatars/emmanuel-cartoon-home.png";
}

/** Emmanuel 2D close-up — card pack marks / legacy. */
export function dayCentreEmmanuelLibraryAvatarUrl(): string {
  return "/avatars/emmanuel-cartoon-2d.png";
}

/** Library pack accordion — 3D face close-up, fill icon square. */
export function dayCentreEmmanuelLibraryPackIconUrl(): string {
  return dayCentreEmmanuelTailoredHomeAvatarUrl();
}

export function dayCentreEmmanuelImageUrl(slug: string): string {
  return `${DAY_CENTRE_EMMANUEL_DIR}/${slug}.png`;
}

export function dayCentreEmmanuelSceneUrl(slug: string): string {
  return `${DAY_CENTRE_EMMANUEL_DIR}/scenes/${slug}.png`;
}

export function dayCentreEmmanuelSceneFocusUrl(slug: string): string {
  return `${DAY_CENTRE_EMMANUEL_DIR}/scenes/${slug}-focus.png`;
}

/** Square 3D face crops — Home tailored tiles + Library pack headers. */
export function isDayCentreTailoredPackIconUrl(url: string): boolean {
  return url.includes("/avatars/") && url.endsWith("-cartoon-home.png");
}

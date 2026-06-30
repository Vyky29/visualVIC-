/** Shared Day Centre pack constants (red ribbon). */

import { tailoredSchedulesPackMarkUrl } from "@/lib/cards/tailored-schedules-shared";

const DAY_CENTRE_DIR_SEG = encodeURIComponent("day centre");

export const DAY_CENTRE_PUBLIC_DIR = `/cards/${DAY_CENTRE_DIR_SEG}`;

export const DAY_CENTRE_GENERAL_DIR = `${DAY_CENTRE_PUBLIC_DIR}/general` as const;
export const DAY_CENTRE_IKRAM_DIR = `${DAY_CENTRE_PUBLIC_DIR}/ikram` as const;
export const DAY_CENTRE_IKRAM_ITEMS_DIR =
  `${DAY_CENTRE_IKRAM_DIR}/items` as const;
export const DAY_CENTRE_SERINE_DIR = `${DAY_CENTRE_PUBLIC_DIR}/serine` as const;
export const DAY_CENTRE_AYAAN_DIR = `${DAY_CENTRE_PUBLIC_DIR}/ayaan` as const;
export const DAY_CENTRE_EMMANUEL_DIR = `${DAY_CENTRE_PUBLIC_DIR}/emmanuel` as const;
export const DAY_CENTRE_CYRUS_DIR = `${DAY_CENTRE_PUBLIC_DIR}/cyrus` as const;
export const DAY_CENTRE_FADI_DIR = `${DAY_CENTRE_PUBLIC_DIR}/fadi` as const;
export const DAY_CENTRE_TIMI_DIR = `${DAY_CENTRE_PUBLIC_DIR}/timi` as const;

/** Red ribbon — Day Centre (distinct from hotel burgundy #8C1E2E). */
export const DAY_CENTRE_CATEGORY_COLOUR = "#E53935" as const;

export function dayCentrePackMarkUrl(): string {
  return `${DAY_CENTRE_PUBLIC_DIR}/logo-day-centre.png`;
}

/** Hub room illustration — Home tile + Day centre section icon (2D flat style). */
export function dayCentreHubRoomImageUrl(): string {
  return `${DAY_CENTRE_PUBLIC_DIR}/hub-room-2d.png`;
}

/** Ikram library icon — pink sweatshirt + black cat on sofa. */
export function dayCentreIkramAvatarUrl(): string {
  return "/avatars/ikram-library.png";
}

/** Home · Tailored schedules — 2D face portrait (white background). */
export function dayCentreIkramTailoredHomeAvatarUrl(): string {
  return dayCentreIkramAvatarLeopard2dUrl();
}

/** Library pack accordion — 3D face close-up, fill icon square. */
export function dayCentreIkramLibraryPackIconUrl(): string {
  return dayCentreIkramAvatarLeopardUrl();
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

/** Ikram · items routine — object-only illustrations (`ikram/items/`). */
export function dayCentreIkramItemsImageUrl(slug: string): string {
  return `${DAY_CENTRE_IKRAM_ITEMS_DIR}/${slug}.png`;
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

/** Home · Tailored schedules — 2D face portrait (white background). */
export function dayCentreSerineTailoredHomeAvatarUrl(): string {
  return dayCentreSerineLibraryAvatarUrl();
}

/** Serine 2D close-up — card pack marks / legacy. */
export function dayCentreSerineLibraryAvatarUrl(): string {
  return "/avatars/serine-cartoon-2d.png";
}

/** Library pack accordion — 3D face close-up, fill icon square. */
export function dayCentreSerineLibraryPackIconUrl(): string {
  return dayCentreSerineAvatarUrl();
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

/** Home · Tailored schedules — 2D face portrait (white background). */
export function dayCentreAyaanTailoredHomeAvatarUrl(): string {
  return dayCentreAyaanLibraryAvatarUrl();
}

/** Ayaan 2D close-up — card pack marks / legacy. */
export function dayCentreAyaanLibraryAvatarUrl(): string {
  return "/avatars/ayaan-cartoon-2d.png";
}

/** Library pack accordion — 3D face close-up, fill icon square. */
export function dayCentreAyaanLibraryPackIconUrl(): string {
  return dayCentreAyaanAvatarUrl();
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

/** Home · Tailored schedules — 2D face portrait (white background). */
export function dayCentreEmmanuelTailoredHomeAvatarUrl(): string {
  return dayCentreEmmanuelLibraryAvatarUrl();
}

/** Emmanuel 2D close-up — card pack marks / legacy. */
export function dayCentreEmmanuelLibraryAvatarUrl(): string {
  return "/avatars/emmanuel-cartoon-2d.png";
}

/** Library pack accordion — 3D face close-up, fill icon square. */
export function dayCentreEmmanuelLibraryPackIconUrl(): string {
  return dayCentreEmmanuelAvatarUrl();
}

export function dayCentreEmmanuelImageUrl(slug: string): string {
  return `${DAY_CENTRE_EMMANUEL_DIR}/${slug}.png`;
}

export function dayCentreEmmanuelIconUrl(slug: string): string {
  return `${DAY_CENTRE_EMMANUEL_DIR}/icons/${slug}.png`;
}

export function dayCentreEmmanuelSceneUrl(slug: string): string {
  return `${DAY_CENTRE_EMMANUEL_DIR}/scenes/${slug}.png`;
}

export function dayCentreEmmanuelSceneFocusUrl(slug: string): string {
  return `${DAY_CENTRE_EMMANUEL_DIR}/scenes/${slug}-focus.png`;
}

export function dayCentreEmmanuelScene2dUrl(slug: string): string {
  return `${DAY_CENTRE_EMMANUEL_DIR}/scenes-2d/${slug}.png`;
}

export function dayCentreEmmanuelScene2dFocusUrl(slug: string): string {
  return `${DAY_CENTRE_EMMANUEL_DIR}/scenes-2d/${slug}-focus.png`;
}

export function dayCentreCyrusPackMarkUrl(): string {
  return tailoredSchedulesPackMarkUrl();
}

export function dayCentreCyrusAvatarUrl(): string {
  return "/avatars/cyrus-cartoon.png";
}

/** Home · Tailored schedules — 2D face portrait. */
export function dayCentreCyrusTailoredHomeAvatarUrl(): string {
  return "/avatars/cyrus-cartoon-2d.png";
}

/** Library pack accordion — 3D face close-up, fill icon square. */
export function dayCentreCyrusLibraryPackIconUrl(): string {
  return dayCentreCyrusAvatarUrl();
}

export function dayCentreCyrusSceneUrl(slug: string): string {
  return `${DAY_CENTRE_CYRUS_DIR}/scenes/${slug}.png`;
}

export function dayCentreCyrusSceneFocusUrl(slug: string): string {
  return `${DAY_CENTRE_CYRUS_DIR}/scenes/${slug}-focus.png`;
}

export function dayCentreCyrusScene2dUrl(slug: string): string {
  return `${DAY_CENTRE_CYRUS_DIR}/scenes-2d/${slug}.png`;
}

export function dayCentreCyrusScene2dFocusUrl(slug: string): string {
  return `${DAY_CENTRE_CYRUS_DIR}/scenes-2d/${slug}-focus.png`;
}

export function dayCentreTimiPackMarkUrl(): string {
  return tailoredSchedulesPackMarkUrl();
}

export function dayCentreTimiAvatarUrl(): string {
  return "/avatars/timi-cartoon.png";
}

/** Home · Tailored schedules — 2D face portrait. */
export function dayCentreTimiTailoredHomeAvatarUrl(): string {
  return "/avatars/timi-cartoon-2d.png";
}

/** Library pack accordion — 3D face close-up, fill icon square. */
export function dayCentreTimiLibraryPackIconUrl(): string {
  return dayCentreTimiAvatarUrl();
}

export function dayCentreFadiPackMarkUrl(): string {
  return tailoredSchedulesPackMarkUrl();
}

export function dayCentreFadiAvatarUrl(): string {
  return "/avatars/fadi-cartoon.png";
}

/** Home · Tailored schedules — 2D face portrait. */
export function dayCentreFadiTailoredHomeAvatarUrl(): string {
  return "/avatars/fadi-cartoon-2d.png";
}

/** Library pack accordion — 3D face close-up, fill icon square. */
export function dayCentreFadiLibraryPackIconUrl(): string {
  return dayCentreFadiAvatarUrl();
}

export function dayCentreFadiSceneUrl(slug: string): string {
  return `${DAY_CENTRE_FADI_DIR}/scenes/${slug}.png`;
}

export function dayCentreFadiImageUrl(slug: string): string {
  return `${DAY_CENTRE_FADI_DIR}/${slug}.png`;
}

export function dayCentreFadiSceneFocusUrl(slug: string): string {
  return `${DAY_CENTRE_FADI_DIR}/scenes/${slug}-focus.png`;
}

export function dayCentreFadiEmotionUrl(slug: string): string {
  return `${DAY_CENTRE_FADI_DIR}/emotions/${slug}.png`;
}

export function dayCentreTimiImageUrl(slug: string): string {
  return `${DAY_CENTRE_TIMI_DIR}/${slug}.png`;
}

/** Square 2D avatars — Home · Tailored schedules tiles only. */
export function isDayCentreTailoredPackIconUrl(url: string): boolean {
  return (
    url.includes("/avatars/") &&
    (url.endsWith("-cartoon-2d.png") ||
      url.endsWith("-cartoon-leopard-2d.png") ||
      url.endsWith("-cartoon-home.png"))
  );
}

/** 3D participant avatars — Library tailored folder headers. */
export function isDayCentreTailoredParticipantLibraryIconUrl(
  url: string,
): boolean {
  return (
    url.includes("/avatars/") &&
    (url.endsWith("-cartoon.png") ||
      url.endsWith("-cartoon-leopard.png"))
  );
}

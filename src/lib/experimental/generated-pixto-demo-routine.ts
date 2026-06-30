import type { GeneratedPixtoCardProps } from "@/components/experimental/GeneratedPixtoCard";
import type { RoutineStep } from "@/lib/types/routine";
import {
  AT_THE_AIRPORT_SEQUENCE,
  atTheAirportImageUrl,
  atTheAirportPackMarkUrl,
} from "@/lib/cards/at-the-airport-cards";
import {
  DAY_CENTRE_COMMUNITY_SCHEDULE_SEQUENCE,
  DAY_CENTRE_COMMUNITY_MARKET_SEQUENCE,
  DAY_CENTRE_COMMUNITY_PARK_SEQUENCE,
  DAY_CENTRE_COOKING_SCHEDULE_SEQUENCE,
  DAY_CENTRE_COOKING_PREP_SEQUENCE,
  DAY_CENTRE_COOKING_BAKE_SEQUENCE,
  DAY_CENTRE_GENERAL_SCHEDULE_SEQUENCE,
  DAY_CENTRE_GENERAL_SEQUENCE,
  DAY_CENTRE_MINI_GYM_SCHEDULE_SEQUENCE,
  DAY_CENTRE_MINI_GYM_WARMUP_SEQUENCE,
  DAY_CENTRE_MINI_GYM_CARDIO_SEQUENCE,
  DAY_CENTRE_MINI_GYM_STRENGTH_SEQUENCE,
  DAY_CENTRE_MINI_GYM_3D_FITNESS_SEQUENCE,
  DAY_CENTRE_MINI_GYM_3D_WARMUP_SEQUENCE,
  DAY_CENTRE_MINI_GYM_3D_CARDIO_SEQUENCE,
  DAY_CENTRE_MINI_GYM_3D_STRENGTH_SEQUENCE,
  DAY_CENTRE_MIXED_SCHEDULE_SEQUENCE,
  dayCentreGeneralImageUrlForStep,
  type DayCentreGeneralStep,
} from "@/lib/cards/day-centre-general-cards";
import {
  DAY_CENTRE_BOULDERING_SCHEDULE_SEQUENCE,
  DAY_CENTRE_BOULDERING_PREP_SEQUENCE,
  DAY_CENTRE_BOULDERING_WALL_SEQUENCE,
  dayCentreBoulderingImageUrlForStep,
  type DayCentreBoulderingStep,
} from "@/lib/cards/day-centre-bouldering-cards";
import {
  DAY_CENTRE_PREMIUM_DRESS_SEQUENCE,
  DAY_CENTRE_PREMIUM_SHOWER_SEQUENCE,
  DAY_CENTRE_PREMIUM_SWIM_SEQUENCE,
  dayCentrePremiumPickImageUrl,
  type DayCentrePremiumPickSpec,
} from "@/lib/cards/day-centre-premium-cards";
import { showerImageUrl } from "@/lib/cards/shower-cards";
import {
  CORE_CATEGORY_COLOUR,
  CORE_CATEGORY_LABEL,
} from "@/lib/cards/core-cards";
import {
  PHYSICAL_2D_CATEGORY_LABEL,
  PHYSICAL_3D_CATEGORY_LABEL,
  PHYSICAL_3D_GYM_CATEGORY_LABEL,
  PHYSICAL_2D_LIBRARY_SEQUENCE,
  PHYSICAL_3D_GYM_SEQUENCE,
  PHYSICAL_3D_LIBRARY_SEQUENCE,
  PHYSICAL_CATEGORY_COLOUR,
  PHYSICAL_CATEGORY_LABEL,
  PHYSICAL_SCHEDULE_SEQUENCE,
  physical3dGymImageUrlForStep,
  physical3dImageUrlForStep,
  physicalBackCardUrl,
  physicalImageUrlForScheduleStep,
  physicalImageUrlForStep,
  physicalPackMarkUrl,
  type PhysicalScheduleStep,
} from "@/lib/cards/physical-cards";
import {
  DAY_CENTRE_IKRAM_LIBRARY_SEQUENCE,
  DAY_CENTRE_IKRAM_DAY_CENTRE_SEQUENCE,
  DAY_CENTRE_IKRAM_SCHEDULE_SEQUENCE,
  DAY_CENTRE_IKRAM_MON_WED_FRI_SCHEDULE_SEQUENCE,
  DAY_CENTRE_IKRAM_ITEMS_SEQUENCE,
  DAY_CENTRE_IKRAM_ITEMS_LIBRARY_SEQUENCE,
  DAY_CENTRE_IKRAM_MON_WED_FRI_ITEMS_SEQUENCE,
  DAY_CENTRE_IKRAM_TUESDAY_ITEMS_SEQUENCE,
  DAY_CENTRE_IKRAM_CARD_CATEGORY_LABEL,
  dayCentreIkramDailyAvatarFocusImageUrlForStep,
  dayCentreIkramDailyAvatarImageUrlForStep,
  dayCentreIkramDailyItemsImageUrlForStep,
  dayCentreIkramFocusImageUrlForStep,
  dayCentreIkramImageUrlForStep,
  dayCentreIkramScheduleFocusImageUrlForStep,
  dayCentreIkramMonWedFriScheduleFocusImageUrlForStep,
  dayCentreIkramMonWedFriScheduleImageUrlForStep,
  dayCentreIkramScheduleImageUrlForStep,
  dayCentreIkramPackMarkUrl,
  type DayCentreIkramStep,
  type IkramDailyStep,
} from "@/lib/cards/day-centre-ikram-cards";
import {
  DAY_CENTRE_SERINE_LIBRARY_SEQUENCE,
  DAY_CENTRE_SERINE_SCHEDULE_SEQUENCE,
  DAY_CENTRE_SERINE_MACHINERY_3D_SEQUENCE,
  DAY_CENTRE_SERINE_CARD_CATEGORY_LABEL,
  dayCentreSerineFocusImageUrlForStep,
  dayCentreSerineImageUrlForStep,
  dayCentreSerineScheduleFocusImageUrlForStep,
  dayCentreSerineScheduleImageUrlForStep,
  type DayCentreSerineStep,
} from "@/lib/cards/day-centre-serine-cards";
import {
  DAY_CENTRE_AYAAN_LIBRARY_SEQUENCE,
  DAY_CENTRE_AYAAN_MACHINERY_3D_SEQUENCE,
  DAY_CENTRE_AYAAN_SCHEDULE_SEQUENCE,
  DAY_CENTRE_AYAAN_CARD_CATEGORY_LABEL,
  DAY_CENTRE_AYAAN_MACHINERY_CARD_CATEGORY_LABEL,
  DAY_CENTRE_AYAAN_CATEGORY_COLOUR,
  dayCentreAyaanMachinery3dImageUrlForStep,
  dayCentreAyaanMachinery3dFocusImageUrlForStep,
  dayCentreAyaanFocusImageUrlForStep,
  dayCentreAyaanImageUrlForStep,
  dayCentreAyaanScheduleFocusImageUrlForStep,
  dayCentreAyaanScheduleImageUrlForStep,
  dayCentreAyaanPackMarkUrl,
  type DayCentreAyaanMachineryStep,
  type DayCentreAyaanStep,
} from "@/lib/cards/day-centre-ayaan-cards";
import {
  DAY_CENTRE_CYRUS_LIBRARY_SEQUENCE,
  DAY_CENTRE_CYRUS_SCHEDULE_SEQUENCE,
  DAY_CENTRE_CYRUS_CARD_CATEGORY_LABEL,
  DAY_CENTRE_CYRUS_CATEGORY_COLOUR,
  dayCentreCyrusFocusImageUrlForStep,
  dayCentreCyrusImageUrlForStep,
  dayCentreCyrusScheduleFocusImageUrlForStep,
  dayCentreCyrusScheduleImageUrlForStep,
  dayCentreCyrusPackMarkUrl,
  type DayCentreCyrusStep,
} from "@/lib/cards/day-centre-cyrus-cards";
import {
  DAY_CENTRE_TIMI_LIBRARY_SEQUENCE,
  DAY_CENTRE_TIMI_SCHEDULE_SEQUENCE,
  DAY_CENTRE_TIMI_CARD_CATEGORY_LABEL,
  DAY_CENTRE_TIMI_CATEGORY_COLOUR,
  dayCentreTimiFocusImageUrlForStep,
  dayCentreTimiImageUrlForStep,
  dayCentreTimiScheduleFocusImageUrlForStep,
  dayCentreTimiScheduleImageUrlForStep,
  dayCentreTimiPackMarkUrl,
  type DayCentreTimiStep,
} from "@/lib/cards/day-centre-timi-cards";
import {
  DAY_CENTRE_FADI_LIBRARY_SEQUENCE,
  DAY_CENTRE_FADI_ITEMS_LIBRARY_SEQUENCE,
  DAY_CENTRE_FADI_SCHEDULE_SEQUENCE,
  DAY_CENTRE_FADI_ITEMS_SCHEDULE_SEQUENCE,
  DAY_CENTRE_FADI_CARD_CATEGORY_LABEL,
  DAY_CENTRE_FADI_CATEGORY_COLOUR,
  dayCentreFadiFocusImageUrlForStep,
  dayCentreFadiImageUrlForStep,
  dayCentreFadiScheduleFocusImageUrlForStep,
  dayCentreFadiScheduleImageUrlForStep,
  dayCentreFadiPackMarkUrl,
  type DayCentreFadiStep,
} from "@/lib/cards/day-centre-fadi-cards";
import {
  DAY_CENTRE_EMMANUEL_AVATAR_SEQUENCE,
  DAY_CENTRE_EMMANUEL_AVATAR_DAILY_SEQUENCE,
  DAY_CENTRE_EMMANUEL_DAILY_SEQUENCE,
  DAY_CENTRE_EMMANUEL_ITEMS_DAILY_SEQUENCE,
  DAY_CENTRE_EMMANUEL_GYM_AVATAR_SEQUENCE,
  DAY_CENTRE_EMMANUEL_GYM_ITEMS_SEQUENCE,
  DAY_CENTRE_EMMANUEL_ICON_SEQUENCE,
  DAY_CENTRE_EMMANUEL_LIBRARY_SEQUENCE,
  DAY_CENTRE_EMMANUEL_CARD_CATEGORY_LABEL,
  DAY_CENTRE_EMMANUEL_CATEGORY_COLOUR,
  dayCentreEmmanuelDailyAvatarFocusImageUrlForStep,
  dayCentreEmmanuelDailyAvatarImageUrlForStep,
  dayCentreEmmanuelDailyItemsImageUrlForStep,
  dayCentreEmmanuelFocusImageUrlForStep,
  dayCentreEmmanuelImageUrlForStep,
  dayCentreEmmanuelLibrary2dFocusImageUrlForStep,
  dayCentreEmmanuelLibrary2dImageUrlForStep,
  dayCentreEmmanuelPackMarkUrl,
  type DayCentreEmmanuelStep,
  type EmmanuelDailyStep,
} from "@/lib/cards/day-centre-emmanuel-cards";
import {
  DAY_CENTRE_CATEGORY_COLOUR,
  dayCentrePackMarkUrl,
  dayCentreSerinePackMarkUrl,
} from "@/lib/cards/day-centre-shared";
import {
  TAILORED_SCHEDULES_CATEGORY_COLOUR,
} from "@/lib/cards/tailored-schedules-shared";
import {
  tailoredItems3dImageUrlForStep,
  type TailoredItems3dStep,
} from "@/lib/cards/tailored-items-3d-shared";
import {
  AT_THE_HOTEL_SEQUENCE,
  atTheHotelImageUrl,
  atTheHotelPackMarkUrl,
} from "@/lib/cards/at-the-hotel-cards";

/** Fallback if a pack logo fails to load — `public/brand/pixtolearn-logo.png`. */
export const GENERATED_PIXTO_COLOUR_MARK_FALLBACK_URL =
  "/brand/pixtolearn-logo.png" as const;

/** Airport category accent — ribbon + schedule chrome. */
export const GENERATED_PIXTO_AIRPORT_CATEGORY_COLOUR = "#F9DD9E" as const;

/** Hotel category accent — ribbon + schedule chrome. */
export const GENERATED_PIXTO_HOTEL_CATEGORY_COLOUR = "#8C1E2E" as const;

/** Day Centre category accent — red ribbon + schedule chrome. */
export const GENERATED_PIXTO_DAY_CENTRE_CATEGORY_COLOUR =
  DAY_CENTRE_CATEGORY_COLOUR;

/** Tailored schedules category accent — pink ribbon + schedule chrome. */
export const GENERATED_PIXTO_TAILORED_SCHEDULES_CATEGORY_COLOUR =
  TAILORED_SCHEDULES_CATEGORY_COLOUR;

function lc(s: string): string {
  return s.toLowerCase();
}

/** Every airport step PNG (order from {@link AT_THE_AIRPORT_SEQUENCE}). */
export const AIRPORT_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  AT_THE_AIRPORT_SEQUENCE.map((s) => ({
    illustrationUrl: atTheAirportImageUrl(s.slug),
    title: lc(s.title),
    category: lc("At the airport"),
    categoryColour: GENERATED_PIXTO_AIRPORT_CATEGORY_COLOUR,
    iconUrl: atTheAirportPackMarkUrl(),
  }));

/** Every hotel step PNG (order from {@link AT_THE_HOTEL_SEQUENCE}). */
export const HOTEL_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  AT_THE_HOTEL_SEQUENCE.map((s) => ({
    illustrationUrl: atTheHotelImageUrl(s.slug),
    title: lc(s.title),
    category: lc("At the hotel"),
    categoryColour: GENERATED_PIXTO_HOTEL_CATEGORY_COLOUR,
    iconUrl: atTheHotelPackMarkUrl(),
  }));

/** Slugs borrowed from Core pack — grey ribbon inside Day centre routines. */
const DAY_CENTRE_CORE_BORROWED_SLUGS = new Set(["wash-hands"]);

function dayCentreGeneralGeneratedCardProps(
  s: DayCentreGeneralStep,
): GeneratedPixtoCardProps {
  const shared = {
    illustrationUrl: dayCentreGeneralImageUrlForStep(s),
    title: lc(s.title),
    iconUrl: dayCentrePackMarkUrl(),
  };
  if (DAY_CENTRE_CORE_BORROWED_SLUGS.has(s.slug)) {
    return {
      ...shared,
      category: lc(CORE_CATEGORY_LABEL),
      categoryColour: CORE_CATEGORY_COLOUR,
    };
  }
  return {
    ...shared,
    category: lc("At the day centre"),
    categoryColour: GENERATED_PIXTO_DAY_CENTRE_CATEGORY_COLOUR,
  };
}

/** Day Centre · General — illustrated library. */
export const DAY_CENTRE_GENERAL_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_GENERAL_SEQUENCE.map(dayCentreGeneralGeneratedCardProps);

/** Day Centre · General — Saturday schedule routine (photo 1). */
export const DAY_CENTRE_GENERAL_SCHEDULE_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_GENERAL_SCHEDULE_SEQUENCE.map(dayCentreGeneralGeneratedCardProps);

export const DAY_CENTRE_MINI_GYM_SCHEDULE_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_MINI_GYM_SCHEDULE_SEQUENCE.map(dayCentreGeneralGeneratedCardProps);

function dayCentreItems3dGeneratedCardProps(
  step: TailoredItems3dStep,
  category: string,
  categoryColour: string,
  iconUrl: string,
): GeneratedPixtoCardProps {
  return {
    illustrationUrl: tailoredItems3dImageUrlForStep(step),
    title: lc(step.title),
    category: lc(category),
    categoryColour,
    iconUrl,
  };
}

function dayCentreMiniGym3dGeneratedCardProps(step: TailoredItems3dStep) {
  return dayCentreItems3dGeneratedCardProps(
    step,
    PHYSICAL_3D_CATEGORY_LABEL,
    PHYSICAL_CATEGORY_COLOUR,
    dayCentrePackMarkUrl(),
  );
}

/** Mini gym · 3D — full fitness library on disk. */
export const DAY_CENTRE_MINI_GYM_3D_SCHEDULE_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_MINI_GYM_3D_FITNESS_SEQUENCE.map(dayCentreMiniGym3dGeneratedCardProps);

export const DAY_CENTRE_MINI_GYM_WARMUP_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_MINI_GYM_WARMUP_SEQUENCE.map(dayCentreGeneralGeneratedCardProps);

export const DAY_CENTRE_MINI_GYM_CARDIO_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_MINI_GYM_CARDIO_SEQUENCE.map(dayCentreGeneralGeneratedCardProps);

export const DAY_CENTRE_MINI_GYM_STRENGTH_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_MINI_GYM_STRENGTH_SEQUENCE.map(dayCentreGeneralGeneratedCardProps);

/** Mini gym · 3D warm-up — therapy ball, mat, bands, BOSU. */
export const DAY_CENTRE_MINI_GYM_3D_WARMUP_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_MINI_GYM_3D_WARMUP_SEQUENCE.map(dayCentreMiniGym3dGeneratedCardProps);

export const DAY_CENTRE_MINI_GYM_3D_CARDIO_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_MINI_GYM_3D_CARDIO_SEQUENCE.map(dayCentreMiniGym3dGeneratedCardProps);

export const DAY_CENTRE_MINI_GYM_3D_STRENGTH_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_MINI_GYM_3D_STRENGTH_SEQUENCE.map(dayCentreMiniGym3dGeneratedCardProps);

export const DAY_CENTRE_COOKING_SCHEDULE_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_COOKING_SCHEDULE_SEQUENCE.map(dayCentreGeneralGeneratedCardProps);

export const DAY_CENTRE_COOKING_PREP_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_COOKING_PREP_SEQUENCE.map(dayCentreGeneralGeneratedCardProps);

export const DAY_CENTRE_COOKING_BAKE_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_COOKING_BAKE_SEQUENCE.map(dayCentreGeneralGeneratedCardProps);

export const DAY_CENTRE_COMMUNITY_SCHEDULE_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_COMMUNITY_SCHEDULE_SEQUENCE.map(dayCentreGeneralGeneratedCardProps);

export const DAY_CENTRE_COMMUNITY_MARKET_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_COMMUNITY_MARKET_SEQUENCE.map(dayCentreGeneralGeneratedCardProps);

export const DAY_CENTRE_COMMUNITY_PARK_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_COMMUNITY_PARK_SEQUENCE.map(dayCentreGeneralGeneratedCardProps);

export const DAY_CENTRE_MIXED_SCHEDULE_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_MIXED_SCHEDULE_SEQUENCE.map(dayCentreGeneralGeneratedCardProps);

export const DAY_CENTRE_BOULDERING_SCHEDULE_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_BOULDERING_SCHEDULE_SEQUENCE.map((s) => ({
    illustrationUrl: dayCentreBoulderingImageUrlForStep(s),
    title: lc(s.title),
    category: lc("At the day centre"),
    categoryColour: GENERATED_PIXTO_DAY_CENTRE_CATEGORY_COLOUR,
    iconUrl: dayCentrePackMarkUrl(),
  }));

function boulderingGeneratedCardProps(
  sequence: readonly DayCentreBoulderingStep[],
): GeneratedPixtoCardProps[] {
  return sequence.map((s) => ({
    illustrationUrl: dayCentreBoulderingImageUrlForStep(s),
    title: lc(s.title),
    category: lc("At the day centre"),
    categoryColour: GENERATED_PIXTO_DAY_CENTRE_CATEGORY_COLOUR,
    iconUrl: dayCentrePackMarkUrl(),
  }));
}

export const DAY_CENTRE_BOULDERING_PREP_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  boulderingGeneratedCardProps(DAY_CENTRE_BOULDERING_PREP_SEQUENCE);

export const DAY_CENTRE_BOULDERING_WALL_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  boulderingGeneratedCardProps(DAY_CENTRE_BOULDERING_WALL_SEQUENCE);

function premiumGeneratedCardProps(
  sequence: readonly DayCentrePremiumPickSpec[],
): GeneratedPixtoCardProps[] {
  return sequence.map((pick) => ({
    illustrationUrl: dayCentrePremiumPickImageUrl(pick),
    title: lc(pick.title),
    category: lc("Day centre · Premium"),
    categoryColour: GENERATED_PIXTO_DAY_CENTRE_CATEGORY_COLOUR,
    iconUrl: showerImageUrl("shampoo"),
  }));
}

export const DAY_CENTRE_PREMIUM_SHOWER_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  premiumGeneratedCardProps(DAY_CENTRE_PREMIUM_SHOWER_SEQUENCE);

export const DAY_CENTRE_PREMIUM_SWIM_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  premiumGeneratedCardProps(DAY_CENTRE_PREMIUM_SWIM_SEQUENCE);

export const DAY_CENTRE_PREMIUM_DRESS_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  premiumGeneratedCardProps(DAY_CENTRE_PREMIUM_DRESS_SEQUENCE);

/** Physical — equipment + stretching (2D library illustrations). */
export const PHYSICAL_2D_LIBRARY_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  PHYSICAL_2D_LIBRARY_SEQUENCE.map((s) => ({
    illustrationUrl: physicalImageUrlForStep(s),
    title: lc(s.title),
    category: lc(PHYSICAL_2D_CATEGORY_LABEL),
    categoryColour: PHYSICAL_CATEGORY_COLOUR,
    iconUrl: physicalPackMarkUrl(),
  }));

/** @deprecated Use {@link PHYSICAL_2D_LIBRARY_GENERATED_CARD_PROPS}. */
export const PHYSICAL_GENERATED_CARD_PROPS = PHYSICAL_2D_LIBRARY_GENERATED_CARD_PROPS;

/** Physical · 3D — soft 3D equipment + sports (`library-3d/`). */
export const PHYSICAL_3D_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  PHYSICAL_3D_LIBRARY_SEQUENCE.map((s) => ({
    illustrationUrl: physical3dImageUrlForStep(s),
    title: lc(s.title),
    category: lc(PHYSICAL_3D_CATEGORY_LABEL),
    categoryColour: PHYSICAL_CATEGORY_COLOUR,
    iconUrl: physicalPackMarkUrl(),
  }));

/** Physical · 3D gym — machines & accessories (`library-3d-gym/`). */
export const PHYSICAL_3D_GYM_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  PHYSICAL_3D_GYM_SEQUENCE.map((s) => ({
    illustrationUrl: physical3dGymImageUrlForStep(s),
    title: lc(s.title),
    category: lc(PHYSICAL_3D_CATEGORY_LABEL),
    categoryColour: PHYSICAL_CATEGORY_COLOUR,
    iconUrl: physicalPackMarkUrl(),
  }));

function physicalScheduleGeneratedCardProps(step: PhysicalScheduleStep) {
  return {
    illustrationUrl: physicalImageUrlForScheduleStep(step),
    title: lc(step.title),
    category: lc(PHYSICAL_CATEGORY_LABEL),
    categoryColour: PHYSICAL_CATEGORY_COLOUR,
    iconUrl: physicalPackMarkUrl(),
  };
}

/** Physical Activity — mixed 2D / 3D / gym schedule for Schedule Player. */
export const PHYSICAL_SCHEDULE_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  PHYSICAL_SCHEDULE_SEQUENCE.map((s) => physicalScheduleGeneratedCardProps(s));

/** @deprecated Use {@link PHYSICAL_GENERATED_CARD_PROPS}. */
export const DAY_CENTRE_FITNESS_GENERATED_CARD_PROPS = PHYSICAL_GENERATED_CARD_PROPS;

/** Tailored schedules · Ikram — full photo library. */
function ikramGeneratedCardProps(step: DayCentreIkramStep) {
  const focusIllustrationUrl = dayCentreIkramFocusImageUrlForStep(step);
  return {
    illustrationUrl: dayCentreIkramImageUrlForStep(step),
    title: lc(step.title),
    category: lc(DAY_CENTRE_IKRAM_CARD_CATEGORY_LABEL),
    categoryColour: GENERATED_PIXTO_TAILORED_SCHEDULES_CATEGORY_COLOUR,
    iconUrl: dayCentreIkramPackMarkUrl(),
    ...(focusIllustrationUrl ? { focusIllustrationUrl } : {}),
  };
}

/** Day Centre · Ikram — personalised library only (no generic object cards). */
export const DAY_CENTRE_IKRAM_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_IKRAM_LIBRARY_SEQUENCE.map((s) => ikramGeneratedCardProps(s));

function ikramDailyItemsGeneratedCardProps(step: IkramDailyStep) {
  return {
    illustrationUrl: dayCentreIkramDailyItemsImageUrlForStep(step),
    title: lc(step.title),
    category: lc(DAY_CENTRE_IKRAM_CARD_CATEGORY_LABEL),
    categoryColour: GENERATED_PIXTO_TAILORED_SCHEDULES_CATEGORY_COLOUR,
    iconUrl: dayCentreIkramPackMarkUrl(),
  };
}

function ikramDailyAvatarGeneratedCardProps(step: IkramDailyStep) {
  const focusIllustrationUrl =
    dayCentreIkramDailyAvatarFocusImageUrlForStep(step);
  return {
    illustrationUrl: dayCentreIkramDailyAvatarImageUrlForStep(step),
    title: lc(step.title),
    category: lc(DAY_CENTRE_IKRAM_CARD_CATEGORY_LABEL),
    categoryColour: GENERATED_PIXTO_TAILORED_SCHEDULES_CATEGORY_COLOUR,
    iconUrl: dayCentreIkramPackMarkUrl(),
    ...(focusIllustrationUrl ? { focusIllustrationUrl } : {}),
  };
}

/** Day Centre · Ikram — day centre schedule (avatar art). */
export const DAY_CENTRE_IKRAM_SCHEDULE_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_IKRAM_DAY_CENTRE_SEQUENCE.map((s) =>
    ikramDailyAvatarGeneratedCardProps(s),
  );

/** Ikram · Day centre — illustrated objects (items routine). */
export const DAY_CENTRE_IKRAM_ITEMS_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_IKRAM_DAY_CENTRE_SEQUENCE.map((s) =>
    ikramDailyItemsGeneratedCardProps(s),
  );

function ikramItemsLibraryGeneratedCardProps(step: TailoredItems3dStep) {
  return {
    illustrationUrl: tailoredItems3dImageUrlForStep(step),
    title: lc(step.title),
    category: lc(DAY_CENTRE_IKRAM_CARD_CATEGORY_LABEL),
    categoryColour: GENERATED_PIXTO_TAILORED_SCHEDULES_CATEGORY_COLOUR,
    iconUrl: dayCentreIkramPackMarkUrl(),
  };
}

/** Ikram library · Items folder — object-only cards. */
export const DAY_CENTRE_IKRAM_ITEMS_LIBRARY_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_IKRAM_ITEMS_LIBRARY_SEQUENCE.map((s) =>
    ikramItemsLibraryGeneratedCardProps(s),
  );

function ikramScheduleGeneratedCardProps(step: DayCentreIkramStep) {
  const focusIllustrationUrl = dayCentreIkramScheduleFocusImageUrlForStep(step);
  return {
    illustrationUrl: dayCentreIkramScheduleImageUrlForStep(step),
    title: lc(step.title),
    category: lc(DAY_CENTRE_IKRAM_CARD_CATEGORY_LABEL),
    categoryColour: GENERATED_PIXTO_TAILORED_SCHEDULES_CATEGORY_COLOUR,
    iconUrl: dayCentreIkramPackMarkUrl(),
    ...(focusIllustrationUrl ? { focusIllustrationUrl } : {}),
  };
}

/** @deprecated Legacy Saturday schedule card props. */
export const DAY_CENTRE_IKRAM_LEGACY_SCHEDULE_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_IKRAM_SCHEDULE_SEQUENCE.map((s) => ikramScheduleGeneratedCardProps(s));

function ikramMonWedFriScheduleGeneratedCardProps(step: DayCentreIkramStep) {
  const focusIllustrationUrl =
    dayCentreIkramMonWedFriScheduleFocusImageUrlForStep(step);
  return {
    illustrationUrl: dayCentreIkramMonWedFriScheduleImageUrlForStep(step),
    title: lc(step.title),
    category: lc(DAY_CENTRE_IKRAM_CARD_CATEGORY_LABEL),
    categoryColour: GENERATED_PIXTO_TAILORED_SCHEDULES_CATEGORY_COLOUR,
    iconUrl: dayCentreIkramPackMarkUrl(),
    ...(focusIllustrationUrl ? { focusIllustrationUrl } : {}),
  };
}

/** Ikram · Mon / Wed / Fri — swimming day (avatar). */
export const DAY_CENTRE_IKRAM_MON_WED_FRI_SCHEDULE_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_IKRAM_MON_WED_FRI_SCHEDULE_SEQUENCE.map((s) =>
    ikramMonWedFriScheduleGeneratedCardProps(s),
  );

/** @deprecated Removed from stock registry. */
export const DAY_CENTRE_IKRAM_MON_WED_FRI_ITEMS_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_IKRAM_MON_WED_FRI_ITEMS_SEQUENCE.map((s) =>
    dayCentreItems3dGeneratedCardProps(
      s,
      DAY_CENTRE_IKRAM_CARD_CATEGORY_LABEL,
      GENERATED_PIXTO_TAILORED_SCHEDULES_CATEGORY_COLOUR,
      dayCentreIkramPackMarkUrl(),
    ),
  );

/** @deprecated Removed from stock registry. */
export const DAY_CENTRE_IKRAM_TUESDAY_ITEMS_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_IKRAM_TUESDAY_ITEMS_SEQUENCE.map((s) =>
    dayCentreItems3dGeneratedCardProps(
      s,
      DAY_CENTRE_IKRAM_CARD_CATEGORY_LABEL,
      GENERATED_PIXTO_TAILORED_SCHEDULES_CATEGORY_COLOUR,
      dayCentreIkramPackMarkUrl(),
    ),
  );

/** Tailored schedules · Serine — physical activity library. */
function serineGeneratedCardProps(step: DayCentreSerineStep) {
  const focusIllustrationUrl = dayCentreSerineFocusImageUrlForStep(step);
  return {
    illustrationUrl: dayCentreSerineImageUrlForStep(step),
    title: lc(step.title),
    category: lc(DAY_CENTRE_SERINE_CARD_CATEGORY_LABEL),
    categoryColour: GENERATED_PIXTO_TAILORED_SCHEDULES_CATEGORY_COLOUR,
    iconUrl: dayCentreSerinePackMarkUrl(),
    ...(focusIllustrationUrl ? { focusIllustrationUrl } : {}),
  };
}

export const DAY_CENTRE_SERINE_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_SERINE_LIBRARY_SEQUENCE.map((s) => serineGeneratedCardProps(s));

function serineScheduleGeneratedCardProps(step: DayCentreSerineStep) {
  const focusIllustrationUrl = dayCentreSerineScheduleFocusImageUrlForStep(step);
  return {
    illustrationUrl: dayCentreSerineScheduleImageUrlForStep(step),
    title: lc(step.title),
    category: lc(DAY_CENTRE_SERINE_CARD_CATEGORY_LABEL),
    categoryColour: GENERATED_PIXTO_TAILORED_SCHEDULES_CATEGORY_COLOUR,
    iconUrl: dayCentreSerinePackMarkUrl(),
    ...(focusIllustrationUrl ? { focusIllustrationUrl } : {}),
  };
}

/** Serine · Physical activity — gym schedule (personalised cartoon scenes). */
export const DAY_CENTRE_SERINE_SCHEDULE_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_SERINE_SCHEDULE_SEQUENCE.map((s) => serineScheduleGeneratedCardProps(s));

/** Serine · Physical activity — 3D gym objects only. */
export const DAY_CENTRE_SERINE_MACHINERY_3D_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_SERINE_MACHINERY_3D_SEQUENCE.map((s) =>
    dayCentreItems3dGeneratedCardProps(
      s,
      PHYSICAL_3D_CATEGORY_LABEL,
      PHYSICAL_CATEGORY_COLOUR,
      dayCentreSerinePackMarkUrl(),
    ),
  );

/** Tailored schedules · Ayaan — physical activity library. */
function ayaanGeneratedCardProps(step: DayCentreAyaanStep) {
  const focusIllustrationUrl = dayCentreAyaanFocusImageUrlForStep(step);
  return {
    illustrationUrl: dayCentreAyaanImageUrlForStep(step),
    title: lc(step.title),
    category: lc(DAY_CENTRE_AYAAN_CARD_CATEGORY_LABEL),
    categoryColour: DAY_CENTRE_AYAAN_CATEGORY_COLOUR,
    iconUrl: dayCentreAyaanPackMarkUrl(),
    ...(focusIllustrationUrl ? { focusIllustrationUrl } : {}),
  };
}

export const DAY_CENTRE_AYAAN_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_AYAAN_LIBRARY_SEQUENCE.map((s) => ayaanGeneratedCardProps(s));

function ayaanScheduleGeneratedCardProps(step: DayCentreAyaanStep) {
  const focusIllustrationUrl = dayCentreAyaanScheduleFocusImageUrlForStep(step);
  return {
    illustrationUrl: dayCentreAyaanScheduleImageUrlForStep(step),
    title: lc(step.title),
    category: lc(DAY_CENTRE_AYAAN_CARD_CATEGORY_LABEL),
    categoryColour: DAY_CENTRE_AYAAN_CATEGORY_COLOUR,
    iconUrl: dayCentreAyaanPackMarkUrl(),
    ...(focusIllustrationUrl ? { focusIllustrationUrl } : {}),
  };
}

/** Ayaan · Physical activity — gym schedule (personalised cartoon scenes). */
export const DAY_CENTRE_AYAAN_SCHEDULE_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_AYAAN_SCHEDULE_SEQUENCE.map((s) => ayaanScheduleGeneratedCardProps(s));

function ayaanMachinery3dGeneratedCardProps(step: DayCentreAyaanMachineryStep) {
  const focusIllustrationUrl = dayCentreAyaanMachinery3dFocusImageUrlForStep(step);
  return {
    illustrationUrl: dayCentreAyaanMachinery3dImageUrlForStep(step),
    title: lc(step.title),
    category: lc(DAY_CENTRE_AYAAN_MACHINERY_CARD_CATEGORY_LABEL),
    categoryColour: DAY_CENTRE_AYAAN_CATEGORY_COLOUR,
    iconUrl: dayCentreAyaanPackMarkUrl(),
    ...(focusIllustrationUrl ? { focusIllustrationUrl } : {}),
  };
}

/** Ayaan · Gym equipment — soft 3D objects only (`library-3d/`). */
export const DAY_CENTRE_AYAAN_MACHINERY_3D_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_AYAAN_MACHINERY_3D_SEQUENCE.map((s) =>
    ayaanMachinery3dGeneratedCardProps(s),
  );

function cyrusGeneratedCardProps(step: DayCentreCyrusStep) {
  const focusIllustrationUrl = dayCentreCyrusFocusImageUrlForStep(step);
  return {
    illustrationUrl: dayCentreCyrusImageUrlForStep(step),
    title: lc(step.title),
    category: lc(DAY_CENTRE_CYRUS_CARD_CATEGORY_LABEL),
    categoryColour: DAY_CENTRE_CYRUS_CATEGORY_COLOUR,
    iconUrl: dayCentreCyrusPackMarkUrl(),
    ...(focusIllustrationUrl ? { focusIllustrationUrl } : {}),
  };
}

export const DAY_CENTRE_CYRUS_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_CYRUS_LIBRARY_SEQUENCE.map((s) => cyrusGeneratedCardProps(s));

function cyrusScheduleGeneratedCardProps(step: DayCentreCyrusStep) {
  const focusIllustrationUrl = dayCentreCyrusScheduleFocusImageUrlForStep(step);
  return {
    illustrationUrl: dayCentreCyrusScheduleImageUrlForStep(step),
    title: lc(step.title),
    category: lc(DAY_CENTRE_CYRUS_CARD_CATEGORY_LABEL),
    categoryColour: DAY_CENTRE_CYRUS_CATEGORY_COLOUR,
    iconUrl: dayCentreCyrusPackMarkUrl(),
    ...(focusIllustrationUrl ? { focusIllustrationUrl } : {}),
  };
}

export const DAY_CENTRE_CYRUS_SCHEDULE_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_CYRUS_SCHEDULE_SEQUENCE.map((s) =>
    cyrusScheduleGeneratedCardProps(s),
  );

function timiGeneratedCardProps(step: DayCentreTimiStep) {
  const focusIllustrationUrl = dayCentreTimiFocusImageUrlForStep(step);
  return {
    illustrationUrl: dayCentreTimiImageUrlForStep(step),
    title: lc(step.title),
    category: lc(DAY_CENTRE_TIMI_CARD_CATEGORY_LABEL),
    categoryColour: DAY_CENTRE_TIMI_CATEGORY_COLOUR,
    iconUrl: dayCentreTimiPackMarkUrl(),
    ...(focusIllustrationUrl ? { focusIllustrationUrl } : {}),
  };
}

export const DAY_CENTRE_TIMI_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_TIMI_LIBRARY_SEQUENCE.map((s) => timiGeneratedCardProps(s));

function timiScheduleGeneratedCardProps(step: DayCentreTimiStep) {
  const focusIllustrationUrl = dayCentreTimiScheduleFocusImageUrlForStep(step);
  return {
    illustrationUrl: dayCentreTimiScheduleImageUrlForStep(step),
    title: lc(step.title),
    category: lc(DAY_CENTRE_TIMI_CARD_CATEGORY_LABEL),
    categoryColour: DAY_CENTRE_TIMI_CATEGORY_COLOUR,
    iconUrl: dayCentreTimiPackMarkUrl(),
    ...(focusIllustrationUrl ? { focusIllustrationUrl } : {}),
  };
}

export const DAY_CENTRE_TIMI_SCHEDULE_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_TIMI_SCHEDULE_SEQUENCE.map((s) =>
    timiScheduleGeneratedCardProps(s),
  );

/** Timi · Day centre (items) — same steps, general library art. */
export const DAY_CENTRE_TIMI_ITEMS_SCHEDULE_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_TIMI_SCHEDULE_GENERATED_CARD_PROPS;

function fadiGeneratedCardProps(step: DayCentreFadiStep) {
  const focusIllustrationUrl = dayCentreFadiFocusImageUrlForStep(step);
  return {
    illustrationUrl: dayCentreFadiImageUrlForStep(step),
    title: lc(step.title),
    category: lc(DAY_CENTRE_FADI_CARD_CATEGORY_LABEL),
    categoryColour: DAY_CENTRE_FADI_CATEGORY_COLOUR,
    iconUrl: dayCentreFadiPackMarkUrl(),
    ...(focusIllustrationUrl ? { focusIllustrationUrl } : {}),
  };
}

export const DAY_CENTRE_FADI_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_FADI_LIBRARY_SEQUENCE.map((s) => fadiGeneratedCardProps(s));

function fadiScheduleGeneratedCardProps(step: DayCentreFadiStep) {
  const focusIllustrationUrl = dayCentreFadiScheduleFocusImageUrlForStep(step);
  return {
    illustrationUrl: dayCentreFadiScheduleImageUrlForStep(step),
    title: lc(step.title),
    category: lc(DAY_CENTRE_FADI_CARD_CATEGORY_LABEL),
    categoryColour: DAY_CENTRE_FADI_CATEGORY_COLOUR,
    iconUrl: dayCentreFadiPackMarkUrl(),
    ...(focusIllustrationUrl ? { focusIllustrationUrl } : {}),
  };
}

export const DAY_CENTRE_FADI_SCHEDULE_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_FADI_SCHEDULE_SEQUENCE.map((s) =>
    fadiScheduleGeneratedCardProps(s),
  );

function fadiItemsLibraryGeneratedCardProps(step: TailoredItems3dStep) {
  return dayCentreItems3dGeneratedCardProps(
    step,
    DAY_CENTRE_FADI_CARD_CATEGORY_LABEL,
    DAY_CENTRE_FADI_CATEGORY_COLOUR,
    dayCentreFadiPackMarkUrl(),
  );
}

export const DAY_CENTRE_FADI_ITEMS_LIBRARY_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_FADI_ITEMS_LIBRARY_SEQUENCE.map((s) =>
    fadiItemsLibraryGeneratedCardProps(s),
  );

function fadiItemsScheduleGeneratedCardProps(step: DayCentreFadiStep) {
  return {
    illustrationUrl: dayCentreFadiImageUrlForStep(step),
    title: lc(step.title),
    category: lc(DAY_CENTRE_FADI_CARD_CATEGORY_LABEL),
    categoryColour: DAY_CENTRE_FADI_CATEGORY_COLOUR,
    iconUrl: dayCentreFadiPackMarkUrl(),
  };
}

export const DAY_CENTRE_FADI_ITEMS_SCHEDULE_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_FADI_ITEMS_SCHEDULE_SEQUENCE.map((s) =>
    fadiItemsScheduleGeneratedCardProps(s),
  );

/** Tailored schedules · Emmanuel — physical activity library. */
function emmanuelLibraryAvatarGeneratedCardProps(step: DayCentreEmmanuelStep) {
  const focusIllustrationUrl = dayCentreEmmanuelFocusImageUrlForStep(step);
  return {
    illustrationUrl: dayCentreEmmanuelImageUrlForStep(step),
    title: lc(step.title),
    category: lc(DAY_CENTRE_EMMANUEL_CARD_CATEGORY_LABEL),
    categoryColour: DAY_CENTRE_EMMANUEL_CATEGORY_COLOUR,
    iconUrl: dayCentreEmmanuelPackMarkUrl(),
    ...(focusIllustrationUrl ? { focusIllustrationUrl } : {}),
  };
}

/** Emmanuel · library Avatar subgroup. */
export const DAY_CENTRE_EMMANUEL_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_EMMANUEL_LIBRARY_SEQUENCE.map((s) =>
    emmanuelLibraryAvatarGeneratedCardProps(s),
  );

function emmanuelLibrary2dGeneratedCardProps(step: DayCentreEmmanuelStep) {
  const focusIllustrationUrl =
    dayCentreEmmanuelLibrary2dFocusImageUrlForStep(step);
  return {
    illustrationUrl: dayCentreEmmanuelLibrary2dImageUrlForStep(step),
    title: lc(step.title),
    category: lc(DAY_CENTRE_EMMANUEL_CARD_CATEGORY_LABEL),
    categoryColour: DAY_CENTRE_EMMANUEL_CATEGORY_COLOUR,
    iconUrl: dayCentreEmmanuelPackMarkUrl(),
    ...(focusIllustrationUrl ? { focusIllustrationUrl } : {}),
  };
}

export const DAY_CENTRE_EMMANUEL_2D_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_EMMANUEL_LIBRARY_SEQUENCE.map((s) =>
    emmanuelLibrary2dGeneratedCardProps(s),
  );

function emmanuelLibraryIconGeneratedCardProps(step: TailoredItems3dStep) {
  return dayCentreItems3dGeneratedCardProps(
    step,
    DAY_CENTRE_EMMANUEL_CARD_CATEGORY_LABEL,
    DAY_CENTRE_EMMANUEL_CATEGORY_COLOUR,
    dayCentreEmmanuelPackMarkUrl(),
  );
}

/** Emmanuel · library Items subgroup. */
export const DAY_CENTRE_EMMANUEL_ICON_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_EMMANUEL_ICON_SEQUENCE.map((s) =>
    emmanuelLibraryIconGeneratedCardProps(s),
  );

function emmanuelDailyItemsGeneratedCardProps(step: EmmanuelDailyStep) {
  return {
    illustrationUrl: dayCentreEmmanuelDailyItemsImageUrlForStep(step),
    title: lc(step.title),
    category: lc(DAY_CENTRE_EMMANUEL_CARD_CATEGORY_LABEL),
    categoryColour: DAY_CENTRE_EMMANUEL_CATEGORY_COLOUR,
    iconUrl: dayCentreEmmanuelPackMarkUrl(),
  };
}

/** Emmanuel · Day centre (items) — Mon/Tue/Wed schedule (object & icon art). */
export const DAY_CENTRE_EMMANUEL_DAILY_ITEMS_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_EMMANUEL_ITEMS_DAILY_SEQUENCE.map((s) =>
    emmanuelDailyItemsGeneratedCardProps(s),
  );

/** @deprecated Use {@link DAY_CENTRE_EMMANUEL_DAILY_ITEMS_GENERATED_CARD_PROPS}. */
export const DAY_CENTRE_EMMANUEL_ITEMS_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_EMMANUEL_DAILY_ITEMS_GENERATED_CARD_PROPS;

/** @deprecated Use {@link DAY_CENTRE_EMMANUEL_DAILY_ITEMS_GENERATED_CARD_PROPS}. */
export const DAY_CENTRE_EMMANUEL_SCHEDULE_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_EMMANUEL_DAILY_ITEMS_GENERATED_CARD_PROPS;

function emmanuelDailyAvatarGeneratedCardProps(step: EmmanuelDailyStep) {
  const focusIllustrationUrl =
    dayCentreEmmanuelDailyAvatarFocusImageUrlForStep(step);
  return {
    illustrationUrl: dayCentreEmmanuelDailyAvatarImageUrlForStep(step),
    title: lc(step.title),
    category: lc(DAY_CENTRE_EMMANUEL_CARD_CATEGORY_LABEL),
    categoryColour: DAY_CENTRE_EMMANUEL_CATEGORY_COLOUR,
    iconUrl: dayCentreEmmanuelPackMarkUrl(),
    ...(focusIllustrationUrl ? { focusIllustrationUrl } : {}),
  };
}

/** Emmanuel · Day centre (avatar) — Mon/Tue/Wed schedule. */
export const DAY_CENTRE_EMMANUEL_DAILY_AVATAR_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_EMMANUEL_AVATAR_DAILY_SEQUENCE.map((s) =>
    emmanuelDailyAvatarGeneratedCardProps(s),
  );

/** @deprecated Use {@link DAY_CENTRE_EMMANUEL_DAILY_AVATAR_GENERATED_CARD_PROPS}. */
export const DAY_CENTRE_EMMANUEL_AVATAR_SCHEDULE_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_EMMANUEL_DAILY_AVATAR_GENERATED_CARD_PROPS;

function emmanuelGymAvatarGeneratedCardProps(step: DayCentreEmmanuelStep) {
  const focusIllustrationUrl = dayCentreEmmanuelFocusImageUrlForStep(step);
  return {
    illustrationUrl: dayCentreEmmanuelImageUrlForStep(step),
    title: lc(step.title),
    category: lc(DAY_CENTRE_EMMANUEL_CARD_CATEGORY_LABEL),
    categoryColour: DAY_CENTRE_EMMANUEL_CATEGORY_COLOUR,
    iconUrl: dayCentreEmmanuelPackMarkUrl(),
    ...(focusIllustrationUrl ? { focusIllustrationUrl } : {}),
  };
}

/** Emmanuel · Gym (avatar) — personalised gym scenes. */
export const DAY_CENTRE_EMMANUEL_GYM_AVATAR_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_EMMANUEL_GYM_AVATAR_SEQUENCE.map((s) =>
    emmanuelGymAvatarGeneratedCardProps(s),
  );

/** Emmanuel · Gym (items) — 3D gym objects only. */
export const DAY_CENTRE_EMMANUEL_GYM_ITEMS_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_EMMANUEL_GYM_ITEMS_SEQUENCE.map((s) =>
    dayCentreItems3dGeneratedCardProps(
      s,
      DAY_CENTRE_EMMANUEL_CARD_CATEGORY_LABEL,
      DAY_CENTRE_EMMANUEL_CATEGORY_COLOUR,
      dayCentreEmmanuelPackMarkUrl(),
    ),
  );

/** @deprecated Use {@link DAY_CENTRE_EMMANUEL_GYM_ITEMS_GENERATED_CARD_PROPS}. */
export const DAY_CENTRE_EMMANUEL_MACHINERY_3D_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  DAY_CENTRE_EMMANUEL_GYM_ITEMS_GENERATED_CARD_PROPS;

/** @deprecated Use {@link DAY_CENTRE_GENERAL_GENERATED_CARD_PROPS}. */
export const DAY_CENTRE_GENERATED_CARD_PROPS = DAY_CENTRE_GENERAL_GENERATED_CARD_PROPS;

/** Full demo sequence (airport → hotel) for `/generated-card-demo` only. */
export const GENERATED_PIXTO_DEMO_ROUTINE_STEPS: GeneratedPixtoCardProps[] = [
  ...AIRPORT_GENERATED_CARD_PROPS,
  ...HOTEL_GENERATED_CARD_PROPS,
];

export const GENERATED_PIXTO_DEMO_ROUTINE_NAME =
  "Airport → hotel (generated cards demo)" as const;

export function routineStepsFromGeneratedCardProps(
  idPrefix: string,
  cards: readonly GeneratedPixtoCardProps[],
): RoutineStep[] {
  return cards.map((c, i) => ({
    id: `${idPrefix}-step-${i}`,
    title: c.title,
    imageUrl: c.illustrationUrl,
    generatedPixto: {
      illustrationUrl: c.illustrationUrl,
      title: c.title,
      category: c.category,
      categoryColour: c.categoryColour,
      iconUrl: c.iconUrl,
      cardType: c.cardType,
      focusIllustrationScale: c.focusIllustrationScale,
      focusIllustrationUrl: c.focusIllustrationUrl,
    },
  }));
}

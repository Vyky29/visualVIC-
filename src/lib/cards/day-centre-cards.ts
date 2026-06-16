/**
 * Day Centre packs — re-exports general (illustrations) + Ikram (photos).
 * @deprecated Import from `day-centre-general-cards` or `day-centre-ikram-cards`.
 */

export {
  DAY_CENTRE_CATEGORY_COLOUR,
  DAY_CENTRE_GENERAL_CARD_FILES,
  DAY_CENTRE_GENERAL_CATEGORY_LABEL,
  DAY_CENTRE_FITNESS_SEQUENCE,
  DAY_CENTRE_GENERAL_SCHEDULE_SEQUENCE,
  DAY_CENTRE_GENERAL_SEQUENCE,
  dayCentreGeneralImageUrlForStep,
  type DayCentreGeneralStep,
} from "@/lib/cards/day-centre-general-cards";

export {
  PHYSICAL_CATEGORY_COLOUR,
  PHYSICAL_CATEGORY_LABEL,
  PHYSICAL_SEQUENCE,
  physicalImageUrl,
  physicalImageUrlForStep,
  type PhysicalStep,
} from "@/lib/cards/physical-cards";

export {
  DAY_CENTRE_IKRAM_CATEGORY_LABEL,
  DAY_CENTRE_IKRAM_GENERIC_ASSET_SLUGS,
  DAY_CENTRE_IKRAM_LIBRARY_SEQUENCE,
  DAY_CENTRE_IKRAM_PECS_GRID_SEQUENCE,
  DAY_CENTRE_IKRAM_SCHEDULE_SEQUENCE,
  DAY_CENTRE_IKRAM_SEQUENCE,
  dayCentreIkramFocusImageUrlForStep,
  dayCentreIkramImageUrlForStep,
  dayCentreIkramScheduleFocusImageUrlForStep,
  dayCentreIkramScheduleImageUrlForStep,
  type DayCentreIkramStep,
} from "@/lib/cards/day-centre-ikram-cards";

export {
  DAY_CENTRE_PUBLIC_DIR,
  dayCentreBackCardUrl,
  dayCentreIkramAvatarLeopardUrl,
  dayCentreIkramAvatarUrl,
  dayCentreIkramPackMarkUrl,
  dayCentreIkramSceneFocusUrl,
  dayCentreIkramSceneUrl,
  dayCentrePackMarkUrl,
} from "@/lib/cards/day-centre-shared";

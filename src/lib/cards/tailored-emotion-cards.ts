/**
 * Tailored participant emotion cards — reusable across packs (happy, …).
 * PNGs live in `public/cards/day centre/{participant}/emotions/{slug}.png`.
 */

import {
  DAY_CENTRE_AYAAN_DIR,
  DAY_CENTRE_CYRUS_DIR,
  DAY_CENTRE_EMMANUEL_DIR,
  DAY_CENTRE_FADI_DIR,
  DAY_CENTRE_IKRAM_DIR,
  DAY_CENTRE_SERINE_DIR,
  DAY_CENTRE_TIMI_DIR,
  dayCentreFadiEmotionUrl,
} from "@/lib/cards/day-centre-shared";
import type { TailoredParticipantId } from "@/lib/routines/tailored-participants";

export type TailoredEmotionSlug = "happy";

export type TailoredEmotionStep = {
  id: string;
  slug: TailoredEmotionSlug;
  title: string;
};

export const TAILORED_EMOTION_SEQUENCE: readonly TailoredEmotionStep[] = [
  { id: "emo-happy", slug: "happy", title: "Happy" },
] as const;

const PARTICIPANT_EMOTION_DIR: Record<TailoredParticipantId, string> = {
  ikram: `${DAY_CENTRE_IKRAM_DIR}/emotions`,
  serine: `${DAY_CENTRE_SERINE_DIR}/emotions`,
  ayaan: `${DAY_CENTRE_AYAAN_DIR}/emotions`,
  emmanuel: `${DAY_CENTRE_EMMANUEL_DIR}/emotions`,
  cyrus: `${DAY_CENTRE_CYRUS_DIR}/emotions`,
  fadi: `${DAY_CENTRE_FADI_DIR}/emotions`,
  timi: `${DAY_CENTRE_TIMI_DIR}/emotions`,
};

/** Scene fallback when emotion PNG not yet on disk (Fadi happy ships in scenes/). */
const PARTICIPANT_EMOTION_SCENE_FALLBACK: Partial<
  Record<TailoredParticipantId, Partial<Record<TailoredEmotionSlug, string>>>
> = {
  fadi: {
    happy: dayCentreFadiEmotionUrl("happy"),
  },
};

export function tailoredParticipantEmotionImageUrl(
  participantId: TailoredParticipantId,
  slug: TailoredEmotionSlug,
): string {
  const fallback = PARTICIPANT_EMOTION_SCENE_FALLBACK[participantId]?.[slug];
  if (fallback) return fallback;
  return `${PARTICIPANT_EMOTION_DIR[participantId]}/${slug}.png`;
}

export function tailoredParticipantEmotionLibrarySteps(
  participantId: TailoredParticipantId,
  idPrefix: string,
): readonly TailoredEmotionStep[] {
  return TAILORED_EMOTION_SEQUENCE.map((step) => ({
    ...step,
    id: `${idPrefix}-${step.slug}`,
  }));
}

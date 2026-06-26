import type { Routine } from "@/lib/types/routine";
import {
  detectTailoredParticipantFromRoutine,
  isTailoredParticipantId,
  TAILORED_PARTICIPANT_STOCK_ROUTINE_IDS,
  type TailoredParticipantId,
} from "@/lib/routines/tailored-participants";

export const TAILORED_PARTICIPANT_TAG_PREFIX = "tailored-participant:" as const;

export function tailoredParticipantTag(
  participantId: TailoredParticipantId,
): string {
  return `${TAILORED_PARTICIPANT_TAG_PREFIX}${participantId}`;
}

export function parseTailoredParticipantTag(
  tags: readonly string[] | undefined,
): TailoredParticipantId | undefined {
  if (!tags) return undefined;
  for (const tag of tags) {
    if (!tag.startsWith(TAILORED_PARTICIPANT_TAG_PREFIX)) continue;
    const id = tag.slice(TAILORED_PARTICIPANT_TAG_PREFIX.length);
    if (isTailoredParticipantId(id)) return id;
  }
  return undefined;
}

export function isTailoredStockScheduleForParticipant(
  routineId: string,
  participantId: TailoredParticipantId,
): boolean {
  return (
    TAILORED_PARTICIPANT_STOCK_ROUTINE_IDS[participantId] as readonly string[]
  ).includes(routineId);
}

export function routineBelongsToTailoredParticipant(
  routine: Routine,
  participantId: TailoredParticipantId,
): boolean {
  if (parseTailoredParticipantTag(routine.tags) === participantId) return true;
  if (isTailoredStockScheduleForParticipant(routine.id, participantId)) {
    return true;
  }
  return detectTailoredParticipantFromRoutine(routine) === participantId;
}

/** Custom / saved schedules — stock packs are read-only here. */
export function canEditTailoredParticipantSchedule(
  routine: Routine,
  participantId: TailoredParticipantId,
): boolean {
  if (isTailoredStockScheduleForParticipant(routine.id, participantId)) {
    return false;
  }
  return routineBelongsToTailoredParticipant(routine, participantId);
}

export function participantLibrarySectionId(
  participantId: TailoredParticipantId,
):
  | "dcikram"
  | "dcserine"
  | "dcayaan"
  | "dcemmanuel"
  | "dccyrus"
  | "dcfadi"
  | "dctimi" {
  switch (participantId) {
    case "ikram":
      return "dcikram";
    case "serine":
      return "dcserine";
    case "ayaan":
      return "dcayaan";
    case "emmanuel":
      return "dcemmanuel";
    case "cyrus":
      return "dccyrus";
    case "fadi":
      return "dcfadi";
    case "timi":
      return "dctimi";
  }
}

export function tailoredParticipantLibraryHref(
  participantId: TailoredParticipantId,
): string {
  const params = new URLSearchParams({
    participant: participantId,
    returnTo: `/tailored/${participantId}`,
  });
  return `/library?${params.toString()}`;
}

export function tailoredParticipantEditScheduleHref(
  participantId: TailoredParticipantId,
  routineId: string,
): string {
  const params = new URLSearchParams({
    edit: routineId,
    participant: participantId,
    returnTo: `/tailored/${participantId}`,
  });
  return `/library/routine-new?${params.toString()}`;
}

export function tailoredParticipantNewScheduleHref(
  participantId: TailoredParticipantId,
): string {
  const params = new URLSearchParams({
    participant: participantId,
    returnTo: `/tailored/${participantId}`,
  });
  return `/library/routine-new?${params.toString()}`;
}

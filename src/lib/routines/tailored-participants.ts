import type { Routine, RoutineStep } from "@/lib/types/routine";
import {
  TAILORED_STOCK_ROUTINE_IDS,
  type TailoredStockRoutineId,
} from "@/lib/routines/resolve-routine-home-preview";
import {
  parseTailoredParticipantTag,
  routineBelongsToTailoredParticipant,
} from "@/lib/routines/tailored-routine-meta";

export const TAILORED_PARTICIPANT_IDS = [
  "ikram",
  "serine",
  "ayaan",
  "emmanuel",
  "cyrus",
  "timi",
] as const;

export type TailoredParticipantId = (typeof TAILORED_PARTICIPANT_IDS)[number];

/** Stock schedules registered per participant — extend as new packs ship. */
export const TAILORED_PARTICIPANT_STOCK_ROUTINE_IDS: Record<
  TailoredParticipantId,
  readonly TailoredStockRoutineId[]
> = {
  ikram: [
    "ikram-mon-wed-fri",
    "ikram-mon-wed-fri-items",
    "ikram-tuesday-items",
    "ikram-day-centre",
    "ikram-day-centre-items",
  ],
  serine: ["serine-day-centre", "serine-gym-equipment-3d"],
  ayaan: ["ayaan-day-centre", "ayaan-gym-equipment-3d"],
  emmanuel: [
    "emmanuel-day-centre",
    "emmanuel-day-centre-items",
    "emmanuel-gym-avatar",
    "emmanuel-gym-equipment-3d",
  ],
  cyrus: ["cyrus-day-centre"],
  timi: ["timi-day-centre"],
};

const STOCK_ROUTINE_TO_PARTICIPANT = Object.fromEntries(
  Object.entries(TAILORED_PARTICIPANT_STOCK_ROUTINE_IDS).flatMap(
    ([participant, routineIds]) =>
      routineIds.map((routineId) => [routineId, participant]),
  ),
) as Record<TailoredStockRoutineId, TailoredParticipantId>;

export function isTailoredParticipantId(
  value: string,
): value is TailoredParticipantId {
  return (TAILORED_PARTICIPANT_IDS as readonly string[]).includes(value);
}

export function tailoredParticipantFromStockRoutineId(
  routineId: string,
): TailoredParticipantId | undefined {
  return STOCK_ROUTINE_TO_PARTICIPANT[routineId as TailoredStockRoutineId];
}

function detectTailoredStockIdFromSteps(
  steps: readonly RoutineStep[],
): TailoredStockRoutineId | undefined {
  const haystack = steps
    .map((s) => `${s.imageUrl ?? ""} ${s.generatedPixto?.illustrationUrl ?? ""}`)
    .join(" ")
    .toLowerCase();
  if (haystack.includes("/ikram")) return "ikram-day-centre";
  if (haystack.includes("/serine")) return "serine-day-centre";
  if (haystack.includes("/ayaan")) return "ayaan-day-centre";
  if (haystack.includes("/emmanuel")) return "emmanuel-day-centre";
  if (haystack.includes("/cyrus")) return "cyrus-day-centre";
  if (haystack.includes("/timi")) return "timi-day-centre";
  return undefined;
}

export function detectTailoredParticipantFromRoutine(
  routine: Routine,
): TailoredParticipantId | undefined {
  const fromStockId = tailoredParticipantFromStockRoutineId(routine.id);
  if (fromStockId) return fromStockId;

  const tailoredStockId = detectTailoredStockIdFromSteps(routine.steps);
  if (!tailoredStockId) return undefined;
  return tailoredParticipantFromStockRoutineId(tailoredStockId);
}

export function tailoredParticipantPickerHref(
  participantOrStockRoutineId: string,
): string {
  if (isTailoredParticipantId(participantOrStockRoutineId)) {
    return `/tailored/${participantOrStockRoutineId}`;
  }
  const participant = tailoredParticipantFromStockRoutineId(
    participantOrStockRoutineId,
  );
  if (participant) return `/tailored/${participant}`;
  return `/player/${participantOrStockRoutineId}`;
}

export function tailoredParticipantDisplayName(
  participantId: TailoredParticipantId,
): string {
  switch (participantId) {
    case "ikram":
      return "Ikram";
    case "serine":
      return "Serine";
    case "ayaan":
      return "Ayaan";
    case "emmanuel":
      return "Emmanuel";
    case "cyrus":
      return "Cyrus";
    case "timi":
      return "Timi";
  }
}

/** All schedules for one participant — stock registry + matching custom routines. */
export function resolveTailoredParticipantSchedules(
  participantId: TailoredParticipantId,
  routines: readonly Routine[],
): Routine[] {
  const stockIds = new Set<string>(
    TAILORED_PARTICIPANT_STOCK_ROUTINE_IDS[participantId],
  );
  const stockOrder = TAILORED_PARTICIPANT_STOCK_ROUTINE_IDS[participantId];
  const byId = new Map<string, Routine>();

  for (const routine of routines) {
    const matchesParticipant =
      stockIds.has(routine.id) ||
      parseTailoredParticipantTag(routine.tags) === participantId ||
      routineBelongsToTailoredParticipant(routine, participantId);
    if (matchesParticipant) byId.set(routine.id, routine);
  }

  const orderedStock = stockOrder
    .map((id) => byId.get(id))
    .filter((r): r is Routine => Boolean(r));

  const extras = [...byId.values()]
    .filter((r) => !stockIds.has(r.id))
    .sort((a, b) => a.name.localeCompare(b.name));

  return [...orderedStock, ...extras];
}

export function isTailoredStockRoutineId(
  routineId: string,
): routineId is TailoredStockRoutineId {
  return (TAILORED_STOCK_ROUTINE_IDS as readonly string[]).includes(routineId);
}

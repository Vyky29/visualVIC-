import type { Routine } from "@/lib/types/routine";

/** Tag applied when staff save a schedule from Planner → Mixed folder. */
export const DAY_CENTRE_MIXED_ROUTINE_TAG = "day-centre-folder:mixed" as const;

export function isDayCentreMixedStaffRoutine(routine: Routine): boolean {
  return routine.tags?.includes(DAY_CENTRE_MIXED_ROUTINE_TAG) ?? false;
}

export function canDeleteDayCentreMixedRoutine(routine: Routine): boolean {
  return isDayCentreMixedStaffRoutine(routine);
}

export function dayCentreMixedEditHref(routineId: string): string {
  const params = new URLSearchParams({ edit: routineId });
  return `/planner/routine-new?${params.toString()}`;
}

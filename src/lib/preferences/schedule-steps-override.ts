import type { RoutineStep } from "@/lib/types/routine";

const STORAGE_PREFIX = "pixtolearn.scheduleStepsOverride.v1.";

function storageKey(routineId: string): string {
  return `${STORAGE_PREFIX}${routineId}`;
}

export function loadScheduleStepsOverride(
  routineId: string,
): RoutineStep[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(storageKey(routineId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return null;
    const steps = parsed.filter(
      (item): item is RoutineStep =>
        Boolean(item) &&
        typeof item === "object" &&
        typeof (item as RoutineStep).id === "string" &&
        typeof (item as RoutineStep).title === "string",
    );
    return steps.length > 0 ? steps : null;
  } catch {
    return null;
  }
}

export function saveScheduleStepsOverride(
  routineId: string,
  steps: readonly RoutineStep[],
): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(storageKey(routineId), JSON.stringify(steps));
  } catch {
    /* quota / private mode */
  }
}

export function clearScheduleStepsOverride(routineId: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(storageKey(routineId));
  } catch {
    /* ignore */
  }
}

/** True when routine lives in device custom storage (not stock mock). */
export function isDeviceCustomRoutineId(
  routineId: string,
  customRoutines: readonly { id: string }[],
): boolean {
  return customRoutines.some((r) => r.id === routineId);
}

export function routineStepsWithoutFinishLike(
  steps: readonly RoutineStep[],
): RoutineStep[] {
  return steps.filter((step) => {
    const id = step.id.trim().toLowerCase();
    const title = step.title.trim().toLowerCase();
    const imageUrl = (step.imageUrl ?? "").toLowerCase();
    return (
      id !== "__playback-finish__" &&
      id !== "core-finish" &&
      title !== "finish" &&
      !imageUrl.endsWith("/cards/core/finish3d.png") &&
      !imageUrl.endsWith("/cards/core/finish.png")
    );
  });
}

import type { Routine } from "@/lib/types/routine";
import { canonicalRoutineId } from "@/lib/routines/legacy-routine-ids";
import { resolveRoutineById } from "@/lib/mock/routines";

export function resolveAnyRoutine(
  id: string,
  customRoutines: readonly Routine[],
): Routine | undefined {
  const canonical = canonicalRoutineId(id);
  return (
    resolveRoutineById(id) ??
    customRoutines.find((r) => r.id === canonical) ??
    customRoutines.find((r) => r.id === id)
  );
}

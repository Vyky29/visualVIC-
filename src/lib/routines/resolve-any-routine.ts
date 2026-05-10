import type { Routine } from "@/lib/types/routine";
import { resolveRoutineById } from "@/lib/mock/routines";

export function resolveAnyRoutine(
  id: string,
  customRoutines: readonly Routine[],
): Routine | undefined {
  return resolveRoutineById(id) ?? customRoutines.find((r) => r.id === id);
}

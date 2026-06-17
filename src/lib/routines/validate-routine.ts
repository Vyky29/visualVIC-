import type { Routine } from "@/lib/types/routine";

export function isValidRoutine(x: unknown): x is Routine {
  if (!x || typeof x !== "object") return false;
  const r = x as Routine;
  return (
    typeof r.id === "string" &&
    typeof r.name === "string" &&
    Array.isArray(r.steps) &&
    r.steps.length > 0 &&
    r.steps.every(
      (s) =>
        s &&
        typeof (s as { id?: string }).id === "string" &&
        typeof (s as { title?: string }).title === "string",
    )
  );
}

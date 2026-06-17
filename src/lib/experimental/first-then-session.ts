import type { GeneratedPixtoCardProps } from "@/components/experimental/GeneratedPixtoCard";

export const FIRST_THEN_SESSION_KEY = "pixtolearn.firstThenSession.v1";

export type FirstThenSessionPayload = {
  first: GeneratedPixtoCardProps;
  second: GeneratedPixtoCardProps;
  routineHref: string;
};

export function writeFirstThenSession(payload: FirstThenSessionPayload): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(FIRST_THEN_SESSION_KEY, JSON.stringify(payload));
  } catch {
    /* ignore quota */
  }
}

export function readFirstThenSession(): FirstThenSessionPayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(FIRST_THEN_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (
      !parsed ||
      typeof parsed !== "object" ||
      !("first" in parsed) ||
      !("second" in parsed) ||
      !("routineHref" in parsed)
    ) {
      return null;
    }
    const p = parsed as FirstThenSessionPayload;
    if (
      typeof p.routineHref !== "string" ||
      !p.first?.illustrationUrl ||
      !p.second?.illustrationUrl
    ) {
      return null;
    }
    return p;
  } catch {
    return null;
  }
}

export function clearFirstThenSession(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(FIRST_THEN_SESSION_KEY);
  } catch {
    /* ignore */
  }
}

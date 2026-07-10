import type { GeneratedPixtoCardProps } from "@/components/experimental/GeneratedPixtoCard";

export const FIRST_THEN_SESSION_KEY = "pixtolearn.firstThenSession.v2";

export type FirstThenSessionPayload = {
  /** Remaining routine cards from the current step onward (FIRST, THEN, …). */
  queue: GeneratedPixtoCardProps[];
  routineHref: string;
};

function isCard(value: unknown): value is GeneratedPixtoCardProps {
  return Boolean(
    value &&
      typeof value === "object" &&
      typeof (value as GeneratedPixtoCardProps).illustrationUrl === "string" &&
      (value as GeneratedPixtoCardProps).illustrationUrl.length > 0,
  );
}

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
    const raw =
      sessionStorage.getItem(FIRST_THEN_SESSION_KEY) ??
      sessionStorage.getItem("pixtolearn.firstThenSession.v1");
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return null;

    const obj = parsed as Record<string, unknown>;
    if (typeof obj.routineHref !== "string") return null;

    if (Array.isArray(obj.queue)) {
      const queue = obj.queue.filter(isCard);
      if (queue.length < 2) return null;
      return { queue, routineHref: obj.routineHref };
    }

    // Legacy v1: { first, second, routineHref }
    if (isCard(obj.first) && isCard(obj.second)) {
      return {
        queue: [obj.first, obj.second],
        routineHref: obj.routineHref,
      };
    }

    return null;
  } catch {
    return null;
  }
}

export function clearFirstThenSession(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(FIRST_THEN_SESSION_KEY);
    sessionStorage.removeItem("pixtolearn.firstThenSession.v1");
  } catch {
    /* ignore */
  }
}

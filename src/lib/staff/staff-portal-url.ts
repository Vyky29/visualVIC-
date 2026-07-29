/**
 * Portal Vic origin + helpers to return from Planner / Plan handoff.
 */

import type { TailoredParticipantId } from "@/lib/routines/tailored-participants";

export const STAFF_PORTAL_ORIGIN =
  (typeof process !== "undefined"
    ? process.env.NEXT_PUBLIC_STAFF_PORTAL_URL?.replace(/\/$/, "")
    : undefined) ?? "https://portalvic.vercel.app";

/** Portal social-story `?kid=` slugs (Emanuel spelling differs from VisualVic `emmanuel`). */
export type SummerSocialStoryKidSlug =
  | "emanuel"
  | "timi"
  | "ikram"
  | "fadi";

/** Default landing when opener tab is not available. */
export function staffPortalHomeUrl(): string {
  return `${STAFF_PORTAL_ORIGIN}/staff_dashboard.html`;
}

/** Map tailored participant → Portal summer social story kid slug. */
export function summerSocialStoryKidSlugForParticipant(
  participantId: TailoredParticipantId,
): SummerSocialStoryKidSlug | null {
  switch (participantId) {
    case "emmanuel":
      return "emanuel";
    case "timi":
      return "timi";
    case "ikram":
      return "ikram";
    case "fadi":
      return "fadi";
    default:
      return null;
  }
}

/** Absolute Portal URL — individual kid story only (`parent=1` + `kid=`). */
export function summerSocialStoryPortalUrl(
  slug: SummerSocialStoryKidSlug,
): string {
  return (
    `${STAFF_PORTAL_ORIGIN}/portal/day-centre-summer-break-social-story.html` +
    `?kid=${encodeURIComponent(slug)}&parent=1`
  );
}

/**
 * Prefer focusing the Portal window that opened Plan; otherwise navigate home.
 * `window.close()` only works for script-opened windows (Portal uses window.open).
 */
export function returnToStaffPortal(): void {
  if (typeof window === "undefined") return;
  try {
    const opener = window.opener;
    if (opener && !opener.closed) {
      try {
        opener.focus();
      } catch {
        /* cross-origin focus may throw; still try close */
      }
      try {
        window.close();
        return;
      } catch {
        /* fall through to navigate */
      }
    }
  } catch {
    /* ignore */
  }
  window.location.assign(staffPortalHomeUrl());
}

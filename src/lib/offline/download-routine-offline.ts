import { pinRoutineOffline } from "@/lib/offline/offline-pinned-routines";
import { prefetchRoutineAssets } from "@/lib/offline/prefetch-routine-assets";
import type { Routine } from "@/lib/types/routine";

export type DownloadRoutineOfflineResult =
  | { ok: true }
  | { ok: false; reason: "offline" | "no_assets" };

/** Download card images and mark routine as available without network. */
export async function downloadRoutineForOffline(
  routine: Routine,
): Promise<DownloadRoutineOfflineResult> {
  if (typeof window === "undefined") {
    return { ok: false, reason: "offline" };
  }
  if (!navigator.onLine) {
    return { ok: false, reason: "offline" };
  }

  await prefetchRoutineAssets(routine);
  pinRoutineOffline(routine.id);
  return { ok: true };
}

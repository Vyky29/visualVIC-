import { collectRoutineAssetUrls } from "@/lib/offline/collect-routine-asset-urls";
import type { Routine } from "@/lib/types/routine";

const ROUTINE_ASSETS_CACHE = "pixto-routine-assets-v1";

async function cacheUrlsDirect(urls: readonly string[]): Promise<void> {
  if (!("caches" in window) || urls.length === 0) return;
  const cache = await caches.open(ROUTINE_ASSETS_CACHE);
  await Promise.all(
    urls.map((url) =>
      cache.add(new Request(url, { credentials: "same-origin" })).catch(() => undefined),
    ),
  );
}

/** Warm the service worker / Cache API with a routine's card images. */
export async function prefetchRoutineAssets(routine: Routine): Promise<void> {
  if (typeof window === "undefined" || !navigator.onLine) return;

  const urls = collectRoutineAssetUrls(routine);
  if (urls.length === 0) return;

  const serwist = window.serwist;
  if (serwist?.messageSW) {
    try {
      await serwist.messageSW({
        type: "CACHE_URLS",
        payload: { urlsToCache: urls },
      });
      return;
    } catch {
      /* fall through to Cache API */
    }
  }

  await cacheUrlsDirect(urls);
}

export async function prefetchRoutineAssetsById(
  routineId: string,
  resolveRoutine: (id: string) => Routine | undefined,
): Promise<void> {
  const routine = resolveRoutine(routineId);
  if (!routine) return;
  await prefetchRoutineAssets(routine);
}

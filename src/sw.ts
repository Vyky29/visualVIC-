import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { CacheFirst, ExpirationPlugin, Serwist, type RuntimeCaching } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[];
  }
}

declare const self: ServiceWorkerGlobalScope;

const ROUTINE_ASSETS_CACHE = "pixto-routine-assets-v1";

const pixtoAssetCache: RuntimeCaching = {
  matcher({ url }) {
    const path = url.pathname;
    return (
      path.startsWith("/cards/") ||
      path.startsWith("/images/") ||
      path.startsWith("/avatars/") ||
      path.startsWith("/brand/")
    );
  },
  handler: new CacheFirst({
    cacheName: ROUTINE_ASSETS_CACHE,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 600,
        maxAgeSeconds: 60 * 60 * 24 * 365,
        purgeOnQuotaError: true,
      }),
    ],
  }),
};

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [pixtoAssetCache, ...defaultCache],
  fallbacks: {
    entries: [
      {
        url: "/~offline",
        matcher({ request }) {
          return request.destination === "document";
        },
      },
    ],
  },
});

serwist.addEventListeners();

self.addEventListener("message", (event) => {
  if (event.data?.type !== "CACHE_URLS") return;
  const urls: string[] = event.data.payload?.urlsToCache ?? [];
  if (urls.length === 0) return;

  event.waitUntil(
    caches.open(ROUTINE_ASSETS_CACHE).then((cache) =>
      Promise.all(
        urls.map((url) =>
          cache
            .add(new Request(url, { credentials: "same-origin" }))
            .catch(() => undefined),
        ),
      ),
    ),
  );
});

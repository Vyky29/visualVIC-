import { resolveCategoryBackCardUrlForStep } from "@/lib/cards/resolve-category-back-card";
import { resolveSchedulePlayerIndexPreviewUrl } from "@/lib/routines/resolve-routine-home-preview";
import type { Routine } from "@/lib/types/routine";

function isSameOriginAssetUrl(url: string | undefined): url is string {
  if (!url?.trim()) return false;
  if (url.startsWith("http://") || url.startsWith("https://")) return false;
  return url.startsWith("/");
}

function addUrl(set: Set<string>, url: string | undefined) {
  if (!isSameOriginAssetUrl(url)) return;
  set.add(url.split("?")[0] ?? url);
}

/** Collect same-origin PNG/asset URLs needed to play a routine offline. */
export function collectRoutineAssetUrls(routine: Routine): string[] {
  const urls = new Set<string>();

  addUrl(urls, routine.homePreviewImageUrl);
  addUrl(urls, resolveSchedulePlayerIndexPreviewUrl(routine));

  for (const step of routine.steps) {
    addUrl(urls, step.imageUrl);
    addUrl(urls, step.generatedPixto?.illustrationUrl);
    addUrl(urls, step.generatedPixto?.focusIllustrationUrl);
    addUrl(urls, step.generatedPixto?.iconUrl);
    addUrl(urls, resolveCategoryBackCardUrlForStep(step));
  }

  return [...urls];
}

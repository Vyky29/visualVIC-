/** True for phones/tablets (touch-first). Desktop mouse/trackpad returns false. */
export function isCoarsePointerDevice(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}

/** Orientation lock is for mobile/PWA — skip on desktop to avoid broken layouts. */
export function shouldApplyOrientationLock(): boolean {
  return isCoarsePointerDevice();
}

/** Desktop / laptop — mouse or trackpad with hover. */
export function isFinePointerDevice(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

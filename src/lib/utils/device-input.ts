import { TABLET_TOUCH_MEDIA } from "@/lib/constants/app-shell-layout";

/** True for phones/tablets (touch-first). Desktop mouse/trackpad returns false. */
export function isCoarsePointerDevice(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}

/** iPad Mini and similar — coarse pointer with tablet-width viewport. */
export function isTabletTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(TABLET_TOUCH_MEDIA).matches;
}

/** Portrait lock in the main app shell — phones only, not iPad. */
export function shouldLockPortraitInAppShell(): boolean {
  return isCoarsePointerDevice() && !isTabletTouchDevice();
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

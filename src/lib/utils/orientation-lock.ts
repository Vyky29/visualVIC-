/** Best-effort Screen Orientation API lock (PWA / Android Chrome; iOS may ignore). */

import { shouldApplyOrientationLock } from "@/lib/utils/device-input";

type OrientableScreen = ScreenOrientation & {
  lock?: (orientation: string) => Promise<void>;
};

function screenOrientation(): OrientableScreen | undefined {
  if (typeof screen === "undefined") return undefined;
  return screen.orientation as OrientableScreen;
}

async function tryLock(orientation: string): Promise<boolean> {
  if (!shouldApplyOrientationLock()) return false;
  const o = screenOrientation();
  if (typeof o?.lock !== "function") return false;
  try {
    await o.lock(orientation);
    return true;
  } catch {
    return false;
  }
}

export async function lockScreenPortrait(): Promise<void> {
  if (!shouldApplyOrientationLock()) return;
  if (await tryLock("portrait-primary")) return;
  await tryLock("portrait");
}

export async function lockScreenLandscape(): Promise<void> {
  if (!shouldApplyOrientationLock()) return;
  if (await tryLock("landscape-primary")) return;
  await tryLock("landscape");
}

export function unlockScreenOrientation(): void {
  if (!shouldApplyOrientationLock()) return;
  try {
    screenOrientation()?.unlock?.();
  } catch {
    /* ignore */
  }
}

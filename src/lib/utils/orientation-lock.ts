/** Best-effort Screen Orientation API lock (PWA / Android Chrome; iOS may ignore). */

type OrientableScreen = ScreenOrientation & {
  lock?: (orientation: string) => Promise<void>;
};

function screenOrientation(): OrientableScreen | undefined {
  if (typeof screen === "undefined") return undefined;
  return screen.orientation as OrientableScreen;
}

async function tryLock(orientation: string): Promise<boolean> {
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
  if (await tryLock("portrait-primary")) return;
  await tryLock("portrait");
}

export async function lockScreenLandscape(): Promise<void> {
  if (await tryLock("landscape-primary")) return;
  await tryLock("landscape");
}

export function unlockScreenOrientation(): void {
  try {
    screenOrientation()?.unlock?.();
  } catch {
    /* ignore */
  }
}

"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { BottomNav } from "@/components/navigation/BottomNav";
import {
  getFirstThenDemoFocusActive,
  subscribeFirstThenDemoFocus,
} from "@/lib/experimental/first-then-demo-focus-nav";
import { shouldLockPortraitInAppShell } from "@/lib/utils/device-input";
import { lockScreenPortrait, unlockScreenOrientation } from "@/lib/utils/orientation-lock";
import { shellClassForPathname } from "@/lib/constants/app-shell-layout";
import { cn } from "@/lib/utils/cn";

/**
 * Mobile-first shell: phone column on small screens; full tablet width on iPad.
 */
export function AppShell({
  children,
  showNav = true,
}: {
  children: ReactNode;
  showNav?: boolean;
}) {
  const pathname = usePathname();
  const firstThenDemoFocusActive = useSyncExternalStore(
    subscribeFirstThenDemoFocus,
    getFirstThenDemoFocusActive,
    () => false,
  );
  const isFirstThenDemo =
    pathname === "/first-then-demo" || pathname.startsWith("/first-then-demo/");
  const isFirstThenRoute =
    pathname === "/first-then" || pathname.startsWith("/first-then/");
  const navHiddenByRoute =
    (isFirstThenRoute && firstThenDemoFocusActive) ||
    (isFirstThenDemo && firstThenDemoFocusActive);
  const effectiveShowNav = showNav && !navHiddenByRoute;

  useEffect(() => {
    if (!shouldLockPortraitInAppShell() || firstThenDemoFocusActive) return;
    void lockScreenPortrait();
    return () => {
      unlockScreenOrientation();
    };
  }, [firstThenDemoFocusActive, pathname]);

  const shellClass = shellClassForPathname(pathname);

  return (
    <div className="min-h-dvh w-full bg-canvas">
      <div
        className={cn(
          "relative mx-auto min-h-dvh w-full bg-canvas text-ink",
          shellClass,
        )}
      >
        <div
          className={
            effectiveShowNav
              ? "min-h-dvh pb-[calc(3.5rem+env(safe-area-inset-bottom))]"
              : "min-h-dvh"
          }
        >
          {children}
        </div>
        {effectiveShowNav ? <BottomNav /> : null}
      </div>
    </div>
  );
}

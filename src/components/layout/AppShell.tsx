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
import { lockScreenPortrait } from "@/lib/utils/orientation-lock";

/**
 * Mobile-first shell: single column, max width ~phone, safe-area padding for nav.
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
    if (firstThenDemoFocusActive) return;
    void lockScreenPortrait();
  }, [firstThenDemoFocusActive, pathname]);

  const phoneShell = (
    <div className="relative mx-auto min-h-dvh w-full max-w-lg bg-canvas text-ink shadow-[0_0_0_1px_rgba(255,255,255,0.12)]">
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
  );

  return (
    <div className="min-h-dvh w-full bg-black">
      {phoneShell}
    </div>
  );
}

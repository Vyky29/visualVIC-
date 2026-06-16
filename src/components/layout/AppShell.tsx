"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { BottomNav } from "@/components/navigation/BottomNav";
import {
  getFirstThenDemoFocusActive,
  subscribeFirstThenDemoFocus,
} from "@/lib/experimental/first-then-demo-focus-nav";

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
  const navHiddenByRoute =
    pathname === "/first-then" ||
    pathname.startsWith("/first-then/") ||
    (isFirstThenDemo && firstThenDemoFocusActive);
  const effectiveShowNav = showNav && !navHiddenByRoute;

  const phoneShell = (
    <div className="relative mx-auto min-h-dvh w-full max-w-lg bg-canvas text-ink shadow-[0_0_0_1px_rgba(28,36,32,0.06)]">
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

  if (isFirstThenDemo) {
    return <div className="min-h-dvh bg-black">{phoneShell}</div>;
  }

  return phoneShell;
}

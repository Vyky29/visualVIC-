import type { ReactNode } from "react";
import { BottomNav } from "@/components/navigation/BottomNav";

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
  return (
    <div className="relative mx-auto min-h-dvh w-full max-w-lg bg-canvas text-ink shadow-[0_0_0_1px_rgba(28,36,32,0.06)]">
      <div
        className={
          showNav
            ? "min-h-dvh pb-[calc(5.5rem+env(safe-area-inset-bottom))]"
            : "min-h-dvh"
        }
      >
        {children}
      </div>
      {showNav ? <BottomNav /> : null}
    </div>
  );
}

"use client";

import type { ReactNode } from "react";
import { StaffPortalReturnButton } from "@/components/staff/StaffPortalReturnButton";
import { cn } from "@/lib/utils/cn";
import { APP_SHELL_CHROME_CLASS } from "@/lib/constants/app-shell-layout";

/** Staff planner — no bottom nav; full-width phone shell + always-on Portal return. */
export default function PlannerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh w-full bg-black">
      <div
        className={cn(
          "relative mx-auto min-h-dvh w-full bg-canvas text-ink",
          APP_SHELL_CHROME_CLASS,
        )}
      >
        <div className="sticky top-0 z-20 flex items-center justify-between gap-2 border-b border-ink/5 bg-canvas/95 px-4 py-2 backdrop-blur-md pt-[max(0.5rem,env(safe-area-inset-top))]">
          <StaffPortalReturnButton compact />
        </div>
        {children}
      </div>
    </div>
  );
}

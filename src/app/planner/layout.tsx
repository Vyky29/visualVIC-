import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { APP_SHELL_WIDTH_CLASS } from "@/lib/constants/app-shell-layout";

/** Staff planner — no bottom nav; full-width phone shell. */
export default function PlannerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh w-full bg-black">
      <div
        className={cn(
          "relative mx-auto min-h-dvh w-full bg-canvas text-ink",
          APP_SHELL_WIDTH_CLASS,
        )}
      >
        {children}
      </div>
    </div>
  );
}

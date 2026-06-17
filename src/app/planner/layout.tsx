import type { ReactNode } from "react";

/** Staff planner — no bottom nav; full-width phone shell. */
export default function PlannerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh w-full bg-black">
      <div className="relative mx-auto min-h-dvh w-full max-w-lg bg-canvas text-ink">
        {children}
      </div>
    </div>
  );
}

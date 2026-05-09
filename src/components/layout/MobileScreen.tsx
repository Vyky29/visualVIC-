import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Consistent horizontal inset + top safe area for full-height flows outside the tab shell.
 */
export function MobileScreen({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mx-auto min-h-dvh w-full max-w-lg bg-canvas px-6 pb-10 pt-[max(1.25rem,env(safe-area-inset-top))]",
        className,
      )}
      {...props}
    />
  );
}

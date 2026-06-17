import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import { APP_SHELL_WIDTH_CLASS } from "@/lib/constants/app-shell-layout";

/**
 * Consistent horizontal inset + top safe area for full-height flows outside the tab shell.
 */
export function MobileScreen({
  className,
  withChrome = true,
  ...props
}: HTMLAttributes<HTMLDivElement> & { withChrome?: boolean }) {
  const screen = (
    <div
      className={cn(
        "mx-auto min-h-dvh w-full bg-canvas px-6 pb-10 pt-[max(1.25rem,env(safe-area-inset-top))]",
        APP_SHELL_WIDTH_CLASS,
        className,
      )}
      {...props}
    />
  );

  if (!withChrome) return screen;

  return <div className="min-h-dvh w-full bg-black">{screen}</div>;
}

import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export function Card({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-3xl bg-cream p-5 shadow-card ring-1 ring-ink/5",
        className,
      )}
      {...props}
    />
  );
}

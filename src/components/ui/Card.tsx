import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  /** When the caller supplies its own ring (e.g. routine accent), skip the default inset ring. */
  omitInsetRing?: boolean;
};

export function Card({
  className,
  omitInsetRing = false,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl bg-cream p-5 shadow-card",
        !omitInsetRing && "ring-1 ring-ink/5",
        className,
      )}
      {...props}
    />
  );
}

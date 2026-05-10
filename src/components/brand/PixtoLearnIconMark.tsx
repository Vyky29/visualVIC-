import { BRAND_LOGO_SRC } from "@/lib/constants/brand";
import { cn } from "@/lib/utils/cn";

/** Tri-card icon only — pairs with the page title in the app header. */
export function PixtoLearnIconMark({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-white p-1.5 ring-1 ring-ink/[0.08]",
        "shadow-[0_1px_0_rgba(28,36,32,0.04),0_4px_12px_-4px_rgba(28,36,32,0.1)]",
        className,
      )}
    >
      <img
        src={BRAND_LOGO_SRC}
        alt=""
        width={128}
        height={128}
        className="h-full w-full object-contain"
        decoding="async"
      />
    </div>
  );
}

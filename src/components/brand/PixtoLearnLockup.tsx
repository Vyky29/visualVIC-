import { BRAND_ICON_AMBER, BRAND_LOGO_SRC } from "@/lib/constants/brand";
import { cn } from "@/lib/utils/cn";

type Props = {
  /** `hero` = welcome; `header` = app bar. */
  variant: "hero" | "header";
  className?: string;
};

/**
 * Icon from `pixtolearn-logo.png` + wordmark: Pix + To (brand amber) + Learn.
 */
export function PixtoLearnLockup({ variant, className }: Props) {
  const hero = variant === "hero";
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        hero ? "gap-3.5" : "gap-2.5",
        className,
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-2xl bg-white ring-1 ring-ink/[0.08]",
          "shadow-[0_1px_0_rgba(28,36,32,0.04),0_4px_12px_-4px_rgba(28,36,32,0.1)]",
          hero
            ? "h-[3.35rem] w-[3.35rem] p-2 sm:h-[3.75rem] sm:w-[3.75rem] sm:p-2.5"
            : "h-9 w-9 p-1.5",
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
      <span
        className={cn(
          "select-none whitespace-nowrap font-semibold tracking-[-0.03em] text-ink",
          hero
            ? "text-[clamp(1.2rem,4.6vw,1.7rem)] leading-none"
            : "text-[0.94rem] leading-none sm:text-[1.02rem]",
        )}
      >
        Pix
        <span className="font-semibold" style={{ color: BRAND_ICON_AMBER }}>
          To
        </span>
        Learn
      </span>
    </div>
  );
}

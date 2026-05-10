import { BRAND_ICON_AMBER, BRAND_LOGO_SRC } from "@/lib/constants/brand";
import { cn } from "@/lib/utils/cn";

type Props = {
  /** `hero` = welcome; `header` = app bar. */
  variant: "hero" | "header";
  /**
   * `stacked` (hero only): large centered icon, wordmark below.
   * `inline`: icon and wordmark in one row (default; used in header).
   */
  layout?: "inline" | "stacked";
  className?: string;
};

/**
 * Icon from `pixtolearn-logo.png` + wordmark: Pix + To (brand amber) + Learn.
 */
export function PixtoLearnLockup({
  variant,
  layout = "inline",
  className,
}: Props) {
  const hero = variant === "hero";
  const stacked = hero && layout === "stacked";
  return (
    <div
      className={cn(
        "flex justify-center",
        stacked
          ? "flex-col items-center gap-3"
          : "flex-row items-center gap-2.5",
        hero && !stacked && "gap-3.5",
        className,
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-2xl bg-white ring-1 ring-ink/[0.08]",
          "shadow-[0_1px_0_rgba(28,36,32,0.04),0_4px_12px_-4px_rgba(28,36,32,0.1)]",
          stacked &&
            "h-[clamp(5rem,22dvh,7.5rem)] w-[clamp(5rem,22dvh,7.5rem)] rounded-[1.35rem] p-3 sm:h-[clamp(5.5rem,20dvh,8rem)] sm:w-[clamp(5.5rem,20dvh,8rem)] sm:p-4 [@media(max-height:640px)]:h-[clamp(4rem,16dvh,5.75rem)] [@media(max-height:640px)]:w-[clamp(4rem,16dvh,5.75rem)] [@media(max-height:640px)]:p-2.5",
          hero &&
            !stacked &&
            "h-[3.35rem] w-[3.35rem] p-2 sm:h-[3.75rem] sm:w-[3.75rem] sm:p-2.5",
          !hero && "h-9 w-9 p-1.5",
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
          "select-none text-center font-semibold tracking-[-0.03em] text-ink",
          stacked
            ? "whitespace-normal text-[clamp(1.45rem,5.5vw,2.05rem)] leading-tight [@media(max-height:640px)]:text-[clamp(1.2rem,4.8vw,1.65rem)]"
            : "whitespace-nowrap leading-none",
          hero && !stacked && "text-[clamp(1.2rem,4.6vw,1.7rem)]",
          !hero && "text-[0.94rem] sm:text-[1.02rem]",
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

"use client";

import { Button } from "@/components/ui/Button";
import {
  plannerBackToPortal,
  plannerBackToPortalAria,
} from "@/lib/i18n/app-shell-locale";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";
import { returnToStaffPortal } from "@/lib/staff/staff-portal-url";
import { cn } from "@/lib/utils/cn";

const CLUB_MARK = "/assets/clubsensational-logo-mark.png";

type Props = {
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  /** Compact label for header / nav chips. */
  compact?: boolean;
};

export function StaffPortalReturnButton({
  className,
  variant = "secondary",
  compact = false,
}: Props) {
  const lang = useCardUiLanguage();
  return (
    <Button
      type="button"
      variant={variant}
      className={cn(
        "gap-1.5",
        compact
          ? "!min-h-9 !px-2 !py-1.5 text-[11px] leading-tight sm:text-[12px]"
          : "!min-h-10 !px-3 text-[13px] sm:text-[14px]",
        className,
      )}
      aria-label={plannerBackToPortalAria(lang)}
      onClick={() => returnToStaffPortal()}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={CLUB_MARK}
        alt=""
        width={compact ? 18 : 20}
        height={compact ? 18 : 20}
        className="h-[18px] w-[18px] shrink-0 object-contain sm:h-5 sm:w-5"
        decoding="async"
        aria-hidden
      />
      <span className="min-w-0 truncate">{plannerBackToPortal(lang)}</span>
    </Button>
  );
}

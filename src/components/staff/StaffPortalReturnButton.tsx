"use client";

import { Button } from "@/components/ui/Button";
import {
  plannerBackToPortal,
  plannerBackToPortalAria,
} from "@/lib/i18n/app-shell-locale";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";
import { returnToStaffPortal } from "@/lib/staff/staff-portal-url";
import { cn } from "@/lib/utils/cn";

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
        compact
          ? "!min-h-9 !px-2.5 !py-1.5 text-[11px] leading-tight sm:text-[12px]"
          : "!min-h-10 !px-4 text-[13px] sm:text-[14px]",
        className,
      )}
      aria-label={plannerBackToPortalAria(lang)}
      onClick={() => returnToStaffPortal()}
    >
      {plannerBackToPortal(lang)}
    </Button>
  );
}

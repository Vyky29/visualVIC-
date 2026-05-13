"use client";

import type { ReactNode } from "react";
import { Header } from "@/components/navigation/Header";
import {
  shellBackAria,
  shellHeaderTitle,
  type ShellHeaderKey,
} from "@/lib/i18n/app-shell-locale";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";

type Props = {
  titleKey: ShellHeaderKey;
  backHref?: string;
  rightSlot?: ReactNode;
  className?: string;
  compact?: boolean;
};

export function TranslatedHeader({
  titleKey,
  backHref,
  rightSlot,
  className,
  compact,
}: Props) {
  const lang = useCardUiLanguage();
  return (
    <Header
      title={shellHeaderTitle(titleKey, lang)}
      backHref={backHref}
      backAriaLabel={shellBackAria(lang)}
      rightSlot={rightSlot}
      className={className}
      compact={compact}
    />
  );
}

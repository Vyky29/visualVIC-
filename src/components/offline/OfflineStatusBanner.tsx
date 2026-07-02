"use client";

import Link from "next/link";
import { useOnlineStatus } from "@/lib/offline/use-online-status";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";
import { offlineBannerBody, offlineBannerTitle } from "@/lib/i18n/app-shell-locale";

export function OfflineStatusBanner() {
  const online = useOnlineStatus();
  const lang = useCardUiLanguage();

  if (online) return null;

  return (
    <div
      role="status"
      className="border-b border-amber-200/80 bg-amber-50 px-4 py-2.5 text-center text-[13px] leading-snug text-amber-950"
    >
      <p className="font-semibold">{offlineBannerTitle(lang)}</p>
      <p className="mt-0.5 text-[12px] text-amber-900/90">{offlineBannerBody(lang)}</p>
      <Link
        href="/player"
        className="mt-1 inline-block text-[12px] font-medium text-amber-950 underline-offset-2 hover:underline"
      >
        Schedule Player →
      </Link>
    </div>
  );
}

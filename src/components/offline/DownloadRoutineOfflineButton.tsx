"use client";

import { useState } from "react";
import { downloadRoutineForOffline } from "@/lib/offline/download-routine-offline";
import {
  pinRoutineOffline,
  unpinRoutineOffline,
} from "@/lib/offline/offline-pinned-routines";
import { useIsRoutinePinnedOffline } from "@/lib/offline/use-offline-pinned-routines";
import { useOnlineStatus } from "@/lib/offline/use-online-status";
import {
  offlineDownloadButton,
  offlineDownloadDone,
  offlineDownloadNeedNetwork,
  offlineDownloadWorking,
  offlineUnpinAria,
} from "@/lib/i18n/app-shell-locale";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";
import type { Routine } from "@/lib/types/routine";
import { cn } from "@/lib/utils/cn";

export function DownloadRoutineOfflineButton({ routine }: { routine: Routine }) {
  const lang = useCardUiLanguage();
  const online = useOnlineStatus();
  const pinned = useIsRoutinePinnedOffline(routine.id);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDownload(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (working) return;

    setError(null);
    setWorking(true);
    try {
      const result = await downloadRoutineForOffline(routine);
      if (!result.ok && result.reason === "offline") {
        setError(offlineDownloadNeedNetwork(lang));
      }
    } finally {
      setWorking(false);
    }
  }

  function handleUnpin(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    unpinRoutineOffline(routine.id);
  }

  if (pinned) {
    return (
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-sage/25 bg-sage-mist/80 px-2.5 py-1 text-[12px] font-medium text-sage">
          <span aria-hidden>✓</span>
          {offlineDownloadDone(lang)}
        </span>
        {online ? (
          <button
            type="button"
            aria-label={offlineUnpinAria(lang)}
            className="text-[12px] font-medium text-ink-subtle underline-offset-2 hover:text-ink hover:underline"
            onClick={handleUnpin}
          >
            ×
          </button>
        ) : null}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        disabled={!online || working}
        className={cn(
          "inline-flex w-fit items-center rounded-full border px-3 py-1.5 text-[12px] font-medium transition",
          online && !working
            ? "border-ink/12 bg-white text-ink hover:border-sage/30 hover:bg-sage-mist/50"
            : "cursor-not-allowed border-ink/8 bg-canvas-muted text-ink-faint",
        )}
        onClick={handleDownload}
      >
        {working ? offlineDownloadWorking(lang) : offlineDownloadButton(lang)}
      </button>
      {error ? (
        <p className="text-[11px] leading-snug text-amber-800">{error}</p>
      ) : null}
    </div>
  );
}

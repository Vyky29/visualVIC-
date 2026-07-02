"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/navigation/Header";
import { TranslatedHeader } from "@/components/navigation/TranslatedHeader";
import { useCustomRoutines } from "@/contexts/CustomRoutinesContext";
import { useStaffAccess } from "@/contexts/StaffAccessContext";
import {
  playerBackToSchedule,
  playerLoadingSchedule,
  playerNotFound,
  shellBackAria,
} from "@/lib/i18n/app-shell-locale";
import { stockRoutineDisplayName } from "@/lib/i18n/pixto-digital-locale";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";
import { resolveAnyRoutine } from "@/lib/routines/resolve-any-routine";
import { touchSchedulePlayerRoutine } from "@/lib/preferences/schedule-player-recent-preference";
import { prefetchRoutineAssets } from "@/lib/offline/prefetch-routine-assets";

function SchedulePlayerLoadingLine() {
  const lang = useCardUiLanguage();
  return (
    <div className="px-5 py-14 text-center text-[14px] text-ink-subtle">
      {playerLoadingSchedule(lang)}
    </div>
  );
}

const SchedulePlayerWithProfileRoutine = dynamic(
  () =>
    import("@/components/schedule/SchedulePlayerWithProfileRoutine").then(
      (m) => ({
        default: m.SchedulePlayerWithProfileRoutine,
      }),
    ),
  {
    loading: () => <SchedulePlayerLoadingLine />,
  },
);

export function PlayerDetailClient({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { routines: custom } = useCustomRoutines();
  const cardUiLang = useCardUiLanguage();
  const router = useRouter();
  const { mayOpenRoutine, playerBackHref, status: staffStatus } = useStaffAccess();
  const routine = resolveAnyRoutine(id, custom);

  useEffect(() => {
    if (staffStatus === "loading" || !routine) return;
    if (!mayOpenRoutine(routine)) {
      router.replace("/dashboard");
    }
  }, [mayOpenRoutine, routine, router, staffStatus]);

  useEffect(() => {
    if (routine) touchSchedulePlayerRoutine(id);
  }, [id, routine]);

  useEffect(() => {
    if (!routine || !navigator.onLine) return;
    void prefetchRoutineAssets(routine);
  }, [routine]);

  if (!routine) {
    return (
      <div className="pb-6">
        <TranslatedHeader titleKey="routine" backHref={playerBackHref} />
        <div className="px-5 py-16 text-center">
          <p className="text-[15px] text-ink-subtle">
            {playerNotFound(cardUiLang)}
          </p>
          <Link
            href={playerBackHref}
            className="mt-5 inline-block text-[14px] font-medium text-sage underline-offset-4 hover:underline"
          >
            {playerBackToSchedule(cardUiLang)}
          </Link>
        </div>
      </div>
    );
  }

  if (staffStatus !== "loading" && routine && !mayOpenRoutine(routine)) {
    return null;
  }

  return (
    <div className="pb-6">
      <Header
        title={stockRoutineDisplayName(routine.id, routine.name, cardUiLang)}
        backHref={playerBackHref}
        backAriaLabel={shellBackAria(cardUiLang)}
      />
      <SchedulePlayerWithProfileRoutine routine={routine} backHref={playerBackHref} />
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { use } from "react";
import { Header } from "@/components/navigation/Header";
import { useCustomRoutines } from "@/contexts/CustomRoutinesContext";
import { resolveAnyRoutine } from "@/lib/routines/resolve-any-routine";

const SchedulePlayerWithProfileRoutine = dynamic(
  () =>
    import("@/components/schedule/SchedulePlayerWithProfileRoutine").then(
      (m) => ({
        default: m.SchedulePlayerWithProfileRoutine,
      }),
    ),
  {
    loading: () => (
      <div className="px-5 py-14 text-center text-[14px] text-ink-subtle">
        Loading schedule…
      </div>
    ),
  },
);

export function PlayerDetailClient({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { routines: custom } = useCustomRoutines();
  const routine = resolveAnyRoutine(id, custom);

  if (!routine) {
    return (
      <div className="pb-6">
        <Header title="Routine" backHref="/player" />
        <div className="px-5 py-16 text-center">
          <p className="text-[15px] text-ink-subtle">Routine not found.</p>
          <Link
            href="/player"
            className="mt-5 inline-block text-[14px] font-medium text-sage underline-offset-4 hover:underline"
          >
            Back to Schedule Player
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-6">
      <Header title={routine.name} backHref="/player" />
      <SchedulePlayerWithProfileRoutine routine={routine} backHref="/player" />
    </div>
  );
}

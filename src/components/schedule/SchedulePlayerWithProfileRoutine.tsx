"use client";

import type { Routine } from "@/lib/types/routine";
import { useSexFilteredRoutine } from "@/hooks/useSexFilteredRoutine";
import { SchedulePlayer } from "@/components/schedule/SchedulePlayer";

type Props = {
  routine: Routine;
  backHref: string;
};

export function SchedulePlayerWithProfileRoutine({ routine, backHref }: Props) {
  const filtered = useSexFilteredRoutine(routine);
  return <SchedulePlayer routine={filtered} backHref={backHref} />;
}

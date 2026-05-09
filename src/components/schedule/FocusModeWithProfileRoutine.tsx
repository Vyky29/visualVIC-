"use client";

import type { Routine } from "@/lib/types/routine";
import { useSexFilteredRoutine } from "@/hooks/useSexFilteredRoutine";
import { FocusMode } from "@/components/schedule/FocusMode";

type Props = {
  routine: Routine;
  exitHref: string;
};

export function FocusModeWithProfileRoutine({ routine, exitHref }: Props) {
  const filtered = useSexFilteredRoutine(routine);
  return <FocusMode routine={filtered} exitHref={exitHref} />;
}

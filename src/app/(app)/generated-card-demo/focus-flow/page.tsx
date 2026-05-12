"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { FocusMode } from "@/components/schedule/FocusMode";
import {
  HOTEL_GENERATED_CARD_PROPS,
  routineStepsFromGeneratedCardProps,
} from "@/lib/experimental/generated-pixto-demo-routine";
import type { Routine } from "@/lib/types/routine";

export default function GeneratedWowFocusFlowPage() {
  const searchParams = useSearchParams();
  const startIndex = useMemo(() => {
    const raw = Number.parseInt(searchParams.get("start") ?? "0", 10);
    if (!Number.isFinite(raw)) return 0;
    return Math.max(0, Math.min(raw, HOTEL_GENERATED_CARD_PROPS.length - 1));
  }, [searchParams]);

  const routine = useMemo<Routine>(() => {
    const suffix =
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : String(Date.now());

    return {
      id: `generated-wow-focus-flow-${suffix}`,
      name: "Generated wow focus flow",
      steps: routineStepsFromGeneratedCardProps(
        `generated-wow-focus-${suffix}`,
        HOTEL_GENERATED_CARD_PROPS.slice(startIndex),
      ),
    };
  }, [startIndex]);

  return <FocusMode routine={routine} exitHref="/generated-card-demo" />;
}

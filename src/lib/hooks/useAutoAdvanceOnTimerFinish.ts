"use client";

import { useEffect, useRef } from "react";

/** Advance playback once when an active step timer reaches zero after counting down. */
export function useAutoAdvanceOnTimerFinish({
  active,
  stepKey,
  hasTimer,
  finished,
  onAdvance,
}: {
  active: boolean;
  stepKey: string;
  hasTimer: boolean;
  finished: boolean;
  onAdvance: () => void;
}) {
  const advancedKeyRef = useRef<string | null>(null);
  /** True only after we have seen this step timer in a non-finished state. */
  const sawRunningRef = useRef(false);

  useEffect(() => {
    advancedKeyRef.current = null;
    sawRunningRef.current = false;
  }, [stepKey]);

  useEffect(() => {
    if (!active || !hasTimer) {
      sawRunningRef.current = false;
      return;
    }
    if (!finished) {
      sawRunningRef.current = true;
      return;
    }
    if (!sawRunningRef.current) return;
    if (advancedKeyRef.current === stepKey) return;
    advancedKeyRef.current = stepKey;
    onAdvance();
  }, [active, finished, hasTimer, onAdvance, stepKey]);
}

"use client";

import { useEffect, useRef } from "react";

/** Advance playback once when an active step timer reaches zero. */
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

  useEffect(() => {
    advancedKeyRef.current = null;
  }, [stepKey]);

  useEffect(() => {
    if (!active || !hasTimer || !finished) return;
    if (advancedKeyRef.current === stepKey) return;
    advancedKeyRef.current = stepKey;
    onAdvance();
  }, [active, finished, hasTimer, onAdvance, stepKey]);
}

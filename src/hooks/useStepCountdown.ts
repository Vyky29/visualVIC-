import { useEffect, useState } from "react";

/**
 * Per-step countdown. Remaining must sync in the same render as `timerSec` /
 * `stepKey` changes — otherwise `finished` is briefly true (remaining still 0)
 * and auto-advance fires the moment staff pick a timer.
 */
export function useStepCountdown(
  timerSec: number | undefined,
  stepKey: string,
  active: boolean,
) {
  const identity = `${stepKey}::${timerSec ?? "off"}`;
  const [remaining, setRemaining] = useState(() => timerSec ?? 0);
  const [prevIdentity, setPrevIdentity] = useState(identity);

  if (identity !== prevIdentity) {
    setPrevIdentity(identity);
    setRemaining(timerSec ?? 0);
  }

  useEffect(() => {
    if (!active || !timerSec || timerSec <= 0) return;

    const id = window.setInterval(() => {
      setRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => window.clearInterval(id);
  }, [active, stepKey, timerSec]);

  const hasTimer = Boolean(timerSec && timerSec > 0);
  const finished = hasTimer && remaining <= 0;

  return {
    remaining,
    totalSeconds: timerSec ?? 0,
    hasTimer,
    finished,
    progress: hasTimer && timerSec! > 0 ? remaining / timerSec! : 0,
  };
}

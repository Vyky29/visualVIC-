import { useEffect, useState } from "react";

export function useStepCountdown(
  timerSec: number | undefined,
  stepKey: string,
  active: boolean,
) {
  const [remaining, setRemaining] = useState(timerSec ?? 0);

  useEffect(() => {
    setRemaining(timerSec ?? 0);
  }, [stepKey, timerSec]);

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
    progress:
      hasTimer && timerSec! > 0 ? remaining / timerSec! : 0,
  };
}

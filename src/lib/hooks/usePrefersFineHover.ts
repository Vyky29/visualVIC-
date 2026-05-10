"use client";

import { useEffect, useState } from "react";

/** True for typical mouse + trackpad on desktop (not primary touch / phone UI). */
const QUERY = "(hover: hover) and (pointer: fine)" as const;

export function usePrefersFineHover(): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const apply = () => setMatches(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return matches;
}

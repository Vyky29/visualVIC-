"use client";

import type { ReactNode } from "react";

type Props = { children: ReactNode };

/**
 * Focus generated cards fill the parent slot (full width + height).
 * Width is capped by FocusCardStage; extra vertical space goes to the
 * illustration zone (flex:1), not a wider card.
 */
export function GeneratedPixtoFocusSlotScale({ children }: Props) {
  return (
    <div className="relative h-full min-h-0 w-full min-w-0">
      {children}
    </div>
  );
}

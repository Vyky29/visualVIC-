/**
 * V2 integration seams — import these types/adapters when wiring backend engines.
 * No runtime behaviour in V1; keeps UI decoupled from future services.
 */

export type AdaptiveRoutineContext = {
  /** Reserved for sensors / calendar / fatigue signals */
  signals?: Record<string, unknown>;
};

export type ExpertEngineRef = {
  id: string;
  /** Future: licensed content packs */
  scope?: "templates" | "clinical";
};

export type TherapistAccountRef = {
  orgId?: string;
  /** Future: multi-seat */
  seat?: string;
};

export type AvatarV2Kind = "2d" | "3d";

export type VideoPipelineRef = {
  /** Future: storyboards or generated clips */
  disabledReason?: string;
};

/** Placeholder hook surface for adaptive sequencing (no-op in V1) */
export function createAdaptiveRoutinePlaceholder(_ctx: AdaptiveRoutineContext) {
  return { enabled: false as const };
}

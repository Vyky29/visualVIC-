/** Payload for HTML/CSS `GeneratedPixtoCard` inside Schedule / Focus. */
export type GeneratedPixtoRoutineStepData = {
  illustrationUrl: string;
  title: string;
  category: string;
  categoryColour: string;
  iconUrl?: string;
  cardType?: string;
  /** Optional Focus-only illustration zoom for one-off visual tests. */
  focusIllustrationScale?: number;
  /** Optional Focus-only asset (531×663); falls back to `illustrationUrl`. */
  focusIllustrationUrl?: string;
};

export type RoutineStep = {
  id: string;
  title: string;
  /** Placeholder image — V1 mock URLs or local paths */
  imageUrl?: string;
  durationHintSec?: number;
  /** When set, `SwipeableStepCard` renders `GeneratedPixtoCard` instead of a flat PNG step. */
  generatedPixto?: GeneratedPixtoRoutineStepData;
};

export type Routine = {
  id: string;
  name: string;
  description?: string;
  steps: RoutineStep[];
  /** Tags for future adaptive / expert systems */
  tags?: string[];
  /** Home / Schedule Player list preview when different from `steps[0].imageUrl` */
  homePreviewImageUrl?: string;
  /** Optional countdown (seconds) applied to every step unless a step sets its own. */
  defaultTimerSec?: number;
};

export type VisualAsset = {
  id: string;
  label: string;
  category: "self-care" | "school" | "home" | "play" | "activity" | "other";
  thumbnailUrl: string;
};

/** For clothing / routine filtering — optional, user may skip. */
export type ChildSex = "male" | "female" | "unspecified";

export type UserProfile = {
  /** Child name (shown on Home; can be interpolated into routines later). */
  displayName: string;
  avatarUrl?: string;
  sex?: ChildSex;
  /** Child height in centimetres — optional metadata for future visuals. */
  heightCm?: number;
  /**
   * Zoom of the uploaded photo inside the avatar frame (1 = default).
   * Local-only; does not generate new art.
   */
  avatarFrameScale?: number;
};

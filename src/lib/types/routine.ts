export type RoutineStep = {
  id: string;
  title: string;
  /** Placeholder image — V1 mock URLs or local paths */
  imageUrl?: string;
  durationHintSec?: number;
};

export type Routine = {
  id: string;
  name: string;
  description?: string;
  steps: RoutineStep[];
  /** Tags for future adaptive / expert systems */
  tags?: string[];
};

export type VisualAsset = {
  id: string;
  label: string;
  category: "self-care" | "school" | "home" | "play" | "activity" | "other";
  thumbnailUrl: string;
};

export type UserProfile = {
  displayName: string;
  avatarUrl?: string;
};

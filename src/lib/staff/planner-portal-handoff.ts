export const PLANNER_APP_ORIGIN =
  process.env.NEXT_PUBLIC_PLANNER_APP_URL?.replace(/\/$/, "") ??
  "https://visual-vic.vercel.app";

export const PLANNER_HANDOFF_PATH = "/planner/auth/handoff" as const;

export type PlannerHandoffTokens = {
  access_token: string;
  refresh_token: string;
};

/** Parse `#access_token=…&refresh_token=…` from Portal → Planner redirect. */
export function parsePlannerHandoffHash(
  hash: string,
): PlannerHandoffTokens | null {
  const raw = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!raw) return null;
  const params = new URLSearchParams(raw);
  const access_token = params.get("access_token")?.trim();
  const refresh_token = params.get("refresh_token")?.trim();
  if (!access_token || !refresh_token) return null;
  return { access_token, refresh_token };
}

/** Build handoff URL (tokens in fragment — not sent to server logs). */
export function buildPlannerHandoffUrl(tokens: PlannerHandoffTokens): string {
  const hash = new URLSearchParams({
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
  }).toString();
  return `${PLANNER_APP_ORIGIN}${PLANNER_HANDOFF_PATH}#${hash}`;
}

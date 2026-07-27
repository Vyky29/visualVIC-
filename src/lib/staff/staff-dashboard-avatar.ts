/**
 * Staff Home / Planner profile photo — same assets as Circle Time / Portal dashboard.
 * Files live at `public/avatars/{id}-cartoon-2d.png` (from Portal `staff_photos`).
 */

const STAFF_DASHBOARD_AVATAR_IDS = new Set([
  "michelle",
  "youssef",
  "luliya",
  "raul",
  "roberto",
  "victor",
]);

/** Portal username quirks → published avatar id. */
const STAFF_AVATAR_ID_ALIASES: Readonly<Record<string, string>> = {
  lulia: "luliya",
};

export function staffDashboardAvatarId(
  username: string | null | undefined,
): string | null {
  const raw = username?.trim().toLowerCase();
  if (!raw) return null;
  const id = STAFF_AVATAR_ID_ALIASES[raw] ?? raw;
  if (!STAFF_DASHBOARD_AVATAR_IDS.has(id)) return null;
  return id;
}

export function staffDashboardAvatarUrl(
  username: string | null | undefined,
): string | null {
  const id = staffDashboardAvatarId(username);
  if (!id) return null;
  return `/avatars/${id}-cartoon-2d.png`;
}

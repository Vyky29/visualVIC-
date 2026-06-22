import {
  PICKABLE_LIBRARY_CARDS,
  type PickableLibraryCard,
} from "@/lib/library/pickable-library-cards";

function normalizeForSearch(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]+/g, " ")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function searchHaystack(card: PickableLibraryCard): string {
  const slug = card.pickId.split("::")[1] ?? "";
  const pack = card.pickId.split("::")[0] ?? "";
  return normalizeForSearch(`${card.label} ${slug} ${pack} ${card.category}`);
}

/** Word search across all pickable library cards (label, slug, pack). */
export function searchPickableLibraryCards(
  query: string,
  limit = 40,
): PickableLibraryCard[] {
  const normalizedQuery = normalizeForSearch(query);
  if (!normalizedQuery) return [];

  const tokens = normalizedQuery.split(" ").filter(Boolean);
  if (tokens.length === 0) return [];

  const matches: PickableLibraryCard[] = [];
  for (const card of PICKABLE_LIBRARY_CARDS) {
    const haystack = searchHaystack(card);
    if (tokens.every((token) => haystack.includes(token))) {
      matches.push(card);
      if (matches.length >= limit) break;
    }
  }
  return matches;
}

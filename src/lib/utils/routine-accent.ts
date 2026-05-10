import type { Routine } from "@/lib/types/routine";

/**
 * Visual accent for routine tiles on Home (hover: ring + glow).
 * Based on `tags` and `id` until the model has an explicit category.
 */
export function routineTileHoverAccentClass(r: Routine): string {
  const id = r.id.toLowerCase();
  const t = (r.tags ?? []).join(" ").toLowerCase();

  if (id.startsWith("custom-")) {
    return "group-hover:ring-sage/55 group-hover:shadow-[0_0_36px_-12px_rgba(125,155,135,0.35)]";
  }
  if (id.includes("brush") || id.includes("teeth")) {
    return "group-hover:ring-[#91C24C]/80 group-hover:shadow-[0_0_40px_-10px_rgba(145,194,76,0.42)]";
  }
  if (id.includes("shower")) {
    return "group-hover:ring-sky-400/55 group-hover:shadow-[0_0_36px_-12px_rgba(56,189,248,0.28)]";
  }
  if (t.includes("self-care")) {
    return "group-hover:ring-[#91C24C]/75 group-hover:shadow-[0_0_36px_-12px_rgba(145,194,76,0.35)]";
  }
  if (t.includes("activity") || id.includes("swim")) {
    return "group-hover:ring-accent/65 group-hover:shadow-[0_0_36px_-12px_rgba(107,143,158,0.38)]";
  }
  if (t.includes("morning") || id.includes("morning")) {
    return "group-hover:ring-amber-400/60 group-hover:shadow-[0_0_36px_-12px_rgba(251,191,36,0.32)]";
  }
  return "group-hover:ring-sage/50 group-hover:shadow-[0_0_32px_-14px_rgba(125,155,135,0.32)]";
}

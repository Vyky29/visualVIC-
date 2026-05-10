import type { PickablePackId } from "@/lib/library/pickable-library-cards";
import { cn } from "@/lib/utils/cn";

const sw = 1.65;

/** Stroke colour on white — matches each pack accent. */
export const libraryPackGlyphColorClass: Record<PickablePackId, string> = {
  bt: "text-[#5f8f2a]",
  shower: "text-[#143d66]",
  dress: "text-[#5a3d8a]",
  core: "text-accent",
  airport: "text-[#b8860b]",
  hotel: "text-[#7a1828]",
  climb: "text-[#b8892e]",
  swim: "text-[#3d7a8f]",
};

type Props = {
  pack: PickablePackId;
  className?: string;
};

/**
 * Compact stroke icons for library pack rows (no PNG thumbnails in headers).
 */
export function LibraryPackGlyph({ pack, className }: Props) {
  const g = cn("h-[22px] w-[22px] shrink-0 sm:h-6 sm:w-6", className);

  switch (pack) {
    case "bt":
      return (
        <svg className={g} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 21V10"
            stroke="currentColor"
            strokeWidth={sw}
            strokeLinecap="round"
          />
          <rect
            x="8"
            y="3"
            width="8"
            height="8"
            rx="1.5"
            stroke="currentColor"
            strokeWidth={sw}
          />
          <path
            d="M9 5h6M9 7h6"
            stroke="currentColor"
            strokeWidth={sw}
            strokeLinecap="round"
          />
        </svg>
      );
    case "shower":
      return (
        <svg className={g} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 4a3 3 0 0 0-3 3v2h6V7a3 3 0 0 0-3-3z M9 9v2h6V9"
            stroke="currentColor"
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 14v1M12 16v1M14 14v1M11 19v1M13 19v1"
            stroke="currentColor"
            strokeWidth={sw}
            strokeLinecap="round"
          />
        </svg>
      );
    case "dress":
      return (
        <svg className={g} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M8 5l2-2h4l2 2 2 3v13H6V8l2-3z"
            stroke="currentColor"
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 10h4M12 10v6"
            stroke="currentColor"
            strokeWidth={sw}
            strokeLinecap="round"
          />
        </svg>
      );
    case "core":
      return (
        <svg className={g} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M4 10.5L12 4l8 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1v-9.5z"
            stroke="currentColor"
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 21v-6h6v6"
            stroke="currentColor"
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "airport":
      return (
        <svg className={g} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
            stroke="currentColor"
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "hotel":
      return (
        <svg className={g} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M4 21h16M6 21V10l6-4 6 4v11"
            stroke="currentColor"
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 21v-5h4v5M10 12h4"
            stroke="currentColor"
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "climb":
      return (
        <svg className={g} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 3L4 21h16L12 3z"
            stroke="currentColor"
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 14l3-3 2 4 3-6"
            stroke="currentColor"
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "swim":
      return (
        <svg className={g} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M2 12c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2"
            stroke="currentColor"
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 17c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2"
            stroke="currentColor"
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

import { Header } from "@/components/navigation/Header";
import { GeneratedPixtoCard } from "@/components/experimental/GeneratedPixtoCard";

const AIRPORT_ILLU =
  "/cards/at%20the%20airport/get-your-boarding-pass.PNG";
const HOTEL_ILLU = "/cards/at%20the%20hotel/arrive-at-the-hotel.PNG";
/** Placeholder “cafe” scene — illustration-only demo; not a shipped Pixto pack. */
const CAFE_ILLU = "/cards/core/drink.png";

export default function GeneratedCardDemoPage() {
  return (
    <div className="pb-10">
      <Header title="Generated card demo" backHref="/menu" />
      <div className="space-y-3 px-4 pt-3">
        <p className="px-1 text-[14px] leading-relaxed text-ink-subtle">
          Experimental HTML/CSS card shell for future AI-generated
          illustrations only. Designer PNG cards elsewhere are unchanged.
        </p>
      </div>
      <div className="mx-auto mt-8 flex max-w-5xl flex-col items-center gap-10 px-4 pb-8 sm:grid sm:grid-cols-2 sm:items-stretch sm:justify-items-center lg:grid-cols-3">
        <GeneratedPixtoCard
          illustrationUrl={AIRPORT_ILLU}
          title="Get your boarding pass"
          category="At the airport"
          categoryColour="#5a7d9a"
          iconUrl="/brand/pixtolearn-logo.png"
          cardType="standard"
        />
        <GeneratedPixtoCard
          illustrationUrl={HOTEL_ILLU}
          title="Arrive at the hotel"
          category="At the hotel"
          categoryColour="#a67c52"
          iconUrl="/brand/pixtolearn-logo.png"
        />
        <GeneratedPixtoCard
          illustrationUrl={CAFE_ILLU}
          title="Order a drink at the counter"
          category="At the cafe"
          categoryColour="#4a6572"
          cardType="dense"
        />
      </div>
    </div>
  );
}

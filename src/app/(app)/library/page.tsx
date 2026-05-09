import Image from "next/image";
import { Header } from "@/components/navigation/Header";
import { mockVisualLibrary } from "@/lib/mock/visuals";

const groups = ["self-care", "home", "activity"] as const;

export default function LibraryPage() {
  return (
    <div>
      <Header title="Visual library" />
      <div className="space-y-8 px-4 pb-10 pt-3">
        <p className="px-1 text-[15px] leading-relaxed text-ink-subtle">
          Tap-ready imagery for routines — calm palette, large thumbnails,
          nothing noisy.
        </p>

        {groups.map((cat) => {
          const items = mockVisualLibrary.filter((v) => v.category === cat);
          if (items.length === 0) return null;
          return (
            <section key={cat} className="space-y-3">
              <h2 className="px-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
                {cat.replace("-", " ")}
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {items.map((v) => (
                  <article
                    key={v.id}
                    className="overflow-hidden rounded-[1.35rem] border border-ink/5 bg-cream shadow-card transition hover:shadow-soft"
                  >
                    <div className="relative aspect-square bg-canvas-muted">
                      <Image
                        src={v.thumbnailUrl}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 512px) 50vw, 256px"
                      />
                    </div>
                    <div className="px-3 py-3">
                      <p className="text-[15px] font-semibold leading-snug text-ink">
                        {v.label}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

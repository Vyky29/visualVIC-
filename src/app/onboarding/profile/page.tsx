"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { TranslatedHeader } from "@/components/navigation/TranslatedHeader";
import { MobileScreen } from "@/components/layout/MobileScreen";
import { useProfile } from "@/contexts/ProfileContext";
import type { ChildSex } from "@/lib/types/routine";
import { cn } from "@/lib/utils/cn";

function ChildAvatarPlaceholderIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={cn("h-14 w-14 text-sage/70", className)}
      aria-hidden
    >
      <circle cx="32" cy="22" r="11" fill="currentColor" opacity="0.55" />
      <path
        d="M14 54c2.8-11.2 10.4-17 18-17s15.2 5.8 18 17"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

export default function ProfileOnboardingPage() {
  const router = useRouter();
  const { profile, setProfile } = useProfile();
  const [name, setName] = useState(profile?.displayName ?? "");
  const [sex, setSex] = useState<ChildSex>(profile?.sex ?? "unspecified");
  const [heightCmRaw, setHeightCmRaw] = useState(
    profile?.heightCm != null ? String(profile.heightCm) : "",
  );
  const [avatarFrameScale, setAvatarFrameScale] = useState(
    profile?.avatarFrameScale ?? 1,
  );
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    profile?.avatarUrl,
  );
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!profile) return;
    setName((n) => n || profile.displayName);
    if (profile.avatarUrl) setAvatarPreview(profile.avatarUrl);
    if (profile.sex) setSex(profile.sex);
    if (profile.heightCm != null) setHeightCmRaw(String(profile.heightCm));
    if (profile.avatarFrameScale != null)
      setAvatarFrameScale(profile.avatarFrameScale);
  }, [profile]);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setAvatarPreview(url);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const displayName = name.trim() || "My profile";
    const h = heightCmRaw.trim();
    let heightCm: number | undefined;
    if (h !== "") {
      const n = Math.round(Number(h));
      heightCm = Number.isFinite(n)
        ? Math.min(220, Math.max(40, n))
        : undefined;
    }
    setProfile({
      displayName,
      avatarUrl: avatarPreview,
      sex,
      heightCm,
      avatarFrameScale:
        Math.abs(avatarFrameScale - 1) < 0.02 ? undefined : avatarFrameScale,
    });
    router.push("/dashboard");
  }

  return (
    <div className="min-h-dvh w-full bg-black">
      <div className="mx-auto min-h-dvh w-full max-w-lg bg-canvas">
      <TranslatedHeader titleKey="profile" backHref="/menu" />
      <MobileScreen withChrome={false} className="space-y-10 px-5 pb-16 pt-8 sm:px-6">
        <header className="mx-auto max-w-sm space-y-3 text-center">
          <h1 className="text-[clamp(1.35rem,5vw,1.65rem)] font-semibold tracking-tight text-ink">
            Child Profile
          </h1>
          <p className="text-pretty text-[15px] leading-relaxed text-ink-subtle">
            Create a profile to personalise visual routines. We&apos;ll use your
            child&apos;s photo to build their cartoon avatar.
          </p>
        </header>

        <form className="mx-auto w-full max-w-md space-y-8" onSubmit={handleSubmit}>
          <section className="flex flex-col items-center gap-4">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className={cn(
                "group relative flex h-[10.5rem] w-[10.5rem] items-center justify-center overflow-hidden rounded-[2.35rem] transition",
                avatarPreview
                  ? "bg-canvas-muted ring-2 ring-sage/35 ring-offset-4 ring-offset-canvas hover:ring-sage"
                  : "bg-white shadow-soft ring-1 ring-ink/[0.06] hover:ring-sage/40",
              )}
              aria-label={
                avatarPreview ? "Change child photo" : "Add child photo"
              }
            >
              {avatarPreview ? (
                <div className="absolute inset-0 overflow-hidden">
                  <div
                    className="relative h-full w-full"
                    style={{
                      transform: `scale(${avatarFrameScale})`,
                      transformOrigin: "center center",
                    }}
                  >
                    <Image
                      src={avatarPreview}
                      alt=""
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 px-4">
                  <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-sage-mist/80">
                    <ChildAvatarPlaceholderIcon />
                  </div>
                  <span className="text-[14px] font-medium text-ink">
                    Add a photo
                  </span>
                </div>
              )}
              {avatarPreview ? (
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/55 to-transparent py-3 text-center text-[12px] font-medium text-white opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                  Change photo
                </span>
              ) : null}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onFile}
            />

            {!avatarPreview ? (
              <p className="max-w-xs text-center text-[13px] leading-relaxed text-ink-faint">
                A clear photo of your child&apos;s face helps us create their
                cartoon avatar for routines.
              </p>
            ) : null}

            {avatarPreview ? (
              <label className="flex w-full max-w-sm flex-col gap-2 text-left">
                <span className="text-[13px] font-medium text-ink-subtle">
                  Adjust photo
                </span>
                <input
                  type="range"
                  min={0.85}
                  max={1.2}
                  step={0.01}
                  value={avatarFrameScale}
                  onChange={(e) =>
                    setAvatarFrameScale(Number(e.target.value))
                  }
                  className="w-full accent-sage"
                />
                <p className="text-[12px] leading-relaxed text-ink-faint">
                  Drag to zoom — centre the face for the best cartoon avatar.
                </p>
              </label>
            ) : null}
          </section>

          <Card className="space-y-6 border-0 bg-white/95 px-5 py-7 shadow-soft ring-1 ring-ink/[0.05] sm:px-6 sm:py-8">
            <label className="block space-y-2.5 text-left">
              <span className="text-[13px] font-medium text-ink-subtle">
                Child Name
              </span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Leo"
                className="w-full rounded-2xl border border-ink/10 bg-canvas px-4 py-3.5 text-[17px] outline-none transition-shadow focus:border-sage focus:shadow-[0_0_0_3px_rgba(184,205,191,0.4)]"
              />
            </label>

            <div className="space-y-2.5 text-left">
              <span className="text-[13px] font-medium text-ink-subtle">
                Gender (optional)
              </span>
              <div className="grid grid-cols-3 gap-2.5">
                {(
                  [
                    ["male", "Boy"],
                    ["female", "Girl"],
                    ["unspecified", "Prefer not to say"],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setSex(value)}
                    className={cn(
                      "min-h-touch rounded-2xl border px-2 text-[14px] font-medium transition",
                      sex === value
                        ? "border-sage bg-sage-mist/80 text-ink ring-2 ring-sage/40"
                        : "border-ink/10 bg-canvas text-ink-subtle active:bg-canvas-muted",
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <label className="block space-y-2.5 text-left">
              <span className="text-[13px] font-medium text-ink-subtle">
                Height in cm (optional)
              </span>
              <input
                inputMode="numeric"
                value={heightCmRaw}
                onChange={(e) =>
                  setHeightCmRaw(e.target.value.replace(/[^\d]/g, ""))
                }
                placeholder="e.g. 115"
                className="w-full rounded-2xl border border-ink/10 bg-canvas px-4 py-3.5 text-[17px] outline-none transition-shadow focus:border-sage focus:shadow-[0_0_0_3px_rgba(184,205,191,0.4)]"
              />
            </label>
          </Card>

          <p className="mx-auto max-w-sm text-center text-[13px] leading-relaxed text-ink-faint">
            Your child&apos;s information stays private and is only used to
            personalise routines and create their avatar.
          </p>

          <Button type="submit" className="min-h-touch w-full text-[16px]">
            Save and go home
          </Button>
        </form>
      </MobileScreen>
    </div>
    </div>
  );
}

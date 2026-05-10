"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Header } from "@/components/navigation/Header";
import { MobileScreen } from "@/components/layout/MobileScreen";
import { useProfile } from "@/contexts/ProfileContext";
import type { ChildSex } from "@/lib/types/routine";
import { cn } from "@/lib/utils/cn";

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
    <div className="mx-auto min-h-dvh w-full max-w-lg bg-canvas">
      <Header title="Profile" backHref="/menu" brandLockup />
      <MobileScreen className="space-y-8 px-6 pb-14 pt-6">
        <div className="space-y-2 text-center">
          <p className="text-[22px] font-semibold text-ink">Child profile</p>
          <p className="text-[15px] leading-relaxed text-ink-subtle">
            Name, gender, and height help personalize routines (for example
            clothing).
            The photo and details are saved only on this device.
          </p>
        </div>

        <Card className="flex flex-col items-center gap-8 border-0 bg-white/90 py-8 shadow-soft ring-1 ring-ink/5">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="group relative flex h-[7.5rem] w-[7.5rem] items-center justify-center overflow-hidden rounded-[2rem] bg-canvas-muted ring-2 ring-sage/30 ring-offset-[6px] ring-offset-cream transition hover:ring-sage"
            aria-label="Choose child photo"
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
              <span className="text-[14px] font-medium text-ink-subtle">
                Tap to add photo
              </span>
            )}
            <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/50 to-transparent py-8 opacity-0 transition group-hover:opacity-100" />
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onFile}
          />

          {avatarPreview ? (
            <label className="flex w-full flex-col gap-2 px-1 text-left">
              <span className="text-[13px] font-medium text-ink-subtle">
                Photo framing
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
                Zoom in or out within the frame. Turning the photo into an
                automatic 2D child avatar would need an extra step (design or
                service) in a future version.
              </p>
            </label>
          ) : null}

          <form className="w-full space-y-5 px-1" onSubmit={handleSubmit}>
            <label className="block space-y-2 text-left">
              <span className="text-[13px] font-medium text-ink-subtle">
                Child name
              </span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Leo"
                className="w-full rounded-2xl border border-ink/10 bg-canvas px-4 py-3.5 text-[17px] outline-none transition-shadow focus:border-sage focus:shadow-[0_0_0_3px_rgba(184,205,191,0.4)]"
              />
            </label>

            <div className="space-y-2 text-left">
              <span className="text-[13px] font-medium text-ink-subtle">
                Gender (for clothing routines)
              </span>
              <div className="grid grid-cols-3 gap-2">
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

            <label className="block space-y-2 text-left">
              <span className="text-[13px] font-medium text-ink-subtle">
                Height (cm), optional
              </span>
              <input
                inputMode="numeric"
                value={heightCmRaw}
                onChange={(e) => setHeightCmRaw(e.target.value.replace(/[^\d]/g, ""))}
                placeholder="e.g. 115"
                className="w-full rounded-2xl border border-ink/10 bg-canvas px-4 py-3.5 text-[17px] outline-none transition-shadow focus:border-sage focus:shadow-[0_0_0_3px_rgba(184,205,191,0.4)]"
              />
            </label>

            <Button type="submit" className="min-h-touch w-full text-[16px]">
              Save and go home
            </Button>
          </form>
        </Card>
      </MobileScreen>
    </div>
  );
}

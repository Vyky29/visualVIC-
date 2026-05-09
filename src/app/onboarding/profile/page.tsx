"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Header } from "@/components/navigation/Header";
import { MobileScreen } from "@/components/layout/MobileScreen";
import { useProfile } from "@/contexts/ProfileContext";

export default function ProfileOnboardingPage() {
  const router = useRouter();
  const { profile, setProfile } = useProfile();
  const [name, setName] = useState(profile?.displayName ?? "");
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    profile?.avatarUrl,
  );
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!profile) return;
    setName((n) => n || profile.displayName);
    if (profile.avatarUrl) setAvatarPreview(profile.avatarUrl);
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
    setProfile({
      displayName,
      avatarUrl: avatarPreview,
    });
    router.push("/dashboard");
  }

  return (
    <div className="mx-auto min-h-dvh w-full max-w-lg bg-canvas">
      <Header title="Profile" backHref="/menu" />
      <MobileScreen className="space-y-8 px-6 pb-14 pt-6">
        <div className="space-y-2 text-center">
          <p className="text-[22px] font-semibold text-ink">One profile</p>
          <p className="text-[15px] leading-relaxed text-ink-subtle">
            Name and photo stay on this device for now — enough to make Home
            feel personal.
          </p>
        </div>

        <Card className="flex flex-col items-center gap-8 border-0 bg-white/90 py-8 shadow-soft ring-1 ring-ink/5">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="group relative flex h-[7.5rem] w-[7.5rem] items-center justify-center overflow-hidden rounded-[2rem] bg-canvas-muted ring-2 ring-sage/30 ring-offset-[6px] ring-offset-cream transition hover:ring-sage"
            aria-label="Choose avatar image"
          >
            {avatarPreview ? (
              <Image
                src={avatarPreview}
                alt=""
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <span className="text-[14px] font-medium text-ink-subtle">
                Tap to add
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

          <form className="w-full space-y-5 px-1" onSubmit={handleSubmit}>
            <label className="block space-y-2 text-left">
              <span className="text-[13px] font-medium text-ink-subtle">
                Display name
              </span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-2xl border border-ink/10 bg-canvas px-4 py-3.5 text-[17px] outline-none transition-shadow focus:border-sage focus:shadow-[0_0_0_3px_rgba(184,205,191,0.4)]"
              />
            </label>
            <Button type="submit" className="min-h-touch w-full text-[16px]">
              Save & go to home
            </Button>
          </form>
        </Card>
      </MobileScreen>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Header } from "@/components/navigation/Header";
import {
  authEmailLabel,
  authLayoutNote,
  authPasswordLabel,
  authSubmitSignIn,
  authSubmitSignUp,
  authTabSignIn,
  authTabSignUp,
  authTermsPlaceholder,
  shellBackAria,
  shellHeaderTitle,
} from "@/lib/i18n/app-shell-locale";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";
import { MobileScreen } from "@/components/layout/MobileScreen";

export default function AuthPage() {
  const router = useRouter();
  const cardUiLang = useCardUiLanguage();
  const [email, setEmail] = useState("hello@pixtolearn.app");
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    /** UI-only: wire Supabase Auth later */
    router.push("/onboarding/profile");
  }

  return (
    <div className="min-h-dvh w-full bg-black">
      <div className="mx-auto min-h-dvh w-full max-w-lg bg-canvas">
      <Header
        title={shellHeaderTitle(
          mode === "signin" ? "signIn" : "createAccount",
          cardUiLang,
        )}
        backHref="/welcome"
        backAriaLabel={shellBackAria(cardUiLang)}
      />
      <MobileScreen withChrome={false} className="px-6 pb-12 pt-6">
        <Card className="space-y-6">
          <p className="break-words text-[14px] leading-relaxed text-ink-subtle [overflow-wrap:anywhere]">
            {authLayoutNote(cardUiLang)}
          </p>
          <div className="flex rounded-2xl bg-canvas-muted p-1">
            <button
              type="button"
              className={`flex-1 rounded-xl py-2.5 text-[14px] font-medium transition-colors ${
                mode === "signin"
                  ? "bg-cream text-ink shadow-card"
                  : "text-ink-subtle"
              }`}
              onClick={() => setMode("signin")}
            >
              {authTabSignIn(cardUiLang)}
            </button>
            <button
              type="button"
              className={`flex-1 rounded-xl py-2.5 text-[14px] font-medium transition-colors ${
                mode === "signup"
                  ? "bg-cream text-ink shadow-card"
                  : "text-ink-subtle"
              }`}
              onClick={() => setMode("signup")}
            >
              {authTabSignUp(cardUiLang)}
            </button>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <label className="block space-y-2">
              <span className="text-[13px] font-medium text-ink-subtle">
                {authEmailLabel(cardUiLang)}
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-[16px] outline-none ring-0 transition-shadow focus:border-sage focus:shadow-[0_0_0_3px_rgba(184,205,191,0.45)]"
                autoComplete="email"
              />
            </label>
            <label className="block space-y-2">
              <span className="text-[13px] font-medium text-ink-subtle">
                {authPasswordLabel(cardUiLang)}
              </span>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-[16px] outline-none focus:border-sage focus:shadow-[0_0_0_3px_rgba(184,205,191,0.45)]"
                autoComplete={
                  mode === "signin" ? "current-password" : "new-password"
                }
              />
            </label>
            <Button type="submit" className="w-full">
              {mode === "signin"
                ? authSubmitSignIn(cardUiLang)
                : authSubmitSignUp(cardUiLang)}
            </Button>
          </form>
          <p className="text-center text-[12px] text-ink-faint">
            {authTermsPlaceholder(cardUiLang)}
          </p>
        </Card>
      </MobileScreen>
    </div>
    </div>
  );
}

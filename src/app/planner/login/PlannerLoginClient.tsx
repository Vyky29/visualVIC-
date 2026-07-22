"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MobileScreen } from "@/components/layout/MobileScreen";
import { createBrowserSupabase, isSupabaseConfigured } from "@/lib/supabase/client";
import {
  authEmailLabel,
  authPasswordLabel,
  plannerLoginBlurb,
  plannerLoginPortalLink,
  plannerLoginSubmit,
  plannerLoginTitle,
  plannerSupabaseMissing,
} from "@/lib/i18n/app-shell-locale";
import { useCardUiLanguage } from "@/lib/preferences/use-card-ui-language";
import { markStaffPortalSession } from "@/lib/staff/staff-portal-session";
import { STAFF_PORTAL_ORIGIN } from "@/lib/staff/staff-portal-url";

const STAFF_PORTAL_LOGIN_URL = `${STAFF_PORTAL_ORIGIN}/login.html`;

function PlannerLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = useCardUiLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const returnTo = searchParams.get("return") ?? "/dashboard";

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    const supabase = createBrowserSupabase();
    if (!supabase) return;

    let cancelled = false;
    void supabase.auth.getSession().then(({ data }) => {
      if (cancelled || !data.session) return;
      markStaffPortalSession();
      router.replace(returnTo.startsWith("/") ? returnTo : "/dashboard");
    });
    return () => {
      cancelled = true;
    };
  }, [returnTo, router]);

  if (!isSupabaseConfigured()) {
    return (
      <Card className="space-y-4">
        <p className="text-[14px] leading-relaxed text-ink-subtle">
          {plannerSupabaseMissing(lang)}
        </p>
      </Card>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const supabase = createBrowserSupabase();
    if (!supabase) return;

    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    markStaffPortalSession();
    router.replace(returnTo.startsWith("/") ? returnTo : "/dashboard");
  }

  return (
    <Card className="space-y-5">
      <p className="text-[14px] leading-relaxed text-ink-subtle">
        {plannerLoginBlurb(lang)}
      </p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block space-y-2">
          <span className="text-[13px] font-medium text-ink-subtle">
            {authEmailLabel(lang)}
          </span>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-[16px] outline-none focus:border-sage focus:shadow-[0_0_0_3px_rgba(184,205,191,0.45)]"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-[13px] font-medium text-ink-subtle">
            {authPasswordLabel(lang)}
          </span>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-[16px] outline-none focus:border-sage focus:shadow-[0_0_0_3px_rgba(184,205,191,0.45)]"
          />
        </label>
        {error ? (
          <p className="text-[13px] text-[#C84C57]" role="alert">
            {error}
          </p>
        ) : null}
        <Button type="submit" className="w-full" disabled={loading}>
          {plannerLoginSubmit(lang)}
        </Button>
      </form>
      <p className="text-center text-[13px]">
        <Link
          href={STAFF_PORTAL_LOGIN_URL}
          className="font-medium text-sage underline-offset-4 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {plannerLoginPortalLink(lang)}
        </Link>
      </p>
    </Card>
  );
}

export function PlannerLoginClient() {
  const lang = useCardUiLanguage();

  return (
    <div className="min-h-dvh w-full bg-black">
      <div className="mx-auto min-h-dvh w-full max-w-lg bg-canvas">
        <MobileScreen withChrome={false} className="px-6 pb-12 pt-10">
          <h1 className="mb-6 text-center text-[22px] font-semibold tracking-tight text-ink">
            {plannerLoginTitle(lang)}
          </h1>
          <Suspense fallback={null}>
            <PlannerLoginForm />
          </Suspense>
        </MobileScreen>
      </div>
    </div>
  );
}

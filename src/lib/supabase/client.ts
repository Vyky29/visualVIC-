import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Browser Supabase client. V1 uses mock data; enable real auth by setting env vars.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

let browserClient: SupabaseClient | undefined;

/** Single browser client — avoids multiple GoTrueClient instances in one tab. */
export function createBrowserSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  browserClient ??= createClient(url, key);
  return browserClient;
}

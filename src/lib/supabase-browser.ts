import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _supabaseBrowser: SupabaseClient | null = null;

export function getSupabaseBrowser() {
  if (!_supabaseBrowser) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
      throw new Error(
        "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY"
      );
    }

    _supabaseBrowser = createClient(url, key);
  }
  return _supabaseBrowser;
}

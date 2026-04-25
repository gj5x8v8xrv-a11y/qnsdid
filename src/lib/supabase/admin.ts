import "server-only";

import { createClient } from "@supabase/supabase-js";

import { looksLikeSupabaseSecretKey } from "@/lib/utils";

export function getAdminSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secretKey || !looksLikeSupabaseSecretKey(secretKey)) {
    throw new Error("Supabase admin client is not configured.");
  }

  return createClient(url, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

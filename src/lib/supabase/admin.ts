import "server-only";

import { createClient } from "@supabase/supabase-js";

export function getAdminSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secretKey) {
    throw new Error("Supabase admin client is not configured.");
  }

  const trimmedSecretKey = secretKey.trim();
  if (!trimmedSecretKey.startsWith("sb_secret_") && !trimmedSecretKey.startsWith("eyJ")) {
    throw new Error(
      "SUPABASE_SECRET_KEY 값이 올바르지 않습니다. Supabase API Keys의 Secret key를 Vercel Value 칸에 다시 넣어주세요."
    );
  }

  return createClient(url, trimmedSecretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

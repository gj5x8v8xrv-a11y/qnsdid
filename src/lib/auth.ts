import "server-only";

import { redirect } from "next/navigation";

import { isAllowedAdminEmail } from "@/lib/admin-access";
import { getServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabasePublicConfigured } from "@/lib/utils";

export function isAllowedAdmin(email?: string | null) {
  return isAllowedAdminEmail(email);
}

export async function getCurrentAdminUser() {
  if (!isSupabasePublicConfigured()) return null;

  const supabase = await getServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user || !isAllowedAdmin(user.email)) {
    return null;
  }

  return user;
}

export async function requireAdminUser() {
  const user = await getCurrentAdminUser();

  if (!user) {
    redirect("/admin/login");
  }

  return user;
}

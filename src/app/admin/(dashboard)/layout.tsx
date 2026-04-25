import type { ReactNode } from "react";

import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdminUser } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/utils";

export default async function AdminDashboardLayout({
  children
}: {
  children: ReactNode;
}) {
  if (isSupabaseConfigured()) {
    await requireAdminUser();
  }

  return <AdminShell>{children}</AdminShell>;
}

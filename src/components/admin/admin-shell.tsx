import type { ReactNode } from "react";

import { logoutAction } from "@/app/admin/actions";
import { SubmitButton } from "@/components/ui/submit-button";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export function AdminShell({
  children
}: {
  children: ReactNode;
}) {
  return (
    <div className="page-shell section-space">
      <div className="surface-dark mb-8 overflow-hidden bg-hero-navy px-6 py-7 sm:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-white/50">Management</p>
            <h1 className="mt-3 text-4xl text-white">관리자 페이지</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">
              현장 등록, 수정, 상태 변경, 문의 관리까지 클릭 중심으로 운영할 수 있도록 구성했습니다.
            </p>
          </div>
          <form action={logoutAction}>
            <SubmitButton className="button-secondary !border-white/10 !bg-white !text-deep">
              로그아웃
            </SubmitButton>
          </form>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
        <AdminSidebar />
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
}

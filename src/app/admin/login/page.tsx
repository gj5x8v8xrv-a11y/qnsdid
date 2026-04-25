import { redirect } from "next/navigation";

import { loginAction } from "@/app/admin/actions";
import { AdminSetupNotice } from "@/components/admin/admin-setup-notice";
import { FlashBanner } from "@/components/ui/flash-banner";
import { SubmitButton } from "@/components/ui/submit-button";
import { getCurrentAdminUser } from "@/lib/auth";
import { isSupabasePublicConfigured } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "관리자 로그인"
};

export default async function AdminLoginPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const user = await getCurrentAdminUser();

  if (user) {
    redirect("/admin");
  }

  const params = await searchParams;
  const error = Array.isArray(params.error) ? params.error[0] : params.error;

  return (
    <div className="page-shell section-space">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="surface-dark bg-hero-navy p-8 sm:p-10">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/70">
            Admin Access
          </span>
          <h1 className="mt-6 text-5xl text-white">분양 현장 관리자 로그인</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">
            현장 추가, 수정, 삭제, 상태 변경, 문의 목록 확인까지 한 화면에서 운영할 수 있도록 구성했습니다.
          </p>

          <div className="mt-10 rounded-[1.75rem] border border-white/10 bg-white p-6">
            <FlashBanner message={error} tone="error" />
            {isSupabasePublicConfigured() ? (
              <form action={loginAction} className="mt-4 space-y-4">
                <label className="grid gap-2 text-sm font-semibold">
                  이메일
                  <input className="field-shell" name="email" type="email" required />
                </label>
                <label className="grid gap-2 text-sm font-semibold">
                  비밀번호
                  <input className="field-shell" name="password" type="password" required />
                </label>
                <SubmitButton className="button-primary w-full">관리자 로그인</SubmitButton>
              </form>
            ) : (
              <div className="mt-4 rounded-[1.5rem] bg-slate-50 p-5 text-sm leading-8 text-muted">
                Supabase 환경변수 설정 전에는 로그인 기능이 비활성화됩니다. 아래 안내대로 연결하면 바로 운영 모드로 전환됩니다.
              </div>
            )}
          </div>
        </div>

        <AdminSetupNotice />
      </div>
    </div>
  );
}

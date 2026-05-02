import { getSupabaseConfigMessage } from "@/lib/utils";

export function AdminSetupNotice() {
  const configMessage = getSupabaseConfigMessage();

  return (
    <div className="admin-panel space-y-4 p-8">
      <span className="section-kicker">Setup Required</span>
      <h2 className="text-4xl">Supabase 연결이 필요합니다</h2>
      <p className="max-w-2xl text-sm leading-8 text-muted">
        관리자 로그인, 현장 저장, 이미지 업로드, 상담문의 저장 기능은 Supabase 설정 후 바로 동작합니다.
        현재는 샘플 데이터로 화면만 미리 확인할 수 있도록 구성되어 있습니다.
      </p>
      {configMessage ? (
        <div className="rounded-[1.25rem] border border-red-200 bg-red-50 px-5 py-4 text-sm leading-7 text-red-700">
          {configMessage}
        </div>
      ) : null}
      <div className="rounded-[1.5rem] bg-slate-50 p-5 text-sm leading-8 text-muted">
        `.env.local` 에 `NEXT_PUBLIC_SUPABASE_URL`,
        `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SECRET_KEY`, `ADMIN_EMAILS` 를 추가한 뒤
        `/supabase/schema.sql` 을 실행하면 운영 준비가 완료됩니다.
      </div>
    </div>
  );
}

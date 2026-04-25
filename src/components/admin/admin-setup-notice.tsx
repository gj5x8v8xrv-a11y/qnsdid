import { getSupabaseAdminSetupMessage } from "@/lib/utils";

export function AdminSetupNotice() {
  const detailMessage =
    getSupabaseAdminSetupMessage() ||
    "Supabase 설정을 마치면 현장 저장, 상태 변경, 이미지 업로드가 바로 동작합니다.";

  return (
    <div className="admin-panel space-y-4 p-8">
      <span className="section-kicker">Setup Required</span>
      <h2 className="text-4xl">Supabase 연결이 필요합니다</h2>
      <p className="max-w-2xl text-sm leading-8 text-muted">
        관리자 로그인, 현장 저장, 이미지 업로드, 상담문의 저장 기능은 Supabase 설정 후 바로 동작합니다.
        현재는 샘플 데이터로 화면만 미리 확인할 수 있도록 구성되어 있습니다.
      </p>
      <div className="rounded-[1.5rem] bg-slate-50 p-5 text-sm leading-8 text-muted">
        {detailMessage}
      </div>
      <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-white p-5 text-sm leading-8 text-muted">
        Vercel에서는 `SUPABASE_SECRET_KEY` 가 메모가 아닌 실제 `Value` 칸에 들어가 있어야 합니다.
        `sk_live_...` 나 다른 키를 넣으면 로그인 외 관리자 저장 기능이 동작하지 않습니다.
      </div>
    </div>
  );
}

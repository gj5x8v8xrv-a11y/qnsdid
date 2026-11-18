import Link from "next/link";
import { AdminHomePageSettingsForm } from "@/components/admin/admin-homepage-settings-form";
import { AdminSetupNotice } from "@/components/admin/admin-setup-notice";
import { AdminStatGrid } from "@/components/admin/admin-stat-grid";
import { FlashBanner } from "@/components/ui/flash-banner";
import { getAdminDashboardData } from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const message = Array.isArray(params.message) ? params.message[0] : params.message;
  const error = Array.isArray(params.error) ? params.error[0] : params.error;
  const dashboard = await getAdminDashboardData();

  return (
    <div className="space-y-6">
      <FlashBanner message={message} tone="success" />
      <FlashBanner message={error} tone="error" />
      {!isSupabaseConfigured() ? <AdminSetupNotice /> : null}
      <AdminStatGrid
        activeCount={dashboard.activeCount}
        completedCount={dashboard.completedCount}
        inquiryCount={dashboard.inquiryCount}
      />
      <div className="grid gap-4 md:grid-cols-3">
        <Link className="admin-panel rounded-[1.5rem] p-5 transition hover:-translate-y-0.5 hover:shadow-soft" href="/admin/projects">
          <p className="text-xs uppercase tracking-[0.24em] text-muted">Projects</p>
          <h2 className="mt-3 text-2xl">현장 목록 관리</h2>
          <p className="mt-2 text-sm leading-7 text-muted">등록된 모든 현장을 확인하고 수정합니다.</p>
        </Link>
        <Link className="admin-panel rounded-[1.5rem] p-5 transition hover:-translate-y-0.5 hover:shadow-soft" href="/admin/projects/new">
          <p className="text-xs uppercase tracking-[0.24em] text-muted">New Project</p>
          <h2 className="mt-3 text-2xl">새 현장 등록</h2>
          <p className="mt-2 text-sm leading-7 text-muted">새로운 분양 현장과 사진을 등록합니다.</p>
        </Link>
        <Link className="admin-panel rounded-[1.5rem] p-5 transition hover:-translate-y-0.5 hover:shadow-soft" href="/admin/inquiries">
          <p className="text-xs uppercase tracking-[0.24em] text-muted">Inquiries</p>
          <h2 className="mt-3 text-2xl">상담 문의 관리</h2>
          <p className="mt-2 text-sm leading-7 text-muted">접수된 상담과 처리 상태를 확인합니다.</p>
        </Link>
      </div>
      <AdminHomePageSettingsForm settings={dashboard.homePageSettings} />
      <div className="admin-panel grid gap-6 p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-7">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-muted">Operations Summary</p>
          <h2 className="mt-3 text-3xl">오늘 바로 확인할 운영 포인트</h2>
          <div className="mt-6 grid gap-4">
            {[
              "분양중 현장의 상세 정보와 대표 이미지를 최신 상태로 유지하세요.",
              "완료된 현장은 삭제하지 말고 분양완료로 전환해 실적 페이지로 활용하세요.",
              "상담 문의는 응대중 / 완료 상태로 관리해 후속 응대를 놓치지 마세요."
            ].map((item) => (
              <div className="rounded-[1.5rem] bg-slate-50 px-5 py-5 text-sm leading-8 text-foreground" key={item}>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-muted">Recent Inquiries</p>
          <h2 className="mt-3 text-3xl">최근 문의</h2>
          {dashboard.inquiries.length > 0 ? (
            <div className="mt-6 grid gap-4">
              {dashboard.inquiries.slice(0, 3).map((inquiry) => (
                <div
                  className="rounded-[1.5rem] border border-[color:var(--line)] bg-white px-5 py-5"
                  key={inquiry.id}
                >
                  <p className="text-sm font-semibold">{inquiry.name}</p>
                  <p className="mt-2 text-sm text-muted">{inquiry.projectName || "공통 문의"}</p>
                  <p className="mt-3 text-sm leading-7 text-muted">{inquiry.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-[1.5rem] bg-slate-50 px-5 py-5 text-sm leading-8 text-muted">
              아직 접수된 문의가 없습니다. 공개 사이트 상담문의 폼을 통해 들어온 데이터가 이곳에 표시됩니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

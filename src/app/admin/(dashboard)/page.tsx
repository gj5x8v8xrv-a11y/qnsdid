import { AdminProjectTable } from "@/components/admin/admin-project-table";
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
      <AdminProjectTable projects={dashboard.projects} />
    </div>
  );
}

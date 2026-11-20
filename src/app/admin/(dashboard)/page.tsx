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
  const insightSections = dashboard.visitorInsights
    ? [
        { title: "유입 경로", items: dashboard.visitorInsights.sources },
        { title: "광고 캠페인", items: dashboard.visitorInsights.campaigns },
        { title: "첫 방문 페이지", items: dashboard.visitorInsights.landingPages },
        { title: "접속 기기", items: dashboard.visitorInsights.devices },
        { title: "대략적 지역", items: dashboard.visitorInsights.locations }
      ]
    : [];

  return (
    <div className="space-y-6">
      <FlashBanner message={message} tone="success" />
      <FlashBanner message={error} tone="error" />
      {!isSupabaseConfigured() ? <AdminSetupNotice /> : null}
      <AdminStatGrid
        activeCount={dashboard.activeCount}
        completedCount={dashboard.completedCount}
        inquiryCount={dashboard.inquiryCount}
        todayVisitorCount={dashboard.visitorCounts[0]?.count || 0}
      />
      <div className="admin-panel p-6 lg:p-7">
        <p className="text-xs uppercase tracking-[0.32em] text-muted">Daily Visitors</p>
        <h2 className="mt-3 text-3xl">최근 7일 방문자</h2>
        <p className="mt-2 text-sm leading-7 text-muted">
          같은 브라우저의 반복 방문은 하루에 한 번만 집계합니다.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
          {dashboard.visitorCounts.map((item) => (
            <div className="rounded-[1.25rem] bg-slate-50 px-4 py-4 text-center" key={item.date}>
              <p className="text-xs text-muted">{item.date.slice(5).replace("-", ".")}</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">{item.count}</p>
              <p className="mt-1 text-xs text-muted">명</p>
            </div>
          ))}
        </div>
      </div>
      <div className="admin-panel p-6 lg:p-7">
        <p className="text-xs uppercase tracking-[0.32em] text-muted">Traffic Sources</p>
        <h2 className="mt-3 text-3xl">오늘 방문자 유입 정보</h2>
        <p className="mt-2 text-sm leading-7 text-muted">
          오늘 처음 방문한 경로를 기준으로 집계합니다. IP 원문은 저장하지 않으며 지역 정보는 실제 위치와 다를 수 있습니다.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {insightSections.map((section) => (
            <div className="rounded-[1.25rem] bg-slate-50 p-4" key={section.title}>
              <h3 className="text-sm font-bold text-slate-900">{section.title}</h3>
              {section.items.length > 0 ? (
                <div className="mt-4 space-y-2.5">
                  {section.items.map((item) => (
                    <div className="flex items-start justify-between gap-3 text-sm" key={item.label}>
                      <span className="min-w-0 break-all text-muted">{item.label}</span>
                      <strong className="shrink-0 text-slate-900">{item.count}명</strong>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm leading-6 text-muted">아직 기록이 없습니다.</p>
              )}
            </div>
          ))}
        </div>
      </div>
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

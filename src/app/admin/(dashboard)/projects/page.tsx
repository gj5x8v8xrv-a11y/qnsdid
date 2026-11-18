import { AdminProjectTable } from "@/components/admin/admin-project-table";
import { FlashBanner } from "@/components/ui/flash-banner";
import { getProjects } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const message = Array.isArray(params.message) ? params.message[0] : params.message;
  const error = Array.isArray(params.error) ? params.error[0] : params.error;
  const projects = await getProjects();

  return (
    <div className="space-y-6">
      <FlashBanner message={message} tone="success" />
      <FlashBanner message={error} tone="error" />
      <div className="admin-panel px-6 py-6 sm:px-8">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Project Management</p>
        <h1 className="mt-3 text-4xl">현장 목록</h1>
        <p className="mt-3 text-sm leading-7 text-muted">
          현장 상태 변경, 상세정보 수정, 미리보기와 삭제를 한곳에서 관리합니다.
        </p>
      </div>
      <AdminProjectTable projects={projects} />
    </div>
  );
}

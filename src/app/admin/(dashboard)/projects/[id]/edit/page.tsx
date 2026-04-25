import { notFound } from "next/navigation";

import { deleteProjectAction, updateProjectAction } from "@/app/admin/actions";
import { AdminProjectForm } from "@/components/admin/admin-project-form";
import { AdminSetupNotice } from "@/components/admin/admin-setup-notice";
import { FlashBanner } from "@/components/ui/flash-banner";
import { SubmitButton } from "@/components/ui/submit-button";
import { getProjectById } from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminEditProjectPage({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  const message = Array.isArray(query.message) ? query.message[0] : query.message;
  const error = Array.isArray(query.error) ? query.error[0] : query.error;

  return (
    <div className="space-y-6">
      <FlashBanner message={message} tone="success" />
      <FlashBanner message={error} tone="error" />
      {!isSupabaseConfigured() ? <AdminSetupNotice /> : null}
      <AdminProjectForm
        action={updateProjectAction}
        description="현장 정보를 수정하면 상세 페이지와 리스트, SEO 메타가 함께 업데이트됩니다."
        project={project}
        submitLabel="변경사항 저장"
        title="현장 수정"
      />

      <div className="glass-panel p-6">
        <h2 className="text-3xl text-red-700">위험 작업</h2>
        <p className="mt-3 text-sm leading-7 text-muted">
          아래 버튼을 누르면 현장 정보와 상세 이미지가 함께 삭제됩니다.
        </p>
        <form action={deleteProjectAction} className="mt-5">
          <input name="projectId" type="hidden" value={project.id} />
          <SubmitButton className="button-secondary !text-red-700">
            이 현장 삭제하기
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}

import { createProjectAction } from "@/app/admin/actions";
import { AdminProjectForm } from "@/components/admin/admin-project-form";
import { AdminSetupNotice } from "@/components/admin/admin-setup-notice";
import { FlashBanner } from "@/components/ui/flash-banner";
import { isSupabaseConfigured } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "현장 등록"
};

export default async function AdminNewProjectPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const error = Array.isArray(params.error) ? params.error[0] : params.error;

  return (
    <div className="space-y-6">
      <FlashBanner message={error} tone="error" />
      {!isSupabaseConfigured() ? <AdminSetupNotice /> : null}
      <AdminProjectForm
        action={createProjectAction}
        description="slug를 입력하면 `/projects/[slug]` 상세 페이지가 자동으로 연결됩니다. 대표 이미지와 상세 이미지는 이 화면에서 바로 업로드할 수 있습니다."
        submitLabel="현장 등록하기"
        title="새 현장 추가"
      />
    </div>
  );
}

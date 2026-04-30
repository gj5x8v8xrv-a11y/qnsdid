import { deleteProjectImageAction } from "@/app/admin/actions";
import { AdminProjectImageManager } from "@/components/admin/admin-project-image-manager";
import { SubmitButton } from "@/components/ui/submit-button";
import { PROJECT_IMAGE_TYPE_OPTIONS } from "@/lib/constants";
import type { ProjectImage, ProjectWithImages } from "@/lib/types";

type AdminProjectFormProps = {
  action: (formData: FormData) => Promise<void>;
  project?: ProjectWithImages | null;
  title: string;
  description: string;
  submitLabel: string;
};

function groupImagesByType(images: ProjectImage[]) {
  return images.reduce<Record<string, ProjectImage[]>>((accumulator, image) => {
    if (!accumulator[image.imageType]) {
      accumulator[image.imageType] = [];
    }
    accumulator[image.imageType].push(image);
    return accumulator;
  }, {});
}

export function AdminProjectForm({
  action,
  project,
  title,
  description,
  submitLabel
}: AdminProjectFormProps) {
  const imagesByType = groupImagesByType(project?.gallery || []);

  return (
    <div className="admin-panel overflow-hidden">
      <div className="border-b border-black/5 px-6 py-6 sm:px-8">
        <h2 className="text-4xl">{title}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-8 text-muted">{description}</p>
      </div>

      <form action={action} className="space-y-8 px-6 py-8 sm:px-8">
        {project ? (
          <>
            <input name="projectId" type="hidden" value={project.id} />
            <input name="previousSlug" type="hidden" value={project.slug} />
          </>
        ) : null}

        <section className="grid gap-4 rounded-[1.75rem] bg-slate-50 p-5 sm:p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-muted">Basic Info</p>
            <h3 className="mt-2 text-2xl">기본 정보</h3>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold">
              현장명
              <input className="field-shell" defaultValue={project?.name || ""} name="name" required />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              slug
              <input
                className="field-shell"
                defaultValue={project?.slug || ""}
                name="slug"
                placeholder="cheongju-prugio"
                required
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              상태
              <select className="field-shell" defaultValue={project?.status || "active"} name="status">
                <option value="active">분양중</option>
                <option value="completed">분양완료</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              지역
              <input
                className="field-shell"
                defaultValue={project?.region || ""}
                name="region"
                placeholder="청주"
                required
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              시/도
              <input
                className="field-shell"
                defaultValue={project?.province || ""}
                name="province"
                placeholder="충청북도"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              시/군/구
              <input
                className="field-shell"
                defaultValue={project?.city || ""}
                name="city"
                placeholder="청주시 흥덕구"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold md:col-span-2">
              상세주소
              <input
                className="field-shell"
                defaultValue={project?.address || ""}
                name="address"
                placeholder="가경동 000-0"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              세대수
              <input
                className="field-shell"
                defaultValue={project?.householdCount || ""}
                name="householdCount"
                placeholder="총 582세대"
                required
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              평형
              <input
                className="field-shell"
                defaultValue={project?.unitPlan || ""}
                name="unitPlan"
                placeholder="59㎡ / 84㎡"
                required
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              입주예정일
              <input
                className="field-shell"
                defaultValue={project?.expectedMoveIn || ""}
                name="expectedMoveIn"
                placeholder="2028년 06월 예정"
                required
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              전화문의 번호
              <input
                className="field-shell"
                defaultValue={project?.contactPhone || ""}
                name="contactPhone"
                placeholder="1533-8170"
                required
              />
            </label>
          </div>
        </section>

        <section className="grid gap-4 rounded-[1.75rem] bg-slate-50 p-5 sm:p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-muted">Marketing Copy</p>
            <h3 className="mt-2 text-2xl">현장 소개 문구</h3>
          </div>
          <div className="grid gap-5">
            <label className="grid gap-2 text-sm font-semibold">
              분양조건
              <textarea
                className="field-shell min-h-[120px] resize-y"
                defaultValue={project?.salesConditions || ""}
                name="salesConditions"
                required
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              프리미엄 요약
              <textarea
                className="field-shell min-h-[120px] resize-y"
                defaultValue={project?.premiumSummary || ""}
                name="premiumSummary"
                required
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              입지 설명
              <textarea
                className="field-shell min-h-[140px] resize-y"
                defaultValue={project?.locationDescription || ""}
                name="locationDescription"
                required
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              네이버 예약 URL
              <input
                className="field-shell"
                defaultValue={project?.reservationUrl || ""}
                name="reservationUrl"
                placeholder="https://booking.naver.com/..."
              />
            </label>
          </div>
        </section>

        <AdminProjectImageManager
          coverImageUrl={project?.coverImageUrl}
          existingImages={project?.gallery || []}
          projectId={project?.id}
        />

        {project?.gallery.length ? (
          <section className="space-y-5">
            <div>
              <h3 className="text-2xl">등록된 이미지</h3>
              <p className="mt-2 text-sm leading-8 text-muted">
                업로드된 이미지는 유형별로 확인할 수 있으며, 필요 없는 이미지는 바로 삭제할 수 있습니다.
              </p>
            </div>

            <div className="grid gap-5">
              {PROJECT_IMAGE_TYPE_OPTIONS.filter((option) => (imagesByType[option.value] || []).length > 0).map((option) => (
                <div
                  className="rounded-[1.5rem] border border-[color:var(--line)] bg-white p-5 shadow-soft"
                  key={option.value}
                >
                  <div className="mb-4">
                    <h4 className="text-xl">{option.label}</h4>
                    <p className="mt-2 text-sm leading-7 text-muted">{option.description}</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {(imagesByType[option.value] || []).map((image) => (
                      <div
                        className="rounded-[1.5rem] border border-[color:var(--line)] bg-slate-50 p-3"
                        key={image.id}
                      >
                        <img
                          alt={`${project.name} ${option.label}`}
                          className="aspect-[4/3] w-full rounded-[1.25rem] object-cover"
                          src={image.imageUrl}
                        />
                        <form action={deleteProjectImageAction} className="mt-3">
                          <input name="imageId" type="hidden" value={image.id} />
                          <input name="projectId" type="hidden" value={project.id} />
                          <SubmitButton className="button-secondary w-full !text-red-600">
                            이미지 삭제
                          </SubmitButton>
                        </form>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <div className="flex flex-wrap gap-3 rounded-[1.75rem] bg-deep px-5 py-5">
          <SubmitButton className="button-accent">{submitLabel}</SubmitButton>
          <p className="self-center text-sm leading-7 text-white/70">
            저장 후 프론트 페이지와 검색 정보가 함께 갱신됩니다.
          </p>
        </div>
      </form>
    </div>
  );
}

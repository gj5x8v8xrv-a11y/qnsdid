import { submitInquiryAction } from "@/app/admin/actions";
import { SubmitButton } from "@/components/ui/submit-button";
import type { Project } from "@/lib/types";

export function InquiryForm({
  projects,
  selectedProjectId
}: {
  projects: Project[];
  selectedProjectId?: string | null;
}) {
  return (
    <form action={submitInquiryAction} className="surface-panel space-y-6 p-6 sm:p-8 lg:p-10">
      <div>
        <p className="text-xs uppercase tracking-[0.34em] text-muted">Consulting Form</p>
        <h2 className="mt-3 text-3xl">상담 정보를 남겨주시면 빠르게 연락드립니다</h2>
        <p className="mt-3 text-sm leading-7 text-muted">
          관심 현장, 방문 희망 내용, 궁금한 점을 남겨주시면 담당자가 상담을 도와드립니다.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold">
          이름
          <input className="field-shell" name="name" placeholder="홍길동" required />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          연락처
          <input className="field-shell" name="phone" placeholder="010-0000-0000" required />
        </label>
      </div>

      <label className="grid gap-2 text-sm font-semibold">
        관심 현장
        <select className="field-shell" defaultValue={selectedProjectId || ""} name="projectId">
          <option value="">현장 선택</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-2 text-sm font-semibold">
        내용
        <textarea
          className="field-shell min-h-[190px] resize-y"
          name="message"
          placeholder="관심 타입, 방문 희망일, 궁금한 점을 남겨주세요."
          required
        />
      </label>

      <div className="rounded-[1.5rem] bg-slate-50 px-4 py-4 text-sm leading-7 text-muted">
        남겨주신 문의는 확인 후 순차적으로 연락드리며, 방문 일정과 상담 내용을 함께 안내해드립니다.
      </div>

      <SubmitButton className="button-primary w-full">상담 문의 접수</SubmitButton>
    </form>
  );
}

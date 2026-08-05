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
    <form action={submitInquiryAction} className="surface-panel space-y-5 p-5 sm:space-y-6 sm:p-8 lg:p-10">
      <div>
        <p className="text-xs uppercase tracking-[0.34em] text-muted">Inquiry Form</p>
        <h2 className="mt-3 text-[1.8rem] leading-[1.2] sm:text-3xl">문의 남기기</h2>
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
          className="field-shell min-h-[160px] resize-y sm:min-h-[190px]"
          name="message"
          placeholder="관심 타입, 방문 희망일, 궁금한 점을 남겨주세요."
          required
        />
      </label>

      <label className="flex items-start gap-3 rounded-[1.5rem] bg-slate-50 px-4 py-4 text-sm leading-7 text-muted">
        <input className="mt-1 h-4 w-4 shrink-0" name="privacyConsent" required type="checkbox" />
        <span>
          개인정보 수집 및 이용에 동의합니다. 자세한 내용은{" "}
          <a className="font-semibold text-deep underline" href="/privacy" rel="noreferrer" target="_blank">
            개인정보처리방침
          </a>
          에서 확인하실 수 있습니다.
        </span>
      </label>

      <SubmitButton className="button-primary w-full">상담 문의 접수</SubmitButton>
    </form>
  );
}

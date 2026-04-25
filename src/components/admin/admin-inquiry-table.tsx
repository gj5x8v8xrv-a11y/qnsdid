import { updateInquiryStatusAction } from "@/app/admin/actions";
import { StatusBadge } from "@/components/ui/status-badge";
import { SubmitButton } from "@/components/ui/submit-button";
import type { Inquiry } from "@/lib/types";
import { formatDateLabel } from "@/lib/utils";

export function AdminInquiryTable({ inquiries }: { inquiries: Inquiry[] }) {
  return (
    <div className="admin-panel overflow-hidden">
      <div className="border-b border-black/5 px-6 py-6">
        <h2 className="text-3xl">상담문의 목록</h2>
        <p className="mt-2 text-sm leading-8 text-muted">
          접수된 문의를 확인하고 진행 상태를 직접 업데이트할 수 있습니다.
        </p>
      </div>

      {inquiries.length > 0 ? (
        <div className="grid gap-5 p-6 lg:p-7">
          {inquiries.map((inquiry) => (
            <article
              className="rounded-[1.75rem] border border-[color:var(--line)] bg-white p-5 shadow-soft"
              key={inquiry.id}
            >
              <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <StatusBadge status={inquiry.status} />
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      {inquiry.projectName || "공통 문의"}
                    </span>
                    <span className="text-xs text-muted">{formatDateLabel(inquiry.createdAt)}</span>
                  </div>

                  <div>
                    <h3 className="text-2xl">{inquiry.name}</h3>
                    <p className="mt-2 text-sm font-medium text-muted">{inquiry.phone}</p>
                  </div>

                  <div className="rounded-[1.4rem] bg-slate-50 px-4 py-4 text-sm leading-8 text-muted">
                    {inquiry.message}
                  </div>
                </div>

                <form action={updateInquiryStatusAction} className="w-full space-y-3 xl:w-[240px]">
                  <input name="inquiryId" type="hidden" value={inquiry.id} />
                  <select className="field-shell" defaultValue={inquiry.status} name="status">
                    <option value="new">신규</option>
                    <option value="processing">응대중</option>
                    <option value="done">완료</option>
                  </select>
                  <SubmitButton className="button-primary w-full">상태 저장</SubmitButton>
                </form>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="p-6 lg:p-7">
          <div className="rounded-[1.75rem] bg-slate-50 p-8 text-center text-sm leading-8 text-muted">
            아직 접수된 문의가 없습니다. 공개 사이트 상담문의 폼으로 들어온 데이터가 이곳에 표시됩니다.
          </div>
        </div>
      )}
    </div>
  );
}

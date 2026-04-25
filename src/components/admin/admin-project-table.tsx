import Link from "next/link";

import { deleteProjectAction, updateProjectStatusAction } from "@/app/admin/actions";
import { StatusBadge } from "@/components/ui/status-badge";
import { SubmitButton } from "@/components/ui/submit-button";
import type { Project } from "@/lib/types";

export function AdminProjectTable({ projects }: { projects: Project[] }) {
  return (
    <div className="admin-panel overflow-hidden">
      <div className="flex flex-col gap-4 border-b border-black/5 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl">현장 목록</h2>
          <p className="mt-2 text-sm leading-8 text-muted">
            분양중/분양완료 상태를 빠르게 관리하고 상세 수정 페이지로 이동할 수 있습니다.
          </p>
        </div>
        <Link className="button-primary" href="/admin/projects/new">
          새 현장 등록
        </Link>
      </div>

      {projects.length > 0 ? (
        <div className="grid gap-5 p-6 lg:p-7">
          {projects.map((project) => (
            <article
              className="rounded-[1.75rem] border border-[color:var(--line)] bg-white p-5 shadow-soft"
              key={project.id}
            >
              <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                <div className="min-w-0 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <StatusBadge status={project.status} />
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      {project.location}
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 font-mono text-[11px] text-slate-600">
                      /projects/{project.slug}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl leading-tight">{project.name}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted">{project.premiumSummary}</p>
                  </div>

                  <dl className="grid gap-3 text-sm sm:grid-cols-3">
                    <div className="rounded-[1.25rem] bg-slate-50 px-4 py-4">
                      <dt className="text-muted">세대수</dt>
                      <dd className="mt-1 font-semibold">{project.householdCount}</dd>
                    </div>
                    <div className="rounded-[1.25rem] bg-slate-50 px-4 py-4">
                      <dt className="text-muted">평형</dt>
                      <dd className="mt-1 font-semibold">{project.unitPlan}</dd>
                    </div>
                    <div className="rounded-[1.25rem] bg-slate-50 px-4 py-4">
                      <dt className="text-muted">입주예정일</dt>
                      <dd className="mt-1 font-semibold">{project.expectedMoveIn}</dd>
                    </div>
                  </dl>
                </div>

                <div className="flex w-full flex-col gap-3 xl:w-[320px]">
                  <form action={updateProjectStatusAction}>
                    <input name="projectId" type="hidden" value={project.id} />
                    <input
                      name="status"
                      type="hidden"
                      value={project.status === "active" ? "completed" : "active"}
                    />
                    <SubmitButton className="button-secondary w-full">
                      {project.status === "active" ? "분양완료로 전환" : "분양중으로 복귀"}
                    </SubmitButton>
                  </form>

                  <Link className="button-primary w-full" href={`/admin/projects/${project.id}/edit`}>
                    현장 수정
                  </Link>
                  <Link className="button-secondary w-full" href={`/projects/${project.slug}`}>
                    상세 미리보기
                  </Link>
                  <form action={deleteProjectAction}>
                    <input name="projectId" type="hidden" value={project.id} />
                    <SubmitButton className="button-secondary w-full !text-red-600">
                      현장 삭제
                    </SubmitButton>
                  </form>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="p-6 lg:p-7">
          <div className="rounded-[1.75rem] bg-slate-50 p-8 text-center text-sm leading-8 text-muted">
            아직 등록된 현장이 없습니다. 우측 상단의 새 현장 등록 버튼으로 바로 시작할 수 있습니다.
          </div>
        </div>
      )}
    </div>
  );
}

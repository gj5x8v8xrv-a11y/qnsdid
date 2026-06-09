import Link from "next/link";

import { StatusBadge } from "@/components/ui/status-badge";
import { ProjectVisual } from "@/components/ui/project-visual";
import type { Project } from "@/lib/types";
import { formatPhoneHref, getProjectAddressLine, getProjectCardMeta } from "@/lib/utils";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="surface-panel overflow-hidden rounded-[2rem] border border-black/8 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(15,23,42,0.08)]">
      <div className="relative p-3 pb-0 sm:p-4">
        <ProjectVisual imageUrl={project.coverImageUrl} title={project.name} />
        <div className="absolute left-5 top-5 sm:left-8 sm:top-8">
          <StatusBadge status={project.status} />
        </div>
      </div>
      <div className="space-y-3 px-4 pb-4 pt-4 sm:space-y-5 sm:px-6 sm:pb-6 sm:pt-6">
        <div className="space-y-2 sm:space-y-3">
          <p className="text-[0.72rem] font-medium tracking-[0.08em] text-muted sm:text-sm sm:tracking-normal">
            {getProjectCardMeta(project)}
          </p>
          <h3 className="text-[1.2rem] leading-[1.2] sm:text-[1.85rem] sm:leading-[1.15]">{project.name}</h3>
          <p className="hidden text-sm leading-7 text-slate-700 sm:block">{getProjectAddressLine(project)}</p>
          <p className="hidden text-sm leading-7 text-muted sm:block">{project.premiumSummary}</p>
        </div>

        <dl className="hidden grid-cols-2 gap-4 rounded-[1.6rem] bg-slate-50 px-4 py-5 text-sm sm:grid">
          <div>
            <dt className="text-muted">세대수</dt>
            <dd className="mt-1 font-semibold text-foreground">{project.householdCount}</dd>
          </div>
          <div>
            <dt className="text-muted">평형</dt>
            <dd className="mt-1 font-semibold text-foreground">{project.unitPlan}</dd>
          </div>
          <div>
            <dt className="text-muted">입주예정</dt>
            <dd className="mt-1 font-semibold text-foreground">{project.expectedMoveIn}</dd>
          </div>
          <div>
            <dt className="text-muted">상담번호</dt>
            <dd className="mt-1 font-semibold text-foreground">{project.contactPhone}</dd>
          </div>
        </dl>

        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:gap-3">
          <a className="button-secondary flex-1 text-[0.95rem] font-semibold sm:text-sm" href={formatPhoneHref(project.contactPhone)}>
            전화문의
          </a>
          <Link className="button-primary flex-1" href={`/projects/${project.slug}`}>
            상세보기
          </Link>
        </div>
      </div>
    </article>
  );
}

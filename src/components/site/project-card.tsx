import Link from "next/link";

import { StatusBadge } from "@/components/ui/status-badge";
import { ProjectVisual } from "@/components/ui/project-visual";
import type { Project } from "@/lib/types";
import { formatPhoneHref, getProjectAddressLine, getProjectCardMeta } from "@/lib/utils";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="surface-panel overflow-hidden rounded-[2rem] border border-black/8 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(15,23,42,0.08)]">
      <div className="relative p-4 pb-0">
        <ProjectVisual imageUrl={project.coverImageUrl} title={project.name} />
        <div className="absolute left-8 top-8">
          <StatusBadge status={project.status} />
        </div>
      </div>
      <div className="space-y-5 px-5 pb-6 pt-6 sm:px-6">
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted">{getProjectCardMeta(project)}</p>
          <h3 className="text-[1.6rem] leading-[1.15] sm:text-[1.85rem]">{project.name}</h3>
          <p className="text-sm leading-7 text-slate-700">{getProjectAddressLine(project)}</p>
          <p className="text-sm leading-7 text-muted">{project.premiumSummary}</p>
        </div>

        <dl className="grid grid-cols-2 gap-4 rounded-[1.6rem] bg-slate-50 px-4 py-5 text-sm">
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

        <div className="flex flex-col gap-3 sm:flex-row">
          <a className="button-secondary flex-1" href={formatPhoneHref(project.contactPhone)}>
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

import Link from "next/link";

import { StatusBadge } from "@/components/ui/status-badge";
import { ProjectVisual } from "@/components/ui/project-visual";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="surface-panel overflow-hidden rounded-[2rem] bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative p-4 pb-0">
        <ProjectVisual imageUrl={project.coverImageUrl} title={project.name} />
        <div className="absolute left-8 top-8">
          <StatusBadge status={project.status} />
        </div>
      </div>
      <div className="space-y-5 px-6 pb-6 pt-6">
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted">{project.location}</p>
          <h3 className="text-[1.65rem] leading-[1.2] sm:text-[1.8rem]">{project.name}</h3>
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

        <div className="rounded-[1.5rem] bg-slate-50 px-4 py-4 text-sm leading-7 text-muted">
          {project.salesConditions}
        </div>

        <div className="flex gap-3">
          <a className="button-secondary flex-1" href={`tel:${project.contactPhone.replace(/[^+\d]/g, "")}`}>
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

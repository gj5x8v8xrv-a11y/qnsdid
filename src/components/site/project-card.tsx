import Link from "next/link";

import { StatusBadge } from "@/components/ui/status-badge";
import { ProjectVisual } from "@/components/ui/project-visual";
import type { HomePageSettings, Project } from "@/lib/types";
import {
  formatPhoneHref,
  getDefaultHomePageSettings,
  getProjectAddressLine,
  getProjectCardMeta,
  getProjectRegion
} from "@/lib/utils";

export function ProjectCard({
  project,
  settings = getDefaultHomePageSettings()
}: {
  project: Project;
  settings?: HomePageSettings;
}) {
  return (
    <article className="surface-panel overflow-hidden rounded-[1.7rem] border border-black/8 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(15,23,42,0.08)] sm:rounded-[2rem]">
      <div className="relative p-2.5 pb-0 sm:p-4">
        <ProjectVisual
          className="aspect-[16/8.9] sm:aspect-[16/10]"
          imageUrl={project.coverImageUrl}
          title={project.name}
        />
        <div className="absolute left-4 top-4 sm:left-8 sm:top-8">
          <StatusBadge status={project.status} />
        </div>
      </div>
      <div className="space-y-2.5 px-4 pb-4 pt-3 sm:space-y-5 sm:px-6 sm:pb-6 sm:pt-6">
        <div className="space-y-2 sm:space-y-3">
          <p className="text-[11px] font-medium tracking-[0.02em] text-muted sm:hidden">
            {getProjectRegion(project)} · {settings.projectCardPhoneLabel} {project.contactPhone}
          </p>
          <p className="hidden text-[length:var(--home-card-meta-size,11.2px)] font-medium tracking-[0.06em] text-muted sm:block sm:text-sm sm:tracking-normal">
            {getProjectCardMeta(project)}
          </p>
          <h3 className="text-[1.7rem] leading-[1.16] tracking-[-0.03em] sm:text-[1.85rem] sm:leading-[1.15]">
            {project.name}
          </h3>
          <p className="hidden text-[length:var(--home-card-body-size,13px)] leading-7 text-slate-700 sm:block">{getProjectAddressLine(project)}</p>
          <p className="hidden text-[length:var(--home-card-body-size,13px)] leading-7 text-muted sm:block">{project.premiumSummary}</p>
        </div>

        <dl className="hidden grid-cols-2 gap-4 rounded-[1.6rem] bg-slate-50 px-4 py-5 text-[length:var(--home-card-label-size,13px)] sm:grid sm:text-sm">
          <div>
            <dt className="text-muted">{settings.projectCardHouseholdLabel}</dt>
            <dd className="mt-1 font-semibold text-foreground">{project.householdCount}</dd>
          </div>
          <div>
            <dt className="text-muted">{settings.projectCardUnitPlanLabel}</dt>
            <dd className="mt-1 font-semibold text-foreground">{project.unitPlan}</dd>
          </div>
          <div>
            <dt className="text-muted">{settings.projectCardMoveInLabel}</dt>
            <dd className="mt-1 font-semibold text-foreground">{project.expectedMoveIn}</dd>
          </div>
          <div>
            <dt className="text-muted">{settings.projectCardPhoneLabel}</dt>
            <dd className="mt-1 font-semibold text-foreground">{project.contactPhone}</dd>
          </div>
        </dl>

            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:gap-3">
              <a
                className="button-primary min-h-[40px] rounded-[1rem] px-3 text-[13px] leading-none font-semibold tracking-[-0.015em] sm:min-h-0 sm:flex-1 sm:rounded-full sm:px-5 sm:text-sm"
                href={formatPhoneHref(project.contactPhone)}
              >
                {settings.projectCardPhoneButtonLabel}
              </a>
              <Link
                className="button-secondary min-h-[40px] rounded-[1rem] px-3 text-[13px] leading-none font-semibold tracking-[-0.015em] sm:min-h-0 sm:flex-1 sm:rounded-full sm:px-5 sm:text-sm"
                href={`/projects/${project.slug}`}
              >
                {settings.projectCardDetailButtonLabel}
              </Link>
        </div>
      </div>
    </article>
  );
}

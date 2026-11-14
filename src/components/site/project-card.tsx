import Link from "next/link";

import { ProjectVisual } from "@/components/ui/project-visual";
import type { HomePageSettings, Project } from "@/lib/types";
import {
  formatPhoneHref,
  getDefaultHomePageSettings,
  getProjectAddressLine,
  NAVER_INQUIRY_URL
} from "@/lib/utils";

export function ProjectCard({
  project,
  settings = getDefaultHomePageSettings()
}: {
  project: Project;
  settings?: HomePageSettings;
}) {
  return (
    <article className="overflow-hidden rounded-[1.5rem] border border-black/10 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.07)] sm:rounded-[2rem]">
      <div className="p-2.5 pb-0 sm:p-3.5">
        <ProjectVisual
          className="aspect-[16/10]"
          imageUrl={project.coverImageUrl}
          title={project.name}
        />
      </div>
      <div className="px-5 pb-5 pt-5 sm:px-7 sm:pb-7 sm:pt-6">
        <div>
          <h3 className="text-[1.35rem] leading-[1.25] tracking-[-0.035em] sm:text-[1.75rem]">
            {project.name}
          </h3>
          <p className="mt-2 text-[13px] leading-6 text-muted sm:text-sm">
            {getProjectAddressLine(project)}
          </p>
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-x-5 gap-y-4 border-y border-black/8 py-5 text-sm">
          <div>
            <dt className="text-muted">{settings.projectCardHouseholdLabel}</dt>
            <dd className="mt-1 font-semibold leading-6 text-foreground">{project.householdCount}</dd>
          </div>
          <div>
            <dt className="text-muted">{settings.projectCardUnitPlanLabel}</dt>
            <dd className="mt-1 font-semibold leading-6 text-foreground">{project.unitPlan}</dd>
          </div>
          <div>
            <dt className="text-muted">{settings.projectCardMoveInLabel}</dt>
            <dd className="mt-1 font-semibold leading-6 text-foreground">{project.expectedMoveIn}</dd>
          </div>
          <div>
            <dt className="text-muted">대표번호</dt>
            <dd className="mt-1 font-semibold leading-6 text-foreground">{project.contactPhone}</dd>
          </div>
        </dl>

        <div className="mt-5 grid grid-cols-2 gap-2.5">
          <a
            className="button-primary !min-h-[42px] !rounded-xl !px-3 !py-2.5 !text-[13px]"
            href={NAVER_INQUIRY_URL}
            rel="noreferrer"
            target="_blank"
          >
            문의하기
          </a>
          <a
            className="button-secondary !min-h-[42px] !rounded-xl !px-3 !py-2.5 !text-[13px]"
            href={formatPhoneHref(project.contactPhone)}
          >
            전화연결
          </a>
        </div>
        <Link className="mt-4 block text-center text-xs font-semibold text-muted underline decoration-black/15 underline-offset-4" href={`/projects/${project.slug}`}>
          현장 상세정보
        </Link>
      </div>
    </article>
  );
}

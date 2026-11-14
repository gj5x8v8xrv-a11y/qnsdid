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
    <article className="group overflow-hidden rounded-none border border-white/80 bg-white/62 shadow-[0_14px_40px_rgba(0,0,0,0.06)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-black/10 hover:bg-white/78 hover:shadow-[0_22px_55px_rgba(0,0,0,0.1)]">
      <div className="p-2.5 pb-0 sm:p-3.5">
        <ProjectVisual
          className="aspect-[16/10]"
          imageUrl={project.coverImageUrl}
          title={project.name}
        />
      </div>
      <div className="px-5 pb-5 pt-5 sm:px-7 sm:pb-7 sm:pt-6">
        <div>
          <h3 className="text-[1.35rem] font-medium leading-[1.25] tracking-[-0.035em] transition sm:text-[1.75rem]">
            {project.name}
          </h3>
          <p className="mt-2 text-[13px] leading-6 text-muted sm:text-sm">
            {getProjectAddressLine(project)}
          </p>
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-x-5 gap-y-4 rounded-none border border-white/80 bg-white/44 px-4 py-5 text-sm backdrop-blur-xl">
          <div>
            <dt className="text-muted">{settings.projectCardHouseholdLabel}</dt>
            <dd className="mt-1 font-medium leading-6 text-foreground">{project.householdCount}</dd>
          </div>
          <div>
            <dt className="text-muted">{settings.projectCardUnitPlanLabel}</dt>
            <dd className="mt-1 font-medium leading-6 text-foreground">{project.unitPlan}</dd>
          </div>
          <div>
            <dt className="text-muted">{settings.projectCardMoveInLabel}</dt>
            <dd className="mt-1 font-medium leading-6 text-foreground">{project.expectedMoveIn}</dd>
          </div>
          <div>
            <dt className="text-muted">대표번호</dt>
            <dd className="mt-1 font-medium leading-6 text-foreground">{project.contactPhone}</dd>
          </div>
        </dl>

        <div className="mt-5 grid grid-cols-2 gap-2.5">
          <a
            className="button-primary !min-h-[42px] !rounded-none !px-3 !py-2.5 !text-[13px]"
            href={NAVER_INQUIRY_URL}
            rel="noreferrer"
            target="_blank"
          >
            문의하기
          </a>
          <a
            className="button-secondary !min-h-[42px] !rounded-none !px-3 !py-2.5 !text-[13px]"
            href={formatPhoneHref(project.contactPhone)}
          >
            전화연결
          </a>
        </div>
        <Link
          className="mt-3 flex min-h-12 w-full items-center justify-between border border-neutral-950 bg-white/70 px-4 py-3 text-sm font-medium text-neutral-950 backdrop-blur-xl transition hover:bg-neutral-950 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
          href={`/projects/${project.slug}`}
        >
          <span>현장 상세보기</span>
          <span aria-hidden="true" className="text-base">→</span>
        </Link>
      </div>
    </article>
  );
}

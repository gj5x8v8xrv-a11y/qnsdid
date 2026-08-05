import Link from "next/link";

import { PageHero } from "@/components/site/page-hero";
import { ProjectCard } from "@/components/site/project-card";
import { SectionHeading } from "@/components/site/section-heading";
import { buildProjectsMetadata } from "@/lib/seo";
import { getProjects } from "@/lib/data";
import { getProjectRegion, getProjectReservationHref } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata = buildProjectsMetadata("active", "/projects");

function buildRegionHref(region: string | null) {
  return region ? `/projects?region=${encodeURIComponent(region)}` : "/projects";
}

export default async function ProjectsPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [params, projects] = await Promise.all([searchParams, getProjects("active")]);
  const requestedRegion =
    typeof params.region === "string" ? params.region.trim() : Array.isArray(params.region) ? params.region[0]?.trim() : "";

  const regions = [...new Set(projects.map((project) => getProjectRegion(project)).filter(Boolean))].sort(
    (left, right) => left.localeCompare(right, "ko")
  );

  const activeRegion = regions.includes(requestedRegion) ? requestedRegion : "";
  const filteredProjects = activeRegion
    ? projects.filter((project) => getProjectRegion(project) === activeRegion)
    : projects;
  const featuredReservationHref = filteredProjects[0]
    ? getProjectReservationHref(filteredProjects[0])
    : projects[0]
      ? getProjectReservationHref(projects[0])
      : "/projects";

  return (
    <>
      <PageHero
        actions={
          <>
            <a
              className="button-primary !min-h-[40px] !px-4 sm:!min-h-[44px] sm:!px-6"
              href={featuredReservationHref}
              rel="noreferrer"
              target="_blank"
            >
              방문예약
            </a>
            <Link className="button-secondary !min-h-[40px] !px-4 sm:!min-h-[44px] sm:!px-6" href="/completed">
              분양완료 보기
            </Link>
          </>
        }
        actionsClassName="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap"
        description="현재 안내 중인 현장을 빠르게 보고 바로 문의하실 수 있습니다."
        eyebrow="분양중 현장"
        title="현재 상담 가능한 분양 현장"
      />

      <section className="page-shell pb-24">
        <SectionHeading
          action={
            <Link className="button-secondary !min-h-[40px] !px-4 sm:!min-h-[44px] sm:!px-6" href="/contact">
              상담문의
            </Link>
          }
          description="원하는 지역을 선택해 현장을 확인해보세요."
          eyebrow="지역별 보기"
          title={activeRegion ? `${activeRegion} 분양 현장` : "지역별 분양 현장"}
        />

        {regions.length ? (
          <div className="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
            <Link
              className={`rounded-full px-4 py-2.5 text-[15px] font-semibold transition sm:px-5 sm:py-3 sm:text-sm ${
                activeRegion
                  ? "bg-slate-100 text-slate-600"
                  : "bg-deep text-white shadow-soft"
              }`}
              href={buildRegionHref(null)}
            >
              전체
            </Link>
            {regions.map((region) => (
              <Link
                className={`rounded-full px-4 py-2.5 text-[15px] font-semibold transition sm:px-5 sm:py-3 sm:text-sm ${
                  activeRegion === region
                    ? "bg-deep text-white shadow-soft"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
                href={buildRegionHref(region)}
                key={region}
              >
                {region}
              </Link>
            ))}
          </div>
        ) : null}

        {filteredProjects.length > 0 ? (
          <div className="card-grid mt-6 sm:mt-10">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="surface-panel mt-10 p-8 text-center text-sm text-muted">
            현재 선택한 지역에는 안내 중인 분양 현장이 없습니다. 다른 지역을 선택하시거나 상담문의를 남겨주세요.
          </div>
        )}
      </section>
    </>
  );
}

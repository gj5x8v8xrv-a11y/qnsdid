import Link from "next/link";

import { PageHero } from "@/components/site/page-hero";
import { ProjectCard } from "@/components/site/project-card";
import { SectionHeading } from "@/components/site/section-heading";
import { getProjects } from "@/lib/data";
import { buildProjectsMetadata } from "@/lib/seo";
import { getProjectRegion } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata = buildProjectsMetadata("completed", "/completed");

function buildRegionHref(region: string | null) {
  return region ? `/completed?region=${encodeURIComponent(region)}` : "/completed";
}

export default async function CompletedProjectsPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [params, projects] = await Promise.all([searchParams, getProjects("completed")]);
  const requestedRegion =
    typeof params.region === "string" ? params.region.trim() : Array.isArray(params.region) ? params.region[0]?.trim() : "";

  const regions = [...new Set(projects.map((project) => getProjectRegion(project)).filter(Boolean))].sort(
    (left, right) => left.localeCompare(right, "ko")
  );

  const activeRegion = regions.includes(requestedRegion) ? requestedRegion : "";
  const filteredProjects = activeRegion
    ? projects.filter((project) => getProjectRegion(project) === activeRegion)
    : projects;

  return (
    <>
      <PageHero
        actions={
          <>
            <Link className="button-primary" href="/projects">
              분양중 현장 보기
            </Link>
            <Link className="button-secondary" href="/contact">
              상담문의
            </Link>
          </>
        }
        description="소개가 완료된 현장도 함께 정리해두었습니다. 어떤 지역의 현장을 소개해왔는지 편하게 확인해보세요."
        eyebrow="분양완료 현장"
        stats={[
          { label: "분양완료 현장", value: `${projects.length}곳` },
          { label: "정리된 지역", value: `${regions.length}곳` },
          { label: "현재 상담", value: "분양중 현장 연결" }
        ]}
        title="지금까지 소개해온 분양 현장"
      />

      <section className="page-shell pb-24">
        <SectionHeading
          description="완료된 현장도 지역별로 정리해두었습니다. 살펴보시고 현재 분양중인 현장과 함께 비교해보세요."
          eyebrow="지역별 보기"
          title={activeRegion ? `${activeRegion} 소개 완료 현장` : "지역별 완료 현장"}
        />

        {regions.length ? (
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
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
                className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
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
          <div className="card-grid mt-10">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="surface-panel mt-10 p-8 text-center text-sm text-muted">
            현재 선택한 지역에는 완료된 현장이 없습니다. 다른 지역을 선택해보세요.
          </div>
        )}
      </section>
    </>
  );
}

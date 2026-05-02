import Link from "next/link";

import { PageHero } from "@/components/site/page-hero";
import { ProjectCard } from "@/components/site/project-card";
import { SectionHeading } from "@/components/site/section-heading";
import { ProjectVisual } from "@/components/ui/project-visual";
import { getProjects } from "@/lib/data";
import { getSiteConfig } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [activeProjects, completedProjects] = await Promise.all([
    getProjects("active"),
    getProjects("completed")
  ]);
  const site = getSiteConfig();
  const featuredProject = activeProjects[0];

  return (
    <>
      <PageHero
        actions={
          <>
            <a className="button-accent" href={`tel:${site.companyPhone.replace(/[^+\d]/g, "")}`}>
              전화문의
            </a>
            <Link className="button-secondary" href="/contact">
              상담신청
            </Link>
          </>
        }
        description="관심 있는 분양 현장을 살펴보고, 궁금한 내용은 전화나 상담으로 편하게 문의하실 수 있도록 정리했습니다."
        eyebrow="분양 정보 플랫폼"
        stats={[
          { label: "분양중 현장", value: `${activeProjects.length}곳` },
          { label: "분양완료 현장", value: `${completedProjects.length}곳` },
          { label: "대표번호", value: site.companyPhone }
        ]}
        title="좋은 분양 현장을 선별해 소개해드립니다"
        visual={
          featuredProject ? (
            <div className="space-y-4">
              <ProjectVisual
                className="aspect-[16/11]"
                imageUrl={featuredProject.coverImageUrl}
                title={featuredProject.name}
              />
              <div className="rounded-[1.5rem] bg-white/10 px-5 py-5 text-white">
                <p className="text-xs uppercase tracking-[0.32em] text-white/50">추천 현장</p>
                <h2 className="mt-3 text-2xl">{featuredProject.name}</h2>
                <p className="mt-3 text-sm leading-7 text-white/75">{featuredProject.premiumSummary}</p>
              </div>
            </div>
          ) : undefined
        }
      />

      <section className="page-shell section-space">
        <SectionHeading
          action={
            <Link className="button-secondary" href="/projects">
              분양중 현장 전체 보기
            </Link>
          }
          description="지역과 기본 정보를 함께 정리해두었습니다. 관심 있는 현장을 비교해보시고 편하게 문의해보세요."
          eyebrow="분양중 현장"
          title="현재 안내 중인 현장"
        />

        {activeProjects.length > 0 ? (
          <div className="card-grid mt-10">
            {activeProjects.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="surface-panel mt-10 p-8 text-center text-sm leading-8 text-muted">
            현재 안내 중인 분양중 현장이 없습니다. 상담문의로 남겨주시면 맞춤 현장을 안내해드립니다.
          </div>
        )}
      </section>

      <section className="page-shell pb-24">
        <div className="surface-dark overflow-hidden bg-hero-navy p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-white/50">Completed Projects</p>
              <h2 className="mt-4 text-4xl text-white">소개가 완료된 현장도 함께 확인하실 수 있습니다</h2>
              <p className="mt-5 text-sm leading-8 text-white/70">
                지금까지 소개해온 현장도 정리해두었습니다. 지역별로 살펴보시고 현재 분양중인 현장과 함께 비교해보세요.
              </p>
            </div>

            {completedProjects.length > 0 ? (
              <div className="grid gap-4">
                {completedProjects.slice(0, 2).map((project) => (
                  <div
                    className="rounded-[1.5rem] border border-white/10 bg-white/10 px-5 py-5"
                    key={project.id}
                  >
                    <p className="text-sm font-semibold text-white">{project.name}</p>
                    <p className="mt-2 text-sm leading-7 text-white/70">{project.location}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-[1.5rem] border border-white/10 bg-white/10 px-5 py-5 text-sm leading-8 text-white/70">
                아직 소개 완료 현장이 없습니다. 새로운 현장이 정리되면 이곳에서 함께 확인하실 수 있습니다.
              </div>
            )}
          </div>

          <Link className="button-accent mt-8" href="/completed">
            분양완료 현장 보기
          </Link>
        </div>
      </section>

      <section className="page-shell pb-24">
        <div className="surface-dark overflow-hidden bg-hero-navy p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-white/50">Contact</p>
              <h2 className="mt-4 text-4xl text-white">궁금한 현장은 쉽고 빠르게 문의하실 수 있습니다</h2>
              <p className="mt-5 max-w-2xl text-sm leading-8 text-white/70">
                대표번호와 상담신청, 방문예약 버튼을 함께 두어 필요한 방식으로 편하게 문의하실 수 있도록 구성했습니다.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <a className="button-accent" href={`tel:${site.companyPhone.replace(/[^+\d]/g, "")}`}>
                전화문의
              </a>
              <Link className="button-secondary !border-white/10 !bg-white !text-deep" href="/contact">
                상담신청
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

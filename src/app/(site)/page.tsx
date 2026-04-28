import Link from "next/link";

import { PageHero } from "@/components/site/page-hero";
import { ProjectCard } from "@/components/site/project-card";
import { SectionHeading } from "@/components/site/section-heading";
import { ProjectVisual } from "@/components/ui/project-visual";
import { getHomeHeroContent, getProjects } from "@/lib/data";
import { getSiteConfig } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [activeProjects, completedProjects, homeHero] = await Promise.all([
    getProjects("active"),
    getProjects("completed"),
    getHomeHeroContent()
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
            <Link className="button-primary" href="/projects">
              분양중 현장 보기
            </Link>
          </>
        }
        description={homeHero.description}
        eyebrow={homeHero.eyebrow}
        stats={[
          { label: "분양중 현장", value: `${activeProjects.length}곳` },
          { label: "분양완료 실적", value: `${completedProjects.length}곳` },
          { label: "상담 가능", value: "09:00 - 20:00" }
        ]}
        title={homeHero.title}
        visual={
          featuredProject ? (
            <div className="space-y-4">
              <ProjectVisual
                className="aspect-[16/10]"
                imageUrl={featuredProject.coverImageUrl}
                title={featuredProject.name}
              />
              <div className="rounded-[1.5rem] bg-white/10 px-5 py-5 text-white">
                <p className="text-xs uppercase tracking-[0.32em] text-white/50">{homeHero.featuredLabel}</p>
                <h2 className="mt-3 text-3xl">{featuredProject.name}</h2>
                <p className="mt-3 text-sm leading-7 text-white/75">{featuredProject.location}</p>
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
          description="고객은 회사 설명보다 지금 바로 볼 수 있는 분양중 현장에 먼저 반응합니다. 메인에서도 현장을 바로 보여주고, 상세페이지로 자연스럽게 연결합니다."
          eyebrow="Active Projects"
          title="지금 바로 상담할 수 있는 분양중 현장"
        />

        {activeProjects.length > 0 ? (
          <div className="card-grid mt-10">
            {activeProjects.slice(0, 6).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="surface-panel mt-10 p-8 text-center text-sm leading-8 text-muted">
            현재 안내 중인 분양중 현장이 없습니다. 상담문의로 남겨주시면 맞춤 현장과 조건을 빠르게 안내해드립니다.
          </div>
        )}
      </section>

      <section className="page-shell pb-24">
        <div className="surface-dark overflow-hidden bg-hero-navy p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-white/50">Completed Portfolio</p>
              <h2 className="mt-4 text-4xl text-white">분양완료 실적도 신뢰를 만드는 중요한 자산입니다</h2>
              <p className="mt-5 max-w-2xl text-sm leading-8 text-white/70">
                완료된 현장을 지우지 않고 실적처럼 정리해두면, 처음 들어온 고객도 운영 경험과 브랜드 신뢰를 한눈에 이해할 수 있습니다.
              </p>
            </div>
            <div className="grid gap-4">
              {completedProjects.length > 0 ? (
                completedProjects.slice(0, 3).map((project) => (
                  <div
                    className="rounded-[1.5rem] border border-white/10 bg-white/10 px-5 py-5"
                    key={project.id}
                  >
                    <p className="text-sm font-semibold text-white">{project.name}</p>
                    <p className="mt-2 text-sm leading-7 text-white/70">{project.location}</p>
                  </div>
                ))
              ) : (
                <div className="rounded-[1.5rem] border border-white/10 bg-white/10 px-5 py-5 text-sm leading-8 text-white/70">
                  아직 공개된 완료 실적이 없습니다. 완료 현장은 삭제하지 말고 분양완료로 전환해 신뢰 자산으로 활용하세요.
                </div>
              )}
              <Link className="button-accent" href="/completed">
                분양완료 실적 보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell pb-24">
        <div className="surface-panel p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-muted">Call To Action</p>
              <h2 className="mt-4 text-4xl">현장 설명을 다 보기 전이라도, 지금 바로 상담을 시작할 수 있습니다</h2>
              <p className="mt-5 max-w-2xl text-sm leading-8 text-muted">
                관심 현장, 방문 희망일, 분양조건 문의를 남겨주시면 대표번호 또는 상담신청으로 빠르게 연결해드립니다.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <a className="button-accent" href={`tel:${site.companyPhone.replace(/[^+\d]/g, "")}`}>
                전화문의
              </a>
              <Link className="button-primary" href="/contact">
                상담신청
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

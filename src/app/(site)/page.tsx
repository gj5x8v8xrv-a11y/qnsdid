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
          { label: "소개 완료 현장", value: `${completedProjects.length}곳` },
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
          description="현재 살펴보실 수 있는 현장을 먼저 확인하고, 자세한 내용은 각 현장 페이지에서 편하게 보실 수 있습니다."
          eyebrow="분양중 현장"
          title="현재 상담 가능한 분양 현장"
        />

        {activeProjects.length > 0 ? (
          <div className="card-grid mt-10">
            {activeProjects.slice(0, 6).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="surface-panel mt-10 p-8 text-center text-sm leading-8 text-muted">
            현재 안내 중인 현장이 없습니다. 문의를 남겨주시면 확인 후 안내해드리겠습니다.
          </div>
        )}
      </section>

      <section className="page-shell pb-24">
        <div className="surface-dark overflow-hidden bg-hero-navy p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-white/50">분양완료 현장</p>
              <h2 className="mt-4 text-4xl text-white">소개가 완료된 현장도 함께 확인해보세요</h2>
              <p className="mt-5 max-w-2xl text-sm leading-8 text-white/70">
                소개가 완료된 현장도 함께 정리해두었습니다. 지금까지 어떤 현장을 소개해왔는지 편하게 살펴보세요.
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
                  현재 공개된 분양완료 현장이 없습니다. 준비되는 대로 안내해드리겠습니다.
                </div>
              )}
              <Link className="button-accent" href="/completed">
                분양완료 현장 보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell pb-24">
        <div className="surface-panel p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-muted">상담 안내</p>
              <h2 className="mt-4 text-4xl">궁금한 현장은 편하게 문의해보세요</h2>
              <p className="mt-5 max-w-2xl text-sm leading-8 text-muted">
                관심 있는 현장과 궁금한 내용을 남겨주시면 확인 후 순서대로 안내해드립니다.
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

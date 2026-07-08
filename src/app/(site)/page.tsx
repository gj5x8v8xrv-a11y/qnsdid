import Link from "next/link";
import type { CSSProperties } from "react";

import { PageHero } from "@/components/site/page-hero";
import { ProjectCard } from "@/components/site/project-card";
import { SectionHeading } from "@/components/site/section-heading";
import { ProjectVisual } from "@/components/ui/project-visual";
import { getHomePageSettings, getProjects } from "@/lib/data";
import { getSiteConfig } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [activeProjects, completedProjects, homePageSettings] = await Promise.all([
    getProjects("active"),
    getProjects("completed"),
    getHomePageSettings()
  ]);
  const site = getSiteConfig();
  const featuredProject = activeProjects[0];
  const homePageStyle = {
    "--home-hero-title-size": `${homePageSettings.mobileHeroTitleRem}rem`,
    "--home-section-title-size": `${homePageSettings.mobileSectionTitleRem}rem`,
    "--home-body-text-size": `${homePageSettings.mobileBodyTextPx}px`,
    "--home-card-title-size": `${homePageSettings.mobileProjectCardTitleRem}rem`
  } as CSSProperties;

  return (
    <div style={homePageStyle}>
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
        description={homePageSettings.heroDescription}
        eyebrow="분양 정보 플랫폼"
        stats={[
          { label: "분양중 현장", value: `${activeProjects.length}곳` },
          { label: "분양완료 현장", value: `${completedProjects.length}곳` },
          { label: "대표번호", value: site.companyPhone }
        ]}
        title={homePageSettings.heroTitle}
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
                <h2 className="mt-3 text-[length:var(--home-card-title-size,1.08rem)] leading-[1.3] sm:text-2xl">
                  {featuredProject.name}
                </h2>
                <p className="mt-3 text-[length:var(--home-body-text-size,13px)] leading-6 text-white/75 sm:text-sm sm:leading-7">
                  {featuredProject.premiumSummary}
                </p>
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
          description={homePageSettings.activeSectionDescription}
          eyebrow="분양중 현장"
          title={homePageSettings.activeSectionTitle}
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
        <div className="surface-panel overflow-hidden border border-black/8 bg-white p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-muted">분양완료 현장</p>
              <h2 className="mt-4 text-[length:var(--home-section-title-size,1.34rem)] leading-[1.28] tracking-[-0.02em] text-black sm:text-4xl">
                {homePageSettings.completedSectionTitle}
              </h2>
              <p className="mt-5 text-[length:var(--home-body-text-size,13px)] leading-6 text-muted sm:text-sm sm:leading-8">
                {homePageSettings.completedSectionDescription}
              </p>
            </div>

            {completedProjects.length > 0 ? (
              <div className="grid gap-4">
                {completedProjects.slice(0, 2).map((project) => (
                  <div
                    className="rounded-[1.5rem] border border-black/8 bg-slate-50 px-5 py-5"
                    key={project.id}
                  >
                    <p className="text-sm font-semibold text-black">{project.name}</p>
                    <p className="mt-2 text-sm leading-7 text-muted">{project.location}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-[1.5rem] border border-black/8 bg-slate-50 px-5 py-5 text-sm leading-8 text-muted">
                아직 소개 완료 현장이 없습니다. 새로운 현장이 정리되면 이곳에서 함께 확인하실 수 있습니다.
              </div>
            )}
          </div>

          <Link className="button-primary mt-8" href="/completed">
            분양완료 현장 보기
          </Link>
        </div>
      </section>

      <section className="page-shell pb-24">
        <div className="surface-panel overflow-hidden border border-black/8 bg-white p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-muted">상담문의</p>
              <h2 className="mt-4 text-[length:var(--home-section-title-size,1.34rem)] leading-[1.28] tracking-[-0.02em] text-black sm:text-4xl">
                {homePageSettings.contactSectionTitle}
              </h2>
              <p className="mt-5 max-w-2xl text-[length:var(--home-body-text-size,13px)] leading-6 text-muted sm:text-sm sm:leading-8">
                {homePageSettings.contactSectionDescription}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <a className="button-primary" href={`tel:${site.companyPhone.replace(/[^+\d]/g, "")}`}>
                전화문의
              </a>
              <Link className="button-secondary" href="/contact">
                상담신청
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { ProjectCard } from "@/components/site/project-card";
import { SectionHeading } from "@/components/site/section-heading";
import { getHomePageSettings, getProjects } from "@/lib/data";
import { getProjectRegion, getSiteConfig, NAVER_INQUIRY_URL } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [activeProjects, completedProjects, homePageSettings] = await Promise.all([
    getProjects("active"),
    getProjects("completed"),
    getHomePageSettings()
  ]);
  const site = getSiteConfig();
  const regions = [...new Set(activeProjects.map((project) => getProjectRegion(project)).filter(Boolean))].sort(
    (left, right) => left.localeCompare(right, "ko")
  );

  return (
    <div>
      <PageHero
        actions={
          <>
            <Link className="button-primary text-[length:var(--home-button-size,13px)]" href="/projects">
              분양 현장 찾아보기
            </Link>
            <a className="button-secondary text-[length:var(--home-button-size,13px)]" href={`tel:${site.companyPhone.replace(/[^+\d]/g, "")}`}>
              {homePageSettings.heroPhoneButtonLabel}
            </a>
          </>
        }
        description={homePageSettings.heroDescription}
        eyebrow={homePageSettings.heroEyebrow}
        stats={[
          { label: homePageSettings.heroActiveStatLabel, value: `${activeProjects.length}곳` },
          { label: homePageSettings.heroCompletedStatLabel, value: `${completedProjects.length}곳` },
          { label: homePageSettings.heroPhoneStatLabel, value: site.companyPhone }
        ]}
        title={homePageSettings.heroTitle}
      />

      <section className="page-shell py-7 sm:py-16" aria-labelledby="region-finder-title">
        <div className="border-y border-black/10 py-6 sm:py-10">
          <div className="grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">빠른 현장 찾기</p>
              <h2 id="region-finder-title" className="mt-3 text-2xl leading-tight tracking-[-0.035em] sm:text-3xl">
                원하는 지역부터 찾아보세요
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted">지역을 선택하면 현재 상담 가능한 현장만 모아볼 수 있습니다.</p>
            </div>
            <div className="flex flex-wrap gap-2.5 sm:justify-end">
              <Link className="rounded-full bg-neutral-950 px-5 py-3 text-sm font-medium text-white shadow-[0_9px_22px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5 hover:bg-neutral-800" href="/projects">
                전체 현장
              </Link>
              {regions.map((region) => (
                <Link
                  className="rounded-full border border-white/80 bg-white/52 px-5 py-3 text-sm font-medium text-neutral-700 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-black/15 hover:bg-white/80 hover:text-black"
                  href={`/projects?region=${encodeURIComponent(region)}`}
                  key={region}
                >
                  {region}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell pb-20 pt-7 sm:pb-24 sm:pt-16">
        <SectionHeading
          action={
            <Link className="button-secondary text-[length:var(--home-button-size,13px)]" href="/projects">
              {homePageSettings.activeSectionButtonLabel}
            </Link>
          }
          description={homePageSettings.activeSectionDescription}
          title={homePageSettings.activeSectionTitle}
        />

        {activeProjects.length > 0 ? (
          <div className="card-grid mt-10">
            {activeProjects.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} project={project} settings={homePageSettings} />
            ))}
          </div>
        ) : (
          <div className="surface-panel mt-10 p-8 text-center text-sm leading-8 text-muted">
            {homePageSettings.activeSectionEmptyMessage}
          </div>
        )}
      </section>

      <section className="page-shell pb-24">
        <div className="overflow-hidden border-y border-black/10 py-10 sm:py-14">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-muted">{homePageSettings.completedSectionEyebrow}</p>
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
                    className="border-b border-black/8 px-1 py-4 last:border-b-0"
                    key={project.id}
                  >
                    <p className="text-[length:var(--home-completed-list-title-size,14px)] font-semibold text-black sm:text-sm">
                      {project.name}
                    </p>
                    <p className="mt-2 text-[length:var(--home-completed-list-body-size,13px)] leading-7 text-muted sm:text-sm">
                      {project.location}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border-y border-black/8 px-1 py-5 text-sm leading-8 text-muted">
                {homePageSettings.completedSectionEmptyMessage}
              </div>
            )}
          </div>

          <Link className="button-primary mt-8 text-[length:var(--home-button-size,13px)]" href="/completed">
            {homePageSettings.completedSectionButtonLabel}
          </Link>
        </div>
      </section>

      <section className="page-shell pb-24">
        <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-neutral-950 via-neutral-900 to-black px-7 py-9 text-white shadow-[0_24px_65px_rgba(0,0,0,0.2)] sm:px-10 sm:py-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-white/55">{homePageSettings.contactSectionEyebrow}</p>
              <h2 className="mt-4 text-[length:var(--home-section-title-size,1.34rem)] leading-[1.28] tracking-[-0.02em] text-white sm:text-4xl">
                {homePageSettings.contactSectionTitle}
              </h2>
              <p className="mt-5 max-w-2xl text-[length:var(--home-body-text-size,13px)] leading-6 text-white/65 sm:text-sm sm:leading-8">
                {homePageSettings.contactSectionDescription}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <a
                className="button-accent border-white bg-white text-[length:var(--home-button-size,13px)] text-black"
                href={NAVER_INQUIRY_URL}
                rel="noreferrer"
                target="_blank"
              >
                문의하기
              </a>
              <a className="button-secondary border-white/25 bg-transparent text-[length:var(--home-button-size,13px)] text-white hover:bg-white/10" href={`tel:${site.companyPhone.replace(/[^+\d]/g, "")}`}>
                전화연결
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

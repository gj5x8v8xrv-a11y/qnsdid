import Link from "next/link";
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

  return (
    <div>
      <PageHero
        actions={
          <>
            <a className="button-accent text-[length:var(--home-button-size,13px)]" href={`tel:${site.companyPhone.replace(/[^+\d]/g, "")}`}>
              {homePageSettings.heroPhoneButtonLabel}
            </a>
            <Link className="button-secondary text-[length:var(--home-button-size,13px)]" href="/contact">
              {homePageSettings.heroContactButtonLabel}
            </Link>
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
        visual={
          featuredProject ? (
            <div className="space-y-4">
              <ProjectVisual
                className="aspect-[16/11]"
                imageUrl={featuredProject.coverImageUrl}
                title={featuredProject.name}
              />
              <div className="rounded-[1.5rem] bg-white/10 px-5 py-5 text-white">
                <p className="text-[length:var(--home-featured-label-size,12px)] uppercase tracking-[0.32em] text-white/50">{homePageSettings.featuredProjectLabel}</p>
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
            <Link className="button-secondary text-[length:var(--home-button-size,13px)]" href="/projects">
              {homePageSettings.activeSectionButtonLabel}
            </Link>
          }
          description={homePageSettings.activeSectionDescription}
          eyebrow={homePageSettings.activeSectionEyebrow}
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
        <div className="surface-panel overflow-hidden border border-black/8 bg-white p-8 lg:p-10">
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
                    className="rounded-[1.5rem] border border-black/8 bg-slate-50 px-5 py-5"
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
              <div className="rounded-[1.5rem] border border-black/8 bg-slate-50 px-5 py-5 text-sm leading-8 text-muted">
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
        <div className="surface-panel overflow-hidden border border-black/8 bg-white p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-muted">{homePageSettings.contactSectionEyebrow}</p>
              <h2 className="mt-4 text-[length:var(--home-section-title-size,1.34rem)] leading-[1.28] tracking-[-0.02em] text-black sm:text-4xl">
                {homePageSettings.contactSectionTitle}
              </h2>
              <p className="mt-5 max-w-2xl text-[length:var(--home-body-text-size,13px)] leading-6 text-muted sm:text-sm sm:leading-8">
                {homePageSettings.contactSectionDescription}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <a className="button-primary text-[length:var(--home-button-size,13px)]" href={`tel:${site.companyPhone.replace(/[^+\d]/g, "")}`}>
                {homePageSettings.contactPhoneButtonLabel}
              </a>
              <Link className="button-secondary text-[length:var(--home-button-size,13px)]" href="/contact">
                {homePageSettings.contactFormButtonLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

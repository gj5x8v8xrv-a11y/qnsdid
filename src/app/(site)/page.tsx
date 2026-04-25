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
        description="처음 방문한 고객이 회사 소개와 현장 정보를 편하게 살펴보고, 바로 상담과 방문예약으로 이어질 수 있도록 구성한 분양 전문 홈페이지입니다."
        eyebrow="Representative Homepage"
        stats={[
          { label: "분양중 현장", value: `${activeProjects.length}곳` },
          { label: "분양완료 실적", value: `${completedProjects.length}곳` },
          { label: "대표번호", value: site.companyPhone }
        ]}
        title="신뢰감 있게 현장을 소개하고 상담까지 연결하는 분양 전문 홈페이지"
        visual={
          featuredProject ? (
            <div className="space-y-4">
              <ProjectVisual
                className="aspect-[16/11]"
                imageUrl={featuredProject.coverImageUrl}
                title={featuredProject.name}
              />
              <div className="rounded-[1.5rem] bg-white/10 px-5 py-5 text-white">
                <p className="text-xs uppercase tracking-[0.32em] text-white/50">Featured Project</p>
                <h2 className="mt-3 text-2xl">{featuredProject.name}</h2>
                <p className="mt-3 text-sm leading-7 text-white/75">{featuredProject.premiumSummary}</p>
              </div>
            </div>
          ) : undefined
        }
      />

      <section className="page-shell grid gap-5 pb-8 md:grid-cols-3">
        {[
          {
            title: "현장 정보를 한눈에 확인",
            description: "분양중 현장과 분양완료 현장을 구분해 필요한 정보를 빠르게 찾을 수 있습니다."
          },
          {
            title: "고급스럽고 안정적인 인상",
            description: "화이트, 블랙, 짙은 남색, 골드 포인트로 신뢰감 있는 부동산 분양 톤을 유지합니다."
          },
          {
            title: "상담 연결에 집중한 동선",
            description: "전화문의, 상담신청, 방문예약 버튼을 자연스럽게 배치해 고객 문의로 이어지게 구성했습니다."
          }
        ].map((item) => (
          <article className="surface-panel p-6" key={item.title}>
            <p className="text-sm font-semibold text-deep">{item.title}</p>
            <p className="mt-4 text-sm leading-8 text-muted">{item.description}</p>
          </article>
        ))}
      </section>

      <section className="page-shell section-space">
        <SectionHeading
          action={
            <Link className="button-secondary" href="/projects">
              분양중 현장 전체 보기
            </Link>
          }
          description="대표 홈페이지에서 가장 중요한 분양중 현장 목록입니다. 카드 간격과 정보 구성을 정리해 방문자가 편하게 비교할 수 있도록 구성했습니다."
          eyebrow="Active Projects"
          title="현재 운영 중인 분양 현장을 한눈에 확인할 수 있습니다"
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
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="surface-panel p-8 lg:p-10">
            <SectionHeading
              description="회사 소개, 현장 정보, 실적, 상담 동선이 자연스럽게 이어져야 방문자가 안심하고 문의할 수 있습니다."
              eyebrow="Operating Strength"
              title="처음 방문한 고객도 편하게 이해할 수 있는 정보 구조"
            />

            <div className="mt-10 grid gap-4">
              {[
                "현장별 핵심 정보와 프리미엄 포인트 정리",
                "대표 이미지와 상세 이미지 슬라이드 제공",
                "분양중 / 분양완료 현장 구조 분리",
                "전화문의, 상담신청, 방문예약 동선 강화"
              ].map((item) => (
                <div className="rounded-[1.5rem] bg-slate-50 px-5 py-5 text-sm leading-7 text-foreground" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="surface-dark overflow-hidden bg-hero-navy p-8 lg:p-10">
            <p className="text-xs uppercase tracking-[0.32em] text-white/50">Completed Portfolio</p>
            <h2 className="mt-4 text-4xl text-white">분양완료 실적도 함께 신뢰 자산이 됩니다</h2>
            <p className="mt-5 text-sm leading-8 text-white/70">
              분양완료 현장은 삭제하지 않고 실적 페이지처럼 운영하는 것이 브랜드 신뢰 형성에 훨씬 유리합니다.
            </p>

            {completedProjects.length > 0 ? (
              <div className="mt-8 grid gap-4">
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
              <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/10 px-5 py-5 text-sm leading-8 text-white/70">
                아직 분양완료 실적이 없습니다. 완료된 현장은 삭제하지 않고 분양완료로 전환해 신뢰 자산으로 활용할 수 있습니다.
              </div>
            )}

            <Link className="button-accent mt-8" href="/completed">
              분양완료 실적 보기
            </Link>
          </div>
        </div>
      </section>

      <section className="page-shell pb-24">
        <div className="surface-dark overflow-hidden bg-hero-navy p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-white/50">Conversion</p>
              <h2 className="mt-4 text-4xl text-white">신뢰감 있는 소개 다음에는, 바로 문의가 이어져야 합니다</h2>
              <p className="mt-5 max-w-2xl text-sm leading-8 text-white/70">
                대표번호 노출, 상담신청 버튼, 방문예약 동선을 일관되게 유지해 궁금한 고객이 바로 행동할 수 있도록 구성했습니다.
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

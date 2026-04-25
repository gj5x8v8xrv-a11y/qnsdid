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
            <Link className="button-primary" href="/projects">
              분양중 현장 보기
            </Link>
          </>
        }
        description="처음 방문한 고객이 분양중 현장, 핵심 장점, 상담 번호를 한 번에 보고 바로 전화나 방문예약으로 이어질 수 있도록 구성했습니다."
        eyebrow="Premium Sales Marketing"
        stats={[
          { label: "분양중 현장", value: `${activeProjects.length}곳` },
          { label: "분양완료 실적", value: `${completedProjects.length}곳` },
          { label: "상담 가능", value: "09:00 - 20:00" }
        ]}
        title="지금 바로 확인할 분양 현장과 조건 상담을 빠르게 연결해드립니다"
        visual={
          featuredProject ? (
            <div className="space-y-4">
              <ProjectVisual
                className="aspect-[16/10]"
                imageUrl={featuredProject.coverImageUrl}
                title={featuredProject.name}
              />
              <div className="rounded-[1.5rem] bg-white/10 px-5 py-5 text-white">
                <p className="text-xs uppercase tracking-[0.32em] text-white/50">오늘 추천 현장</p>
                <h2 className="mt-3 text-3xl">{featuredProject.name}</h2>
                <p className="mt-3 text-sm leading-7 text-white/75">{featuredProject.location}</p>
                <p className="mt-3 text-sm leading-7 text-white/75">{featuredProject.premiumSummary}</p>
              </div>
            </div>
          ) : undefined
        }
      />

      <section className="page-shell grid gap-5 pb-10 md:grid-cols-4">
        {[
          { label: "대표번호", value: site.companyPhone, description: "바로 전화 연결 가능" },
          { label: "현장 안내", value: "분양중 우선 안내", description: "조건 상담과 방문 동선 연결" },
          { label: "상담 방식", value: "전화 · 폼 · 예약", description: "문의 경로를 짧게 유지" },
          { label: "운영 기준", value: "실적과 신뢰", description: "완료 현장도 아카이브로 관리" }
        ].map((item) => (
          <article className="surface-panel p-6" key={item.label}>
            <p className="text-xs uppercase tracking-[0.32em] text-muted">{item.label}</p>
            <p className="mt-4 text-2xl leading-tight text-foreground">{item.value}</p>
            <p className="mt-4 text-sm leading-7 text-muted">{item.description}</p>
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
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="surface-panel p-8 lg:p-10">
            <SectionHeading
              description="방문자가 안심하고 문의하도록 숫자와 운영 방식을 앞쪽에 배치했습니다."
              eyebrow="Why Bunyangmap"
              title="처음 들어온 고객이 3초 안에 이해하는 정보 구조"
            />

            <div className="mt-8 grid gap-4">
              {[
                "분양중 현장을 우선 노출해 바로 비교할 수 있습니다.",
                "대표번호와 상담 버튼을 첫 화면과 중간, 하단에 반복 배치했습니다.",
                "완료된 현장도 실적으로 보여줘 신뢰를 쌓습니다.",
                "현장 상세 페이지에서도 전화·상담·예약 동선을 유지합니다."
              ].map((item) => (
                <div className="rounded-[1.5rem] bg-slate-50 px-5 py-5 text-sm leading-8 text-foreground" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="surface-dark overflow-hidden bg-hero-navy p-8 lg:p-10">
            <p className="text-xs uppercase tracking-[0.32em] text-white/50">Consulting Flow</p>
            <h2 className="mt-4 text-4xl text-white">문의는 쉽고, 설명은 분명해야 전환이 됩니다</h2>
            <div className="mt-8 grid gap-4">
              {[
                {
                  title: "1. 현장 선택",
                  description: "분양중 현장을 먼저 확인하고 관심 현장을 빠르게 좁힙니다."
                },
                {
                  title: "2. 조건 상담",
                  description: "분양조건, 입지, 방문 가능 일정을 상담으로 정리합니다."
                },
                {
                  title: "3. 방문 예약",
                  description: "전화나 상담신청 후 필요한 경우 예약 링크로 연결합니다."
                }
              ].map((item) => (
                <div className="rounded-[1.5rem] border border-white/10 bg-white/10 px-5 py-5" key={item.title}>
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-3 text-sm leading-7 text-white/70">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
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

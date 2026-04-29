import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/site/page-hero";
import { ProjectSlider } from "@/components/site/project-slider";
import { buildProjectMetadata } from "@/lib/seo";
import { getProjectBySlug } from "@/lib/data";
import { formatPhoneHref, formatStatusLabel } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "현장을 찾을 수 없습니다"
    };
  }

  return buildProjectMetadata(project);
}

export default async function ProjectDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const detailSections = [
    {
      title: "사업개요",
      body: project.businessOverview || `${project.name}의 공급 규모와 주요 내용을 먼저 확인해보세요.`,
      full: true
    },
    {
      title: "입지",
      body: project.locationDescription
    },
    {
      title: "교통",
      body: project.transportInfo
    },
    {
      title: "생활인프라",
      body: project.livingInfraInfo
    },
    {
      title: "교육환경",
      body: project.educationInfo
    },
    {
      title: "프리미엄",
      body: project.premiumDetails || project.premiumSummary
    },
    {
      title: "단지배치도",
      body: project.sitePlanInfo
    },
    {
      title: "평면도",
      body: project.floorPlanInfo
    },
    {
      title: "커뮤니티",
      body: project.communityInfo
    },
    {
      title: "개발호재",
      body: project.developmentInfo
    },
    {
      title: "상담문의",
      body:
        project.consultationGuide ||
        "관심 있는 타입과 방문 희망 일정을 남겨주시면 확인 후 빠르게 안내해드립니다.",
      full: true
    }
  ].filter((section) => Boolean(section.body?.trim()));

  return (
    <>
      <PageHero
        actions={
          <>
            <a className="button-accent" href={formatPhoneHref(project.contactPhone)}>
              전화문의
            </a>
            <Link className="button-secondary" href={`/contact?project=${project.slug}`}>
              상담신청
            </Link>
            <a
              className="button-primary"
              href={project.reservationUrl || `/contact?project=${project.slug}`}
              rel="noreferrer"
              target={project.reservationUrl ? "_blank" : undefined}
            >
              방문예약
            </a>
          </>
        }
        description={`${project.premiumSummary} 분양조건이나 방문 일정이 궁금하시면 편하게 문의해보세요.`}
        eyebrow={`${formatStatusLabel(project.status)} · ${project.location}`}
        stats={[
          { label: "세대수", value: project.householdCount },
          { label: "평형", value: project.unitPlan },
          { label: "입주예정", value: project.expectedMoveIn }
        ]}
        title={project.name}
        visual={
          <div className="grid gap-4">
            {[
              `위치: ${project.location}`,
              `세대수: ${project.householdCount}`,
              `평형: ${project.unitPlan}`,
              `상담전화: ${project.contactPhone}`
            ].map((item) => (
              <div className="rounded-[1.5rem] border border-white/10 bg-white/10 px-5 py-5 text-sm leading-7 text-white/75" key={item}>
                {item}
              </div>
            ))}
          </div>
        }
      />

      <section className="page-shell pb-10">
        <ProjectSlider project={project} />
      </section>

      <section className="page-shell grid gap-8 pb-24 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <div className="surface-panel p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-3xl">현장 정보</h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">
                {formatStatusLabel(project.status)}
              </span>
            </div>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ["위치", project.location],
                ["세대수", project.householdCount],
                ["평형", project.unitPlan],
                ["입주예정일", project.expectedMoveIn],
                ["분양조건", project.salesConditions],
                ["상담전화", project.contactPhone]
              ].map(([label, value]) => (
                <div className="rounded-[1.5rem] bg-slate-50 px-5 py-5" key={label}>
                  <dt className="text-sm text-muted">{label}</dt>
                  <dd className="mt-2 text-sm font-semibold leading-7 text-foreground">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="surface-panel p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.34em] text-muted">현장 상세 안내</p>
            <h2 className="mt-4 text-3xl">현장 안내</h2>
            <p className="mt-4 text-sm leading-8 text-muted">
              사업개요부터 입지, 생활 환경, 평면 안내까지 필요한 내용을 순서대로 살펴보실 수 있습니다.
            </p>

            <div className="mt-8 grid gap-5 xl:grid-cols-2">
              {detailSections.map((section) => (
                <article
                  className={`rounded-[1.75rem] bg-slate-50 p-5 sm:p-6 ${section.full ? "xl:col-span-2" : ""}`}
                  key={section.title}
                >
                  <h3 className="text-2xl">{section.title}</h3>
                  <p className="mt-3 text-sm leading-8 text-muted">{section.body}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="surface-dark overflow-hidden bg-hero-navy p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-white/50">상담 안내</p>
            <h2 className="mt-4 text-3xl text-white">궁금한 내용은 바로 문의해보세요</h2>
            <p className="mt-4 text-sm leading-8 text-white/70">
              분양조건, 방문 일정, 현장 위치처럼 궁금한 내용을 남겨주시면 확인 후 안내해드립니다.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <a className="button-accent" href={formatPhoneHref(project.contactPhone)}>
                전화문의
              </a>
              <Link className="button-primary" href={`/contact?project=${project.slug}`}>
                상담신청
              </Link>
              <a
                className="button-secondary !border-white/10 !bg-white !text-deep"
                href={project.reservationUrl || `/contact?project=${project.slug}`}
                rel="noreferrer"
                target={project.reservationUrl ? "_blank" : undefined}
              >
                방문예약
              </a>
            </div>
          </div>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:h-fit">
          <div className="surface-panel p-6">
            <p className="text-xs uppercase tracking-[0.32em] text-muted">문의 안내</p>
            <h2 className="mt-3 text-3xl">전화 또는 상담신청</h2>
            <p className="mt-3 text-sm leading-8 text-muted">
              대표번호로 바로 연락하시거나 상담신청을 남겨주시면 확인 후 안내해드립니다.
            </p>

            <div className="mt-6 grid gap-3">
              <a className="button-accent w-full" href={formatPhoneHref(project.contactPhone)}>
                전화문의
              </a>
              <Link className="button-primary w-full" href={`/contact?project=${project.slug}`}>
                상담신청
              </Link>
              <a
                className="button-secondary w-full"
                href={project.reservationUrl || `/contact?project=${project.slug}`}
                rel="noreferrer"
                target={project.reservationUrl ? "_blank" : undefined}
              >
                방문예약
              </a>
            </div>

            <div className="mt-6 rounded-[1.5rem] bg-slate-50 px-4 py-4 text-sm leading-8 text-muted">
              대표번호 {project.contactPhone}
              <br />
              관심 있는 내용과 방문 희망일을 남겨주시면 확인 후 안내해드립니다.
            </div>
          </div>
        </aside>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/5 bg-white/95 p-3 shadow-[0_-10px_30px_rgba(15,23,42,0.08)] backdrop-blur lg:hidden">
        <div className="page-shell grid grid-cols-3 gap-2 px-0">
          <a className="button-primary text-center text-xs" href={formatPhoneHref(project.contactPhone)}>
            전화문의
          </a>
          <Link className="button-secondary text-center text-xs" href={`/contact?project=${project.slug}`}>
            상담신청
          </Link>
          <a
            className="button-accent text-center text-xs"
            href={project.reservationUrl || `/contact?project=${project.slug}`}
            rel="noreferrer"
            target={project.reservationUrl ? "_blank" : undefined}
          >
            방문예약
          </a>
        </div>
      </div>
    </>
  );
}

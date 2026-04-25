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
        description={project.premiumSummary}
        eyebrow={`${formatStatusLabel(project.status)} / ${project.location}`}
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
              `분양조건: ${project.salesConditions}`,
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
              <h2 className="text-3xl">현장 개요</h2>
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
            <h2 className="text-3xl">프리미엄 포인트</h2>
            <div className="mt-6 rounded-[1.75rem] bg-slate-50 p-6">
              <p className="text-base leading-8 text-foreground">{project.premiumSummary}</p>
            </div>
            <div className="mt-6 rounded-[1.5rem] bg-slate-50 p-5">
              <p className="text-sm leading-8 text-muted">{project.locationDescription}</p>
            </div>
          </div>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:h-fit">
          <div className="surface-panel p-6">
            <p className="text-xs uppercase tracking-[0.32em] text-muted">Quick Contact</p>
            <h2 className="mt-3 text-3xl">상담 연결</h2>
            <p className="mt-3 text-sm leading-8 text-muted">
              방문자가 고민 없이 바로 행동할 수 있도록 CTA를 우선 배치했습니다.
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
              관심 타입, 방문 희망일, 상담 내용을 남기면 빠르게 안내해드립니다.
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}

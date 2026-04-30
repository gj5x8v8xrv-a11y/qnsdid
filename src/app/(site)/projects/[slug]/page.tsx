import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/site/page-hero";
import { ProjectSlider } from "@/components/site/project-slider";
import { buildProjectMetadata } from "@/lib/seo";
import { getProjectBySlug } from "@/lib/data";
import { formatPhoneHref, formatStatusLabel, getProjectAddressLine, getProjectRegion } from "@/lib/utils";
import type { ProjectImage, ProjectImageType } from "@/lib/types";

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

const IMAGE_SECTION_LABELS: Array<{
  key: Exclude<ProjectImageType, "main">;
  title: string;
  description: string;
}> = [
  {
    key: "gallery",
    title: "현장 갤러리",
    description: "현장 분위기와 주요 이미지를 편하게 살펴보실 수 있습니다."
  },
  {
    key: "site_plan",
    title: "단지배치도",
    description: "동 배치와 단지 구성을 확인해보세요."
  },
  {
    key: "floor_plan",
    title: "평면도",
    description: "타입별 구조와 공간 구성을 확인하실 수 있습니다."
  },
  {
    key: "location",
    title: "입지 이미지",
    description: "주변 생활권과 이동 동선을 이미지로 확인해보세요."
  },
  {
    key: "community",
    title: "커뮤니티",
    description: "단지 내 주요 시설과 공용 공간을 확인하실 수 있습니다."
  },
  {
    key: "premium",
    title: "프리미엄 안내",
    description: "현장의 장점과 함께 눈여겨볼 내용을 모아두었습니다."
  }
];

function groupImagesByType(images: ProjectImage[]) {
  return images.reduce<Record<string, ProjectImage[]>>((accumulator, image) => {
    if (!accumulator[image.imageType]) {
      accumulator[image.imageType] = [];
    }
    accumulator[image.imageType].push(image);
    return accumulator;
  }, {});
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

  const addressLine = getProjectAddressLine(project);
  const groupedImages = groupImagesByType(project.gallery);
  const mapHref = addressLine
    ? `https://map.naver.com/p/search/${encodeURIComponent(addressLine)}`
    : undefined;

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
        eyebrow={`${formatStatusLabel(project.status)} · ${getProjectRegion(project)}`}
        stats={[
          { label: "지역", value: getProjectRegion(project) },
          { label: "세대수", value: project.householdCount },
          { label: "평형", value: project.unitPlan }
        ]}
        title={project.name}
        visual={
          <div className="grid gap-4">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/10 px-5 py-5 text-sm leading-7 text-white/75">
              {addressLine || project.location}
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/10 px-5 py-5 text-sm leading-7 text-white/75">
              입주예정 {project.expectedMoveIn}
              <br />
              대표번호 {project.contactPhone}
            </div>
            {mapHref ? (
              <a
                className="rounded-[1.25rem] border border-white/10 bg-white/10 px-5 py-4 text-sm font-semibold text-white transition hover:bg-white/15"
                href={mapHref}
                rel="noreferrer"
                target="_blank"
              >
                위치 확인하기
              </a>
            ) : null}
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
              <h2 className="text-3xl">사업개요</h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">
                {formatStatusLabel(project.status)}
              </span>
            </div>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ["지역", getProjectRegion(project)],
                ["주소", addressLine || project.location],
                ["세대수", project.householdCount],
                ["평형", project.unitPlan],
                ["입주예정일", project.expectedMoveIn],
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
            <h2 className="text-3xl">분양 조건</h2>
            <div className="mt-6 rounded-[1.75rem] bg-slate-50 p-6">
              <p className="text-base leading-8 text-foreground">{project.salesConditions}</p>
            </div>
          </div>

          <div className="surface-panel p-6 sm:p-8">
            <h2 className="text-3xl">입지 안내</h2>
            <div className="mt-6 rounded-[1.75rem] bg-slate-50 p-6">
              <p className="text-base leading-8 text-foreground">{project.locationDescription}</p>
            </div>
          </div>

          <div className="surface-panel p-6 sm:p-8">
            <h2 className="text-3xl">프리미엄</h2>
            <div className="mt-6 rounded-[1.75rem] bg-slate-50 p-6">
              <p className="text-base leading-8 text-foreground">{project.premiumSummary}</p>
            </div>
          </div>

          {IMAGE_SECTION_LABELS.map((section) => {
            const images = groupedImages[section.key] || [];
            if (images.length === 0) return null;

            return (
              <div className="surface-panel p-6 sm:p-8" key={section.key}>
                <h2 className="text-3xl">{section.title}</h2>
                <p className="mt-3 text-sm leading-8 text-muted">{section.description}</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {images.map((image) => (
                    <div
                      className="overflow-hidden rounded-[1.75rem] border border-[color:var(--line)] bg-slate-50"
                      key={image.id}
                    >
                      <img
                        alt={`${project.name} ${section.title}`}
                        className="aspect-[4/3] w-full object-cover"
                        src={image.imageUrl}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:h-fit">
          <div className="surface-panel p-6">
            <p className="text-xs uppercase tracking-[0.32em] text-muted">Contact</p>
            <h2 className="mt-3 text-3xl">문의 안내</h2>
            <p className="mt-3 text-sm leading-8 text-muted">
              궁금한 내용은 전화나 상담신청, 방문예약으로 편하게 문의하실 수 있습니다.
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
              관심 현장과 방문 희망일을 남겨주시면 순서대로 안내해드립니다.
            </div>
          </div>
        </aside>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/5 bg-white/95 p-3 shadow-[0_-10px_30px_rgba(15,23,42,0.08)] backdrop-blur lg:hidden">
        <div className="page-shell grid grid-cols-3 gap-2 px-0">
          <a className="button-primary !px-2 text-center" href={formatPhoneHref(project.contactPhone)}>
            전화문의
          </a>
          <Link className="button-accent !px-2 text-center" href={`/contact?project=${project.slug}`}>
            상담신청
          </Link>
          <a
            className="button-secondary !px-2 text-center"
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

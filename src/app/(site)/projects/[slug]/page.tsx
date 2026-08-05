import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/site/page-hero";
import { ProjectSlider } from "@/components/site/project-slider";
import { LightboxImage } from "@/components/ui/lightbox-image";
import { buildProjectMetadata } from "@/lib/seo";
import { getProjectBySlug } from "@/lib/data";
import {
  formatPhoneHref,
  formatStatusLabel,
  getProjectAddressLine,
  getProjectRegion,
  getProjectReservationHref
} from "@/lib/utils";
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

function getReadableParagraphs(content: string) {
  return content
    .split(/\r?\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
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
  const heroSummaryLines = getReadableParagraphs(project.premiumSummary).slice(0, 3);
  const reservationHref = getProjectReservationHref(project);

  return (
    <>
      <PageHero
        actions={
          <>
            <a
              className="button-accent !min-h-[42px] !px-3.5 sm:!min-h-[44px] sm:!px-6"
              href={formatPhoneHref(project.contactPhone)}
            >
              전화문의
            </a>
            <a
              className="button-primary !min-h-[42px] !px-3.5 sm:!min-h-[44px] sm:!px-6"
              href={reservationHref}
              rel="noreferrer"
              target="_blank"
            >
              방문예약
            </a>
          </>
        }
        actionsClassName="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap"
        description={
          <div className="space-y-1.5">
            {heroSummaryLines.map((line, index) => (
              <p className="break-keep" key={`hero-summary-${index}`}>
                {line}
              </p>
            ))}
          </div>
        }
        descriptionClassName="text-[14px] leading-6 sm:text-[17px] sm:leading-8"
        eyebrow={`${formatStatusLabel(project.status)} · ${getProjectRegion(project)}`}
        title={project.name}
        visual={
          <div className="grid gap-3">
            <div className="rounded-[1.35rem] border border-black/8 bg-slate-50 px-4 py-4 text-[13px] leading-6 text-foreground sm:rounded-[1.5rem] sm:px-5 sm:py-5 sm:text-sm sm:leading-7">
              {addressLine || project.location}
            </div>
            <div className="rounded-[1.35rem] border border-black/8 bg-slate-50 px-4 py-4 text-[13px] leading-6 text-foreground sm:rounded-[1.5rem] sm:px-5 sm:py-5 sm:text-sm sm:leading-7">
              입주예정 {project.expectedMoveIn}
              <br />
              대표번호 {project.contactPhone}
            </div>
            <a
              className="rounded-[1.2rem] border border-black/8 bg-white px-4 py-3.5 text-[13px] font-semibold text-black transition hover:bg-slate-50 sm:rounded-[1.25rem] sm:px-5 sm:py-4 sm:text-sm"
              href={reservationHref}
              rel="noreferrer"
              target="_blank"
            >
              방문예약 바로가기
            </a>
          </div>
        }
      />

      <section className="page-shell pb-10">
        <ProjectSlider project={project} />
      </section>

      <section className="page-shell grid gap-5 pb-24 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8">
        <div className="space-y-6">
          <div className="surface-panel p-5 sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <h2 className="text-[2rem] sm:text-3xl">사업개요</h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">
                {formatStatusLabel(project.status)}
              </span>
            </div>
            <dl className="mt-5 grid gap-3 sm:mt-6 sm:gap-4 sm:grid-cols-2">
              {[
                ["지역", getProjectRegion(project)],
                ["주소", addressLine || project.location],
                ["세대수", project.householdCount],
                ["평형", project.unitPlan],
                ["입주예정일", project.expectedMoveIn],
                ["상담전화", project.contactPhone]
              ].map(([label, value]) => (
                <div className="rounded-[1.35rem] bg-slate-50 px-4 py-4 sm:rounded-[1.5rem] sm:px-5 sm:py-5" key={label}>
                  <dt className="text-[13px] text-muted sm:text-sm">{label}</dt>
                  <dd className="mt-2 break-keep text-[15px] font-semibold leading-7 text-foreground sm:text-[17px]">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

        <div className="surface-panel p-5 sm:p-8">
          <h2 className="text-[2rem] sm:text-3xl">분양 조건</h2>
          <div className="mt-5 rounded-[1.35rem] bg-slate-50 p-5 sm:mt-6 sm:rounded-[1.75rem] sm:p-6">
            <div className="space-y-3 text-[15px] leading-7 text-foreground sm:space-y-4 sm:text-[1.05rem] sm:leading-8">
              {getReadableParagraphs(project.salesConditions).map((line, index) => (
                <p className="break-words whitespace-pre-wrap" key={`sales-${index}`}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="surface-panel p-5 sm:p-8">
          <h2 className="text-[2rem] sm:text-3xl">입지 안내</h2>
          <div className="mt-5 rounded-[1.35rem] bg-slate-50 p-5 sm:mt-6 sm:rounded-[1.75rem] sm:p-6">
            <div className="space-y-3 text-[15px] leading-7 text-foreground sm:space-y-4 sm:text-[1.05rem] sm:leading-8">
              {getReadableParagraphs(project.locationDescription).map((line, index) => (
                <p className="break-words whitespace-pre-wrap" key={`location-${index}`}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="surface-panel p-5 sm:p-8">
          <h2 className="text-[2rem] sm:text-3xl">프리미엄</h2>
          <div className="mt-5 rounded-[1.35rem] bg-slate-50 p-5 sm:mt-6 sm:rounded-[1.75rem] sm:p-6">
            <div className="space-y-3 text-[15px] leading-7 text-foreground sm:space-y-4 sm:text-[1.05rem] sm:leading-8">
              {getReadableParagraphs(project.premiumSummary).map((line, index) => (
                <p className="break-words whitespace-pre-wrap" key={`premium-${index}`}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>

          {IMAGE_SECTION_LABELS.map((section) => {
            const images = groupedImages[section.key] || [];
            if (images.length === 0) return null;

            return (
              <div className="surface-panel p-5 sm:p-8" key={section.key}>
                <h2 className="text-[2rem] sm:text-3xl">{section.title}</h2>
                <p className="mt-3 text-[13px] leading-6 text-muted sm:text-sm sm:leading-8">{section.description}</p>
                <div className="mt-5 grid gap-3 sm:mt-6 sm:gap-4 sm:grid-cols-2">
                  {images.map((image) => (
                    <div
                      className="overflow-hidden rounded-[1.35rem] border border-[color:var(--line)] bg-slate-50 sm:rounded-[1.75rem]"
                      key={image.id}
                    >
                      <LightboxImage
                        alt={`${project.name} ${section.title}`}
                        imageClassName="aspect-[4/3]"
                        wrapperClassName="rounded-[1.35rem] sm:rounded-[1.75rem]"
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
              궁금한 내용은 전화나 방문예약으로 바로 확인하실 수 있습니다.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <a className="button-accent w-full" href={formatPhoneHref(project.contactPhone)}>
                전화문의
              </a>
              <a
                className="button-primary w-full"
                href={reservationHref}
                rel="noreferrer"
                target="_blank"
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
    </>
  );
}

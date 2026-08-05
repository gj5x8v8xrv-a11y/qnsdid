import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

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
import type { Project, ProjectImage, ProjectImageType } from "@/lib/types";

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
    key: "floor_plan",
    title: "타입 이미지",
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
    title: "프리미엄 이미지",
    description: "현장의 장점과 함께 눈여겨볼 포인트를 모아두었습니다."
  },
  {
    key: "gallery",
    title: "현장 갤러리",
    description: "현장 분위기와 주요 이미지를 편하게 살펴보실 수 있습니다."
  },
  {
    key: "site_plan",
    title: "단지배치도",
    description: "동 배치와 단지 구성을 확인해보세요."
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

function getOverviewRows(project: Project, addressLine: string) {
  return [
    { label: "현장구분", value: project.status === "active" ? "분양중 현장" : "분양완료 현장" },
    { label: "단지명", value: project.name },
    { label: "분양상태", value: formatStatusLabel(project.status) },
    { label: "현장위치", value: addressLine || project.location },
    { label: "공급세대", value: project.householdCount },
    { label: "평형정보", value: project.unitPlan },
    { label: "입주예정", value: project.expectedMoveIn },
    { label: "상담전화", value: project.contactPhone }
  ];
}

function buildFaqEntries(project: Project, addressLine: string) {
  const locationLines = getReadableParagraphs(project.locationDescription);
  const premiumLines = getReadableParagraphs(project.premiumSummary);
  const salesLines = getReadableParagraphs(project.salesConditions);

  return [
    {
      question: `${project.name} 현장 위치는 어디인가요?`,
      answer: `${project.name} 현장은 ${addressLine || project.location}에 위치해 있습니다. ${getProjectRegion(project)} 생활권을 중심으로 이동과 문의가 편한 현장입니다.`
    },
    {
      question: `${project.name} 공급 세대와 입주 예정일은 어떻게 되나요?`,
      answer: `${project.name}은(는) ${project.householdCount} 규모이며, 입주 예정 시기는 ${project.expectedMoveIn}입니다. 자세한 일정은 상담 시 가장 빠르게 안내받으실 수 있습니다.`
    },
    {
      question: `${project.name} 분양 조건은 어떻게 확인하면 되나요?`,
      answer: salesLines[0]
        ? `${salesLines[0]}${salesLines[1] ? ` ${salesLines[1]}` : ""}`
        : "분양 조건은 현장별로 달라질 수 있어 전화 문의 또는 방문 예약을 통해 가장 정확하게 확인하실 수 있습니다."
    },
    {
      question: `${project.name} 입지 장점은 무엇인가요?`,
      answer: locationLines[0]
        ? `${locationLines[0]}${premiumLines[0] ? ` ${premiumLines[0]}` : ""}`
        : premiumLines[0] || "입지와 프리미엄 포인트는 상세 상담을 통해 안내해드리고 있습니다."
    }
  ];
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
  const reservationHref = getProjectReservationHref(project);
  const overviewRows = getOverviewRows(project, addressLine);
  const faqEntries = buildFaqEntries(project, addressLine);
  const heroImage = project.coverImageUrl || project.gallery[0]?.imageUrl || "";
  const floorPlanImages = groupedImages.floor_plan || [];
  const galleryImages = groupedImages.gallery || [];
  const locationImages = groupedImages.location || [];
  const lifestyleSections = IMAGE_SECTION_LABELS.filter((section) => {
    const images = groupedImages[section.key] || [];
    return images.length > 0 && section.key !== "floor_plan" && section.key !== "gallery";
  });
  const salesLines = getReadableParagraphs(project.salesConditions);
  const locationLines = getReadableParagraphs(project.locationDescription);
  const premiumLines = getReadableParagraphs(project.premiumSummary);

  return (
    <section className="page-shell pb-24 pt-4 sm:pt-6">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-8">
        <div className="space-y-6">
          <section className="surface-panel p-4 sm:p-8">
            {heroImage ? (
              <div className="overflow-hidden rounded-[1.65rem] border border-[color:var(--line)] bg-slate-50">
                <LightboxImage
                  alt={`${project.name} 대표 이미지`}
                  imageClassName="aspect-[16/10]"
                  wrapperClassName="rounded-[1.65rem]"
                  src={heroImage}
                />
              </div>
            ) : null}

            <div className="mt-4 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold tracking-[0.16em] text-muted sm:text-[13px] sm:tracking-[0.22em]">
                  {getProjectRegion(project)}
                </p>
                <h1 className="mt-2 break-keep text-[1.55rem] leading-[1.18] tracking-[-0.04em] sm:text-[3rem]">
                  {project.name}
                </h1>
                <p className="mt-2 break-keep text-[12.5px] leading-5 text-muted sm:text-[15px] sm:leading-7">
                  {premiumLines[0] || addressLine || project.location}
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-semibold text-foreground sm:text-xs">
                {formatStatusLabel(project.status)}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 lg:hidden">
              <a className="button-accent !min-h-[42px] !rounded-[1rem] !px-3 !text-[12px]" href={formatPhoneHref(project.contactPhone)}>
                전화문의
              </a>
              <a
                className="button-primary !min-h-[42px] !rounded-[1rem] !px-3 !text-[12px]"
                href={reservationHref}
                rel="noreferrer"
                target="_blank"
              >
                방문예약
              </a>
            </div>
          </section>

          <section className="surface-panel p-5 sm:p-8" id="overview">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-[1.56rem] leading-[1.15] sm:text-3xl">사업 개요</h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-foreground sm:text-xs">
                {formatStatusLabel(project.status)}
              </span>
            </div>

            <div className="mt-5 space-y-2.5 sm:mt-6 sm:space-y-4">
              {overviewRows.map((row) => (
                <div
                  className="rounded-[1.4rem] border border-[color:var(--line)] bg-slate-50 px-4 py-3.5 sm:px-5 sm:py-5"
                  key={row.label}
                >
                  <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                    <p className="text-[12px] font-semibold text-muted sm:text-[15px]">{row.label}</p>
                    <p className="break-keep text-[0.94rem] font-semibold leading-6 text-foreground sm:max-w-[70%] sm:text-[1.3rem] sm:leading-7 sm:text-right">
                      {row.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="surface-panel p-5 sm:p-8" id="types">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
              <h2 className="text-[1.56rem] leading-[1.15] sm:text-3xl">타입 정보</h2>
              <span className="text-[11.5px] font-medium text-muted sm:text-sm">핵심 타입만 빠르게 확인</span>
            </div>

            <div className="mt-5 rounded-[1.5rem] border border-[color:var(--line)] bg-slate-50 px-4 py-4 sm:mt-6 sm:px-5 sm:py-6">
              <p className="text-[12px] text-muted sm:text-sm">공급 타입</p>
              <p className="mt-2 break-keep text-[1rem] font-semibold leading-[1.55] text-foreground sm:text-[1.8rem]">
                {project.unitPlan}
              </p>
            </div>

            {floorPlanImages.length > 0 && (
              <div className="mt-5 grid gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4">
                {floorPlanImages.map((image) => (
                  <div
                    className="overflow-hidden rounded-[1.5rem] border border-[color:var(--line)] bg-white"
                    key={image.id}
                  >
                    <LightboxImage
                      alt={`${project.name} 평면도`}
                      imageClassName="aspect-[4/3]"
                      wrapperClassName="rounded-[1.5rem]"
                      src={image.imageUrl}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="mt-5 grid gap-2.5 sm:mt-6 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-white px-4 py-4">
                <p className="text-[12px] text-muted sm:text-sm">공급 세대</p>
                <p className="mt-2 text-[1.06rem] font-semibold text-foreground sm:text-[1.7rem]">
                  {project.householdCount}
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-white px-4 py-4">
                <p className="text-[12px] text-muted sm:text-sm">입주 예정</p>
                <p className="mt-2 text-[1.06rem] font-semibold text-foreground sm:text-[1.7rem]">
                  {project.expectedMoveIn}
                </p>
              </div>
            </div>
          </section>

          <section className="surface-panel p-5 sm:p-8" id="location">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
              <h2 className="text-[1.56rem] leading-[1.15] sm:text-3xl">입지 안내</h2>
              <span className="text-[11.5px] font-medium text-muted sm:text-sm">현장 주변 핵심 정보</span>
            </div>

            <div className="mt-5 grid gap-3 sm:mt-6 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-slate-50 px-4 py-4">
                <p className="text-[12px] font-semibold text-muted sm:text-sm">현장 위치 및 주변환경</p>
                <div className="mt-3 space-y-2.5 text-[13px] leading-6 text-foreground sm:text-[15px] sm:leading-7">
                  {locationLines.map((line, index) => (
                    <p className="break-keep" key={`location-line-${index}`}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-slate-50 px-4 py-4">
                <p className="text-[12px] font-semibold text-muted sm:text-sm">프리미엄 포인트</p>
                <div className="mt-3 space-y-2.5 text-[13px] leading-6 text-foreground sm:text-[15px] sm:leading-7">
                  {premiumLines.map((line, index) => (
                    <p className="break-keep" key={`premium-line-${index}`}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {locationImages.length > 0 && (
              <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-[color:var(--line)] bg-white sm:mt-6">
                <LightboxImage
                  alt={`${project.name} 입지 이미지`}
                  imageClassName="aspect-[16/10]"
                  wrapperClassName="rounded-[1.5rem]"
                  src={locationImages[0].imageUrl}
                />
              </div>
            )}

            {lifestyleSections.length > 0 && (
              <div className="mt-5 space-y-4 sm:mt-6">
                {lifestyleSections.map((section) => {
                  const images = groupedImages[section.key] || [];

                  return (
                    <div
                      className="rounded-[1.5rem] border border-[color:var(--line)] bg-white p-4 sm:p-5"
                      key={section.key}
                    >
                      <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                        <h3 className="text-[1rem] leading-6 sm:text-[1.35rem]">{section.title}</h3>
                        <span className="text-[11px] text-muted sm:text-[13px]">{section.description}</span>
                      </div>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {images.slice(0, 4).map((image) => (
                          <div
                            className="overflow-hidden rounded-[1.2rem] border border-[color:var(--line)] bg-slate-50"
                            key={image.id}
                          >
                            <LightboxImage
                              alt={`${project.name} ${section.title}`}
                              imageClassName="aspect-[4/3]"
                              wrapperClassName="rounded-[1.2rem]"
                              src={image.imageUrl}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          <section className="surface-panel p-5 sm:p-8" id="faq">
            <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
              <h2 className="text-[1.56rem] leading-[1.15] sm:text-3xl">자주하는 질문</h2>
              <span className="text-[11.5px] font-medium text-muted sm:text-sm">현장 문의 전 빠르게 확인</span>
            </div>

            <div className="mt-5 space-y-4 sm:mt-6">
              {faqEntries.map((item, index) => (
                <div
                  className="overflow-hidden rounded-[1.5rem] border border-[color:var(--line)] bg-white shadow-[0_12px_28px_rgba(15,23,42,0.04)]"
                  key={`${item.question}-${index}`}
                >
                  <div className="flex gap-4 border-b border-[color:var(--line)] px-4 py-5 sm:px-6">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-[1rem] font-bold text-white sm:h-12 sm:w-12 sm:text-lg">
                      Q
                    </span>
                    <p className="break-keep pt-0.5 text-[0.96rem] font-semibold leading-7 text-foreground sm:pt-1 sm:text-[1.35rem] sm:leading-8">
                      {item.question}
                    </p>
                  </div>
                  <div className="flex gap-4 px-4 py-5 sm:px-6">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[1rem] font-bold text-white sm:h-12 sm:w-12 sm:text-lg">
                      A
                    </span>
                    <p className="break-keep pt-0.5 text-[13px] leading-6 text-slate-700 sm:pt-1 sm:text-[1.02rem] sm:leading-8">
                      {item.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:h-fit">
          <div className="surface-panel p-6">
            <p className="text-xs uppercase tracking-[0.32em] text-muted">Contact</p>
            <h2 className="mt-3 text-3xl">문의 안내</h2>
            <p className="mt-3 text-sm leading-8 text-muted">
              궁금한 내용은 전화상담 또는 방문예약으로 바로 연결하실 수 있습니다.
            </p>

            <div className="mt-6 grid gap-3">
              <a className="button-accent w-full" href={formatPhoneHref(project.contactPhone)}>
                전화상담
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
              관심 현장을 남겨주시면 빠르게 상담 도와드립니다.
            </div>

            <div className="mt-4 rounded-[1.5rem] border border-[color:var(--line)] bg-white px-4 py-4 text-sm leading-7 text-foreground">
              <p className="font-semibold">바로가기</p>
              <div className="mt-3 grid gap-2">
                <a className="text-muted transition hover:text-foreground" href="#overview">
                  기본정보 보기
                </a>
                <a className="text-muted transition hover:text-foreground" href="#types">
                  타입정보 보기
                </a>
                <a className="text-muted transition hover:text-foreground" href="#location">
                  입지환경 보기
                </a>
                <a className="text-muted transition hover:text-foreground" href="#faq">
                  자주하는질문 보기
                </a>
              </div>
            </div>

            <Link
              className="mt-4 inline-flex text-sm font-semibold text-muted transition hover:text-foreground"
              href={project.status === "active" ? "/projects" : "/completed"}
            >
              {project.status === "active" ? "분양중 목록으로 돌아가기" : "분양완료 목록으로 돌아가기"}
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}

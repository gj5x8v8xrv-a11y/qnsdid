import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { LightboxImage } from "@/components/ui/lightbox-image";
import { ProjectVisual } from "@/components/ui/project-visual";
import { getProjectBySlug } from "@/lib/data";
import { buildProjectMetadata } from "@/lib/seo";
import {
  formatPhoneHref,
  getProjectAddressLine,
  getProjectRegion,
  NAVER_INQUIRY_URL
} from "@/lib/utils";
import type { ProjectImage, ProjectImageType } from "@/lib/types";
import {
  DEFAULT_PROJECT_SECTION_ORDER,
  getYoutubeEmbedUrl,
  parseProjectPageMeta
} from "@/lib/project-page-meta";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  return project ? buildProjectMetadata(project) : { title: "현장을 찾을 수 없습니다" };
}

const IMAGE_SECTIONS: Array<{
  key: Exclude<ProjectImageType, "main">;
  eyebrow: string;
  title: string;
}> = [
  { key: "premium", eyebrow: "Premium", title: "프리미엄" },
  { key: "location", eyebrow: "Location", title: "입지 환경" },
  { key: "site_plan", eyebrow: "Complex", title: "단지 배치" },
  { key: "floor_plan", eyebrow: "Floor Plan", title: "평면 안내" },
  { key: "community", eyebrow: "Community", title: "커뮤니티" },
  { key: "gallery", eyebrow: "Gallery", title: "현장 갤러리" }
];

function groupImages(images: ProjectImage[]) {
  return images.reduce<Record<string, ProjectImage[]>>((groups, image) => {
    groups[image.imageType] = [...(groups[image.imageType] || []), image];
    return groups;
  }, {});
}

export default async function ProjectDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const address = getProjectAddressLine(project);
  const pageContent = parseProjectPageMeta(project.locationDescription);
  const youtubeEmbedUrl = getYoutubeEmbedUrl(pageContent.meta.youtubeUrl);
  const modelHouseAddress = pageContent.meta.modelHouseAddress;
  const siteAddress = pageContent.meta.siteAddress || address;
  const sectionOrder = [
    ...pageContent.meta.sectionOrder,
    ...DEFAULT_PROJECT_SECTION_ORDER.filter((key) => !pageContent.meta.sectionOrder.includes(key))
  ];
  const orderedImageSections = sectionOrder
    .map((key) => IMAGE_SECTIONS.find((section) => section.key === key))
    .filter((section): section is (typeof IMAGE_SECTIONS)[number] => Boolean(section));
  const groupedImages = groupImages(
    project.gallery.filter((image) => image.imageUrl !== project.coverImageUrl)
  );
  const overview = [
    { label: "세대수", value: project.householdCount },
    { label: "평형", value: project.unitPlan },
    { label: "입주예정", value: project.expectedMoveIn },
    { label: "대표번호", value: project.contactPhone }
  ];
  const detailSections = [
    {
      id: "sales",
      eyebrow: "Sales",
      title: "분양조건",
      content: project.salesConditions
    },
    {
      id: "premium",
      eyebrow: "Premium",
      title: "프리미엄 요약",
      content: project.premiumSummary
    },
    {
      id: "location",
      eyebrow: "Location",
      title: "입지 설명",
      content: pageContent.content
    }
  ].filter((section) => section.content.trim().length > 0);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_50%_0%,#2a2a2a_0%,#151515_28rem,#090909_72rem)] text-white">
      <div className="mx-auto max-w-5xl px-5 py-6 sm:px-8 sm:py-10">
        <div className="border border-white/15 bg-white/[0.035] p-4 backdrop-blur-2xl sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <Link className="min-w-0 truncate text-sm font-semibold text-white/90 sm:text-base" href="/projects">
              ← {project.name}
            </Link>
            <a
              className="shrink-0 rounded-none border border-white/30 bg-white/[0.06] px-3.5 py-2 text-xs font-medium text-white/90 backdrop-blur-xl transition hover:bg-white hover:text-black sm:text-sm"
              href={formatPhoneHref(project.contactPhone)}
            >
              {project.contactPhone}
            </a>
          </div>

          <nav aria-label="현장 상세 메뉴" className="mt-5 grid grid-cols-4 border-l border-t border-white/15 text-center text-[11px] text-white/60 sm:text-sm">
            <a className="border-b border-r border-white/15 px-2 py-2.5 transition hover:bg-white hover:text-black" href="#overview">사업개요</a>
            <a className="border-b border-r border-white/15 px-2 py-2.5 transition hover:bg-white hover:text-black" href="#location">입지</a>
            <a className="border-b border-r border-white/15 px-2 py-2.5 transition hover:bg-white hover:text-black" href="#gallery">갤러리</a>
            <a className="border-b border-r border-white/15 px-2 py-2.5 transition hover:bg-white hover:text-black" href="#contact">문의하기</a>
          </nav>
        </div>

        <main className="pb-10 pt-6 sm:pb-14 sm:pt-8">
          <section className="relative min-h-[420px] overflow-hidden border border-white/15 sm:min-h-[480px]">
            <ProjectVisual
              className="absolute inset-0 h-full w-full"
              imageUrl={project.coverImageUrl}
              title={project.name}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/15 to-black/20" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-14">
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/65 sm:text-xs">
                {getProjectRegion(project)} · 분양 현장
              </p>
              <h1 className="mt-4 max-w-4xl break-keep text-[2.5rem] font-medium leading-[1.08] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
                {project.name}
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">{address}</p>
            </div>
          </section>
          <p className="mt-3 flex items-center justify-between gap-3 text-[11px] text-white/40">
            <span>현장 이미지이며 실제와 차이가 있을 수 있습니다.</span>
            <span className="shrink-0 text-white/65">사진을 누르면 확대됩니다</span>
          </p>

          <section className="mt-10 border-y border-white/10 py-7" id="overview">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4">
              {overview.map((item) => (
                <div key={item.label}>
                  <dt className="text-xs text-white/40">{item.label}</dt>
                  <dd className="mt-2 break-keep text-base font-medium leading-6 text-white/85 sm:text-lg">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {detailSections.length ? (
            <section className="border-b border-white/10 py-14 text-center sm:py-20" id="location">
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/45">Highlights</p>
              <h2 className="mt-4 text-3xl font-medium tracking-[-0.04em] sm:text-5xl">현장의 핵심 가치</h2>
              <div className="mx-auto mt-10 grid max-w-4xl gap-px border border-white/10 bg-white/10 sm:grid-cols-3">
                {detailSections.map((section) => (
                  <div className="bg-[#101010] px-5 py-8 sm:px-6 sm:py-10" key={section.id}>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/35">{section.eyebrow}</p>
                    <h3 className="mt-3 text-lg font-medium text-white/90">{section.title}</h3>
                    <p className="mt-5 whitespace-pre-wrap break-words text-sm leading-6 text-white/55">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {youtubeEmbedUrl ? (
            <section className="border-b border-white/10 py-14 sm:py-20" id="video">
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/40">Movie</p>
              <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em] sm:text-5xl">현장 영상</h2>
              <div className="mt-8 aspect-video overflow-hidden border border-white/15 bg-black">
                <iframe
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="h-full w-full"
                  loading="lazy"
                  src={youtubeEmbedUrl}
                  title={`${project.name} 현장 영상`}
                />
              </div>
            </section>
          ) : null}

          <div id="gallery">
            {orderedImageSections.map((section) => {
              const images = groupedImages[section.key] || [];
              if (!images.length) return null;
              return (
                <section className="border-b border-white/10 py-14 sm:py-20" key={section.key}>
                  <div className="mb-8 flex items-end justify-between gap-5 sm:mb-10">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/40">{section.eyebrow}</p>
                      <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em] sm:text-5xl">{section.title}</h2>
                    </div>
                    <p className="hidden text-xs text-white/40 sm:block">사진을 누르면 크게 볼 수 있습니다</p>
                  </div>
                  <div className="-mx-5 grid grid-cols-1 gap-0 sm:-mx-8">
                    {images.map((image, index) => (
                      <LightboxImage
                        alt={`${project.name} ${section.title} ${index + 1}`}
                        imageClassName="!h-auto !w-full rounded-none !object-contain"
                        key={image.id}
                        src={image.imageUrl}
                        wrapperClassName="overflow-hidden border-0 bg-transparent"
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          <section className="border-b border-white/10 py-14 sm:py-20" id="directions">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/40">Directions</p>
            <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em] sm:text-5xl">오시는 길</h2>
            <div className="mt-8 grid gap-px border border-white/15 bg-white/15 sm:grid-cols-2">
              {modelHouseAddress ? (
                <div className="bg-[#101010] p-6 sm:p-8">
                  <p className="text-xs text-white/40">모델하우스</p>
                  <p className="mt-3 break-keep text-lg leading-8 text-white/85">{modelHouseAddress}</p>
                  <a
                    className="mt-6 inline-flex border border-white/25 px-4 py-2.5 text-sm text-white/80 transition hover:bg-white hover:text-black"
                    href={`https://map.naver.com/p/search/${encodeURIComponent(modelHouseAddress)}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    네이버 지도에서 보기 →
                  </a>
                </div>
              ) : null}
              <div className="bg-[#101010] p-6 sm:p-8">
                <p className="text-xs text-white/40">현장 위치</p>
                <p className="mt-3 break-keep text-lg leading-8 text-white/85">{siteAddress}</p>
                <a
                  className="mt-6 inline-flex border border-white/25 px-4 py-2.5 text-sm text-white/80 transition hover:bg-white hover:text-black"
                  href={`https://map.naver.com/p/search/${encodeURIComponent(siteAddress)}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  네이버 지도에서 보기 →
                </a>
              </div>
            </div>
            <a
              className="mt-4 flex min-h-14 w-full items-center justify-between bg-white px-5 text-sm font-medium text-black transition hover:bg-neutral-200"
              href={project.reservationUrl || NAVER_INQUIRY_URL}
              rel="noreferrer"
              target="_blank"
            >
              <span>모델하우스 방문예약하기</span>
              <span aria-hidden="true">→</span>
            </a>
          </section>

          <section className="border-t border-white/10 pt-8" id="contact">
            <div className="grid gap-3 sm:grid-cols-[1fr_0.65fr]">
              <a
                className="inline-flex min-h-12 items-center justify-center rounded-none bg-white px-5 text-sm font-medium text-black shadow-[0_12px_28px_rgba(0,0,0,0.25)] transition hover:bg-neutral-200"
                href={NAVER_INQUIRY_URL}
                rel="noreferrer"
                target="_blank"
              >
                문의하기
              </a>
              <a
                className="inline-flex min-h-12 items-center justify-center rounded-none border border-white/25 bg-white/5 px-5 text-sm font-medium text-white/85 backdrop-blur-xl transition hover:bg-white/10"
                href={formatPhoneHref(project.contactPhone)}
              >
                전화연결 {project.contactPhone}
              </a>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

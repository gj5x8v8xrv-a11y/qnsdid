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

function textLines(value: string) {
  return value
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

  if (!project) notFound();

  const address = getProjectAddressLine(project);
  const gallery = project.gallery.filter((image) => image.imageUrl !== project.coverImageUrl);
  const overview = [
    { label: "세대수", value: project.householdCount },
    { label: "평형", value: project.unitPlan },
    { label: "입주예정", value: project.expectedMoveIn },
    { label: "대표번호", value: project.contactPhone }
  ];
  const information = [
    ...textLines(project.salesConditions),
    ...textLines(project.locationDescription)
  ].slice(0, 6);

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

        <main className="py-10 sm:py-14">
          <p className="text-xs tracking-[0.08em] text-white/45">
            {getProjectRegion(project)} · {project.householdCount} · {project.unitPlan}
          </p>
          <h1 className="mt-5 max-w-3xl break-keep text-[2.25rem] font-medium leading-[1.12] tracking-[-0.055em] text-white sm:text-6xl">
            {project.name}
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
            {address}
          </p>

          <div className="mt-9">
            <ProjectVisual
              className="aspect-[16/10] rounded-none sm:aspect-[16/9]"
              imageUrl={project.coverImageUrl}
              title={project.name}
            />
            <p className="mt-3 flex items-center justify-between gap-3 text-[11px] text-white/40">
              <span>현장 이미지이며 실제와 차이가 있을 수 있습니다.</span>
              <span className="shrink-0 text-white/65">사진을 누르면 확대됩니다</span>
            </p>
          </div>

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

          {information.length ? (
            <section className="border-b border-white/10 py-10 sm:py-14" id="location">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/45">Information</p>
              <h2 className="mt-3 text-2xl font-medium tracking-[-0.035em]">현장 안내</h2>
              <div className="mt-6 grid gap-3 text-sm leading-7 text-white/65 sm:grid-cols-2">
                {information.map((line, index) => (
                  <p className="border-l border-white/15 pl-4" key={`${line}-${index}`}>{line}</p>
                ))}
              </div>
            </section>
          ) : null}

          {gallery.length ? (
            <section className="py-10 sm:py-14" id="gallery">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/45">Gallery</p>
              <h2 className="mt-3 text-2xl font-medium tracking-[-0.035em]">현장 이미지</h2>
              <p className="mt-2 text-xs text-white/45">사진을 선택하면 화면에 크게 확대해서 볼 수 있습니다.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {gallery.map((image) => (
                  <LightboxImage
                    alt={`${project.name} 현장 이미지`}
                    imageClassName="aspect-[16/10] rounded-none"
                    key={image.id}
                    src={image.imageUrl}
                    wrapperClassName="overflow-hidden rounded-none border border-white/15 bg-white/5"
                  />
                ))}
              </div>
            </section>
          ) : null}

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

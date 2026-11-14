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
    <div className="bg-[#081120] text-white">
      <div className="mx-auto max-w-5xl px-5 py-6 sm:px-8 sm:py-10">
        <div className="border-b border-white/10 pb-5">
          <div className="flex items-center justify-between gap-4">
            <Link className="min-w-0 truncate text-sm font-semibold text-white/90 sm:text-base" href="/projects">
              ← {project.name}
            </Link>
            <a
              className="shrink-0 rounded-lg border border-cyan-400/45 bg-cyan-400/5 px-3.5 py-2 text-xs font-semibold text-cyan-300 sm:text-sm"
              href={formatPhoneHref(project.contactPhone)}
            >
              {project.contactPhone}
            </a>
          </div>

          <nav aria-label="현장 상세 메뉴" className="mt-5 flex gap-5 overflow-x-auto pb-1 text-xs text-white/55 sm:text-sm">
            <a className="whitespace-nowrap hover:text-white" href="#overview">사업개요</a>
            <a className="whitespace-nowrap hover:text-white" href="#location">입지</a>
            <a className="whitespace-nowrap hover:text-white" href="#gallery">갤러리</a>
            <a className="whitespace-nowrap hover:text-white" href="#contact">문의하기</a>
          </nav>
        </div>

        <main className="py-10 sm:py-14">
          <p className="text-xs tracking-[0.08em] text-white/45">
            {getProjectRegion(project)} · {project.householdCount} · {project.unitPlan}
          </p>
          <h1 className="mt-5 max-w-3xl break-keep bg-gradient-to-r from-white via-blue-100 to-cyan-300 bg-clip-text text-[2.25rem] font-medium leading-[1.12] tracking-[-0.055em] text-transparent sm:text-6xl">
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
            <p className="mt-3 text-[11px] text-white/35">현장 이미지이며 실제와 차이가 있을 수 있습니다.</p>
          </div>

          <section className="mt-10 border-y border-white/10 py-7" id="overview">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4">
              {overview.map((item) => (
                <div key={item.label}>
                  <dt className="text-xs text-white/40">{item.label}</dt>
                  <dd className="mt-2 break-keep text-base font-medium leading-6 text-cyan-300 sm:text-lg">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {information.length ? (
            <section className="border-b border-white/10 py-10 sm:py-14" id="location">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">Information</p>
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
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">Gallery</p>
              <h2 className="mt-3 text-2xl font-medium tracking-[-0.035em]">현장 이미지</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {gallery.map((image) => (
                  <LightboxImage
                    alt={`${project.name} 현장 이미지`}
                    imageClassName="aspect-[16/10] rounded-xl"
                    key={image.id}
                    src={image.imageUrl}
                    wrapperClassName="overflow-hidden rounded-xl bg-white/5"
                  />
                ))}
              </div>
            </section>
          ) : null}

          <section className="border-t border-white/10 pt-8" id="contact">
            <div className="grid gap-3 sm:grid-cols-[1fr_0.65fr]">
              <a
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(37,99,235,0.28)] transition hover:bg-blue-500"
                href={NAVER_INQUIRY_URL}
                rel="noreferrer"
                target="_blank"
              >
                문의하기
              </a>
              <a
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-cyan-400/45 px-5 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400/10"
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

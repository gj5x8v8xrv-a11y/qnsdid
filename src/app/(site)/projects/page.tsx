import Link from "next/link";

import { PageHero } from "@/components/site/page-hero";
import { ProjectCard } from "@/components/site/project-card";
import { SectionHeading } from "@/components/site/section-heading";
import { buildProjectsMetadata } from "@/lib/seo";
import { getProjects } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata = buildProjectsMetadata("active", "/projects");

export default async function ProjectsPage() {
  const projects = await getProjects("active");

  return (
    <>
      <PageHero
        actions={
          <>
            <Link className="button-primary" href="/contact">상담신청</Link>
            <Link className="button-secondary" href="/completed">분양완료 보기</Link>
          </>
        }
        description="분양중 현장의 핵심 정보와 상담 동선을 보기 쉽게 정리한 현장 목록입니다."
        eyebrow="Active Projects"
        stats={[
          { label: "운영 현장", value: `${projects.length}곳` },
          { label: "상담 안내", value: "전화문의 연결" },
          { label: "방문 예약", value: "상세페이지 안내" }
        ]}
        title="현재 분양중인 현장"
      />

      <section className="page-shell pb-24">
        <SectionHeading
          action={<Link className="button-secondary" href="/company">회사소개 보기</Link>}
          description="카드 디자인, 이미지 비율, 텍스트 간격을 정리해 현장 리스트가 저렴해 보이지 않도록 재구성했습니다."
          eyebrow="Directory"
          title="상담 연결에 적합한 분양 현장 목록"
        />

        {projects.length > 0 ? (
          <div className="card-grid mt-10">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="surface-panel mt-10 p-8 text-center text-sm text-muted">
            현재 안내 중인 분양중 현장이 없습니다. 상담문의를 남겨주시면 순차적으로 안내해드립니다.
          </div>
        )}
      </section>
    </>
  );
}

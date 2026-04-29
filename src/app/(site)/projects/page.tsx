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
        description="현재 살펴보실 수 있는 현장을 먼저 확인하고, 자세한 내용은 상세 페이지에서 편하게 보실 수 있습니다."
        eyebrow="분양중 현장"
        stats={[
          { label: "안내 현장", value: `${projects.length}곳` },
          { label: "문의 방법", value: "전화 또는 상담신청" },
          { label: "방문 안내", value: "현장별 문의 가능" }
        ]}
        title="현재 살펴보실 수 있는 분양 현장"
      />

      <section className="page-shell pb-24">
        <SectionHeading
          action={<Link className="button-secondary" href="/company">회사소개 보기</Link>}
          description="위치, 세대수, 입주예정일 등 먼저 보고 싶은 내용을 편하게 확인해보세요."
          eyebrow="현장 목록"
          title="관심 있는 현장을 편하게 살펴보세요"
        />

        {projects.length > 0 ? (
          <div className="card-grid mt-10">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="surface-panel mt-10 p-8 text-center text-sm text-muted">
            현재 안내 중인 분양중 현장이 없습니다. 문의를 남겨주시면 확인 후 안내해드리겠습니다.
          </div>
        )}
      </section>
    </>
  );
}

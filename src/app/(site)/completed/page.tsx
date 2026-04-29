import Link from "next/link";

import { PageHero } from "@/components/site/page-hero";
import { ProjectCard } from "@/components/site/project-card";
import { SectionHeading } from "@/components/site/section-heading";
import { getProjects } from "@/lib/data";
import { buildProjectsMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = buildProjectsMetadata("completed", "/completed");

export default async function CompletedProjectsPage() {
  const projects = await getProjects("completed");

  return (
    <>
      <PageHero
        actions={
          <>
            <Link className="button-primary" href="/projects">
              분양중 현장 보기
            </Link>
            <Link className="button-secondary" href="/contact">
              상담문의
            </Link>
          </>
        }
        description="소개가 완료된 현장도 함께 정리해두었습니다. 어떤 현장을 소개해왔는지 편하게 확인해보세요."
        eyebrow="분양완료 현장"
        stats={[
          { label: "소개 완료 현장", value: `${projects.length}곳` },
          { label: "확인 내용", value: "위치와 현장 정보" },
          { label: "함께 보기", value: "분양중 현장" }
        ]}
        title="지금까지 소개해온 현장"
      />

      <section className="page-shell pb-24">
        <SectionHeading
          description="소개가 완료된 현장도 함께 정리해두었습니다. 지금까지 어떤 현장을 소개해왔는지 편하게 살펴보세요."
          eyebrow="완료 현장"
          title="소개가 완료된 현장"
        />

        {projects.length > 0 ? (
          <div className="card-grid mt-10">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="surface-panel mt-10 p-8 text-center text-sm leading-8 text-muted">
            현재 공개된 분양완료 현장이 없습니다. 준비되는 대로 안내해드리겠습니다.
          </div>
        )}
      </section>
    </>
  );
}

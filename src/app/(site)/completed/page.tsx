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
        description="분양완료 현장은 브랜드 신뢰를 보여주는 중요한 실적 자산입니다. 완료 현장을 정리해두면 회사 신뢰도와 현장 운영 경험을 동시에 전달할 수 있습니다."
        eyebrow="Completed Projects"
        stats={[
          { label: "완료 현장", value: `${projects.length}곳` },
          { label: "신뢰 자산", value: "실적 아카이브" },
          { label: "브랜드 효과", value: "신뢰 강화" }
        ]}
        title="분양완료 현장 아카이브"
      />

      <section className="page-shell pb-24">
        <SectionHeading
          description="완료 현장도 고유 페이지와 함께 정리해두면, 방문자에게 실제 운영 경험과 실적을 한눈에 전달할 수 있습니다."
          eyebrow="Archive"
          title="신뢰를 높여주는 분양완료 실적"
        />

        {projects.length > 0 ? (
          <div className="card-grid mt-10">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="surface-panel mt-10 p-8 text-center text-sm text-muted">
            현재 안내 중인 분양완료 실적이 없습니다. 새로운 현장 정보는 분양중 페이지에서 확인하실 수 있습니다.
          </div>
        )}
      </section>
    </>
  );
}

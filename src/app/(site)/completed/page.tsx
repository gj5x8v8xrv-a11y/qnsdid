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
        description="완료된 현장을 실적처럼 정리해두면 일반 고객도 운영 경험과 신뢰도를 한 번에 이해할 수 있습니다. 회사 소개보다 실적이 더 강한 설득이 되는 경우가 많습니다."
        eyebrow="Completed Projects"
        stats={[
          { label: "완료 현장", value: `${projects.length}곳` },
          { label: "신뢰 자산", value: "실적 아카이브" },
          { label: "브랜드 효과", value: "신뢰 강화" }
        ]}
        title="분양완료 실적 아카이브"
      />

      <section className="page-shell pb-24">
        <SectionHeading
          description="완료 현장은 삭제하지 말고 실적처럼 남겨두는 편이 훨씬 유리합니다. 고객은 실제 운영 경험과 결과를 보고 더 쉽게 문의를 결정합니다."
          eyebrow="Archive"
          title="브랜드 신뢰를 높여주는 분양완료 실적"
        />

        {projects.length > 0 ? (
          <div className="card-grid mt-10">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="surface-panel mt-10 p-8 text-center text-sm leading-8 text-muted">
            현재 공개된 분양완료 실적이 없습니다. 완료된 현장은 삭제하지 말고 분양완료로 전환해 신뢰 자산으로 활용해보세요.
          </div>
        )}
      </section>
    </>
  );
}

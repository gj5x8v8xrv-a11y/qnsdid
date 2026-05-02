import Link from "next/link";

import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { getSiteConfig } from "@/lib/utils";

export const metadata = {
  title: "회사소개",
  description: "분양맵은 관심 있는 분양 현장을 편하게 살펴보고 문의할 수 있도록 정보를 정리해 소개합니다."
};

export default function CompanyPage() {
  const site = getSiteConfig();

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
        description="분양맵은 관심 있는 현장을 편하게 비교하고 필요한 정보를 차분하게 확인할 수 있도록 정리해 소개합니다."
        eyebrow="회사소개"
        stats={[
          { label: "대표번호", value: site.companyPhone },
          { label: "문의 메일", value: site.companyEmail },
          { label: "안내 현장", value: "분양중 · 분양완료" }
        ]}
        title="관심 있는 분양 현장을 편하게 살펴볼 수 있도록 안내합니다"
      />

      <section className="page-shell pb-24">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
          <div className="surface-panel p-8 lg:p-10">
            <SectionHeading
              eyebrow="분양맵 소개"
              title="필요한 정보를 쉽게 확인할 수 있도록 정리했습니다"
              description="현장별 핵심 정보와 이미지, 문의 동선을 보기 편하게 배치해 처음 방문하셔도 부담 없이 살펴보실 수 있습니다."
            />

            <div className="mt-8 grid gap-4">
              {[
                "현재 안내 중인 현장과 소개 완료 현장을 구분해 살펴보실 수 있습니다.",
                "지역, 평형, 세대수, 기본 정보를 함께 보여드려 비교가 편합니다.",
                "궁금한 현장은 전화나 상담문의, 방문예약으로 바로 연결하실 수 있습니다."
              ].map((item) => (
                <div className="rounded-[1.5rem] bg-slate-50 px-5 py-5 text-sm leading-8 text-foreground" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="surface-panel p-8 lg:p-10">
            <SectionHeading
              eyebrow="이용 안내"
              title="이렇게 활용해보세요"
              description="메인에서 관심 지역의 현장을 먼저 살펴보시고, 상세페이지에서 이미지와 기본 정보를 확인한 뒤 문의를 남겨주시면 됩니다."
            />

            <div className="mt-8 space-y-4 text-sm leading-8 text-muted">
              <p>1. 분양중 현장에서 현재 안내 중인 현장을 확인합니다.</p>
              <p>2. 상세페이지에서 위치, 평형, 이미지, 기본 정보를 살펴봅니다.</p>
              <p>3. 궁금한 점이나 방문 희망 일정이 있으면 상담문의를 남깁니다.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

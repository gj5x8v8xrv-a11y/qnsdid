import Link from "next/link";

import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { getSiteConfig } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "회사소개",
  description: "분양대행 전문 회사의 운영 방식과 강점을 소개합니다."
};

export default function CompanyPage() {
  const site = getSiteConfig();

  return (
    <>
      <PageHero
        actions={<Link className="button-primary" href="/contact">상담 문의하기</Link>}
        description="회사 소개부터 현장 안내, 상담 연결까지 신뢰감 있게 이어지는 분양대행 전문 파트너입니다."
        eyebrow="Company"
        title={`${site.companyName}는 현장의 가치를 가장 설득력 있게 전달하는 분양대행 팀입니다`}
        visual={
          <div className="grid gap-4">
            {[
              "첫 방문에도 이해하기 쉬운 정보 구성",
              "현장별 강점이 분명하게 보이는 소개 방식",
              "전화문의와 방문예약 중심의 상담 동선"
            ].map((item) => (
              <div className="rounded-[1.5rem] border border-white/10 bg-white/10 px-5 py-5 text-sm leading-7 text-white/75" key={item}>
                {item}
              </div>
            ))}
          </div>
        }
      />

      <section className="page-shell pb-24">
        <SectionHeading
          description="신뢰감 있는 회사 소개는 브랜드를 설명하는 데서 끝나지 않고, 왜 이 회사를 통해 상담해야 하는지까지 설득해야 합니다."
          eyebrow="Core Value"
          title="회사 소개도 고객 신뢰를 만드는 중요한 출발점입니다"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "브랜드 신뢰 형성",
              description:
                "첫 방문에서 느껴지는 인상, 현장별 소개 문구, CTA 배치까지 세심하게 설계해 신뢰도를 높입니다."
            },
            {
              title: "현장 중심 운영",
              description:
                "분양중 현장과 완료 현장을 분리해 보여주고, 현장별 상세 정보를 보기 쉽게 정리합니다."
            },
            {
              title: "상담 연결 최적화",
              description:
                "전화문의, 상담신청, 방문예약 흐름을 자연스럽게 배치해 문의까지 이어지도록 돕습니다."
            }
          ].map((item) => (
            <article className="surface-panel p-6 lg:p-7" key={item.title}>
              <p className="text-xs uppercase tracking-[0.32em] text-muted">Value</p>
              <h2 className="mt-4 text-3xl">{item.title}</h2>
              <p className="mt-4 text-sm leading-8 text-muted">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-shell pb-24">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="surface-panel p-8 lg:p-10">
            <p className="text-xs uppercase tracking-[0.32em] text-muted">How We Work</p>
            <h2 className="mt-4 text-4xl">운영 방식</h2>
            <div className="mt-8 grid gap-4">
              {[
                "1. 현장 핵심 강점과 분양 포인트 정리",
                "2. 현장별 상세 소개와 이미지 구성",
                "3. 고객이 이해하기 쉬운 정보 흐름 설계",
                "4. 상담과 방문예약으로 이어지는 문의 동선 강화"
              ].map((item) => (
                <div className="rounded-[1.5rem] bg-slate-50 px-5 py-5 text-sm leading-8 text-foreground" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="surface-dark bg-hero-navy p-8 lg:p-10">
            <p className="text-xs uppercase tracking-[0.32em] text-white/50">Why {site.companyName}</p>
            <h2 className="mt-4 text-4xl text-white">보기에만 예쁜 사이트가 아니라 운영까지 편해야 합니다</h2>
            <div className="mt-8 grid gap-4">
              {[
                "분양중 / 분양완료 구조를 분리해 정보가 정리됩니다.",
                "현장별 핵심 정보와 입지 설명을 분명하게 전달합니다.",
                "대표 이미지와 상세 이미지를 통해 현장 분위기를 직관적으로 보여줍니다.",
                "문의와 방문예약으로 자연스럽게 이어지는 구조를 갖추고 있습니다."
              ].map((item) => (
                <div className="rounded-[1.5rem] border border-white/10 bg-white/10 px-5 py-5 text-sm leading-8 text-white/70" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

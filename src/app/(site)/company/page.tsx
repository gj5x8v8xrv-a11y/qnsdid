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
        actions={
          <>
            <Link className="button-primary" href="/contact">
              상담 문의하기
            </Link>
            <Link className="button-secondary" href="/projects">
              분양중 현장 보기
            </Link>
          </>
        }
        description="회사 소개는 길게 설명하는 대신, 왜 이 회사를 통해 상담을 받아야 하는지 분명하게 보여줘야 합니다. 현장 안내, 상담 연결, 방문예약까지 짧고 단단하게 운영합니다."
        eyebrow="Company"
        title={`${site.companyName}는 상담과 현장 안내를 빠르게 연결하는 분양 현장 운영 파트너입니다`}
        visual={
          <div className="grid gap-4">
            {[
              "대표번호와 상담 버튼을 앞쪽에 배치",
              "현장별 강점과 조건을 바로 확인 가능",
              "방문예약까지 이어지는 짧은 문의 동선"
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
          description="일반 고객은 긴 회사 역사보다 지금 어떤 방식으로 현장을 안내하고, 상담을 얼마나 빠르게 연결하는지를 더 궁금해합니다."
          eyebrow="Core Value"
          title="회사소개도 결국은 고객 신뢰와 문의 전환을 위해 존재합니다"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "현장 중심 소개",
              description:
                "고객이 가장 먼저 궁금해하는 현장 정보, 입지 포인트, 분양조건을 앞쪽에서 분명하게 안내합니다."
            },
            {
              title: "빠른 상담 연결",
              description:
                "대표번호, 상담신청, 방문예약 버튼을 반복 배치해 스크롤 중간에도 바로 행동할 수 있게 구성합니다."
            },
            {
              title: "실적 기반 신뢰",
              description:
                "분양완료 현장을 실적 아카이브처럼 유지해 운영 경험과 브랜드 신뢰를 함께 보여줍니다."
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
                "1. 현장별 핵심 장점과 분양조건 정리",
                "2. 고객이 이해하기 쉬운 순서로 정보 배치",
                "3. 전화문의와 상담신청 CTA를 반복 노출",
                "4. 분양완료 실적까지 함께 정리해 신뢰 확보"
              ].map((item) => (
                <div className="rounded-[1.5rem] bg-slate-50 px-5 py-5 text-sm leading-8 text-foreground" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="surface-dark bg-hero-navy p-8 lg:p-10">
            <p className="text-xs uppercase tracking-[0.32em] text-white/50">Why {site.companyName}</p>
            <h2 className="mt-4 text-4xl text-white">보기 좋은 것보다, 믿고 문의할 수 있는 구조가 더 중요합니다</h2>
            <div className="mt-8 grid gap-4">
              {[
                "분양중 / 분양완료 구조를 분리해 정보가 빠르게 정리됩니다.",
                "현장별 핵심 정보와 입지 설명을 짧고 분명하게 전달합니다.",
                "대표 이미지와 상세 이미지를 통해 실제 분위기를 직관적으로 보여줍니다.",
                "문의와 방문예약으로 자연스럽게 이어지는 CTA 구조를 유지합니다."
              ].map((item) => (
                <div className="rounded-[1.5rem] border border-white/10 bg-white/10 px-5 py-5 text-sm leading-8 text-white/70" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell pb-24">
        <div className="surface-panel p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-muted">Quick Contact</p>
              <h2 className="mt-4 text-4xl">궁금한 현장이 있다면 회사소개보다 상담이 먼저입니다</h2>
              <p className="mt-5 text-sm leading-8 text-muted">
                분양 현장 문의, 조건 상담, 방문예약 흐름을 빠르게 연결해드립니다. 관심 현장을 확인했다면 지금 바로 상담을 시작해보세요.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <a className="button-accent" href={`tel:${site.companyPhone.replace(/[^+\d]/g, "")}`}>
                전화문의
              </a>
              <Link className="button-primary" href="/contact">
                상담신청
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

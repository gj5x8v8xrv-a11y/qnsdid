import Link from "next/link";

import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { getSiteConfig } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "회사소개",
  description: "분양맵이 어떤 방식으로 현장을 정리해 안내하는지 편하게 확인해보세요."
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
        description="좋은 분양 현장을 보기 쉽게 정리하고, 필요한 내용은 편하게 문의하실 수 있도록 안내합니다."
        eyebrow="회사 소개"
        title={`${site.companyName}는 좋은 분양 현장을 편하게 살펴보실 수 있도록 정리해 안내합니다`}
        visual={
          <div className="grid gap-4">
            {[
              "현재 분양중인 현장 확인",
              "현장별 주요 정보 확인",
              "전화문의와 상담신청 바로 가능"
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
          description="위치, 세대수, 분양조건처럼 먼저 확인하고 싶은 내용을 보기 쉽게 정리해 안내합니다."
          eyebrow="분양맵 소개"
          title="필요한 내용을 보기 편하게 정리했습니다"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "현장별 주요 정보",
              description:
                "현장 위치, 세대수, 평형, 입주예정일처럼 먼저 궁금한 내용을 한눈에 확인하실 수 있습니다."
            },
            {
              title: "편한 문의 방법",
              description:
                "전화문의와 상담신청을 통해 궁금한 내용을 편하게 남기실 수 있습니다."
            },
            {
              title: "소개 완료 현장 함께 보기",
              description:
                "소개가 완료된 현장도 함께 정리해두어 지금까지 어떤 현장을 소개해왔는지 살펴보실 수 있습니다."
            }
          ].map((item) => (
            <article className="surface-panel p-6 lg:p-7" key={item.title}>
              <p className="text-xs uppercase tracking-[0.32em] text-muted">안내 항목</p>
              <h2 className="mt-4 text-3xl">{item.title}</h2>
              <p className="mt-4 text-sm leading-8 text-muted">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-shell pb-24">
        <div className="surface-panel p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-muted">문의 안내</p>
              <h2 className="mt-4 text-4xl">궁금한 현장은 편하게 문의해보세요</h2>
              <p className="mt-5 text-sm leading-8 text-muted">
                관심 있는 현장과 궁금한 내용을 남겨주시면 확인 후 빠르게 안내해드립니다.
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

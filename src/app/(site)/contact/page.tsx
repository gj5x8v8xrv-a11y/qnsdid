import Link from "next/link";

import { FlashBanner } from "@/components/ui/flash-banner";
import { InquiryForm } from "@/components/site/inquiry-form";
import { PageHero } from "@/components/site/page-hero";
import { getProjects } from "@/lib/data";
import { getSiteConfig } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "상담문의",
  description: "관심 있는 현장과 문의 내용을 남겨주시면 확인 후 안내해드립니다."
};

export default async function ContactPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const projects = await getProjects("active");
  const site = getSiteConfig();
  const selectedSlug = Array.isArray(params.project) ? params.project[0] : params.project;
  const selectedProjectId =
    projects.find((project) => project.slug === selectedSlug)?.id || null;
  const message = Array.isArray(params.message) ? params.message[0] : params.message;
  const error = Array.isArray(params.error) ? params.error[0] : params.error;

  return (
    <>
      <PageHero
        actions={
          <>
            <a className="button-accent" href={`tel:${site.companyPhone.replace(/[^+\d]/g, "")}`}>
              전화문의
            </a>
            <Link className="button-secondary" href="/projects">분양중 현장 보기</Link>
          </>
        }
        description="관심 있는 현장과 궁금한 내용을 남겨주시면 확인 후 안내해드립니다."
        eyebrow="상담 문의"
        title="관심 있는 현장을 편하게 문의해보세요"
        visual={
          <div className="grid gap-4">
            {[
              `대표번호 ${site.companyPhone}`,
              "관심 현장 선택 가능",
              "방문 일정도 함께 문의 가능"
            ].map((item) => (
              <div className="rounded-[1.5rem] border border-white/10 bg-white/10 px-5 py-5 text-sm leading-7 text-white/75" key={item}>
                {item}
              </div>
            ))}
          </div>
        }
      />

      <section className="page-shell grid gap-6 pb-24 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-6">
          <div className="surface-panel p-6 sm:p-8">
            <h2 className="text-3xl">문의 안내</h2>
            <div className="mt-5 space-y-3 text-sm leading-8 text-muted">
              <p>대표번호 {site.companyPhone}</p>
              <p>이메일 {site.companyEmail}</p>
              <p>주소 {site.companyAddress}</p>
              <p>평일과 주말 모두 확인 후 순차적으로 안내해드립니다.</p>
            </div>
          </div>

          <div className="space-y-3">
            <FlashBanner message={message} tone="success" />
            <FlashBanner message={error} tone="error" />
          </div>
        </div>

        <InquiryForm projects={projects} selectedProjectId={selectedProjectId} />
      </section>
    </>
  );
}

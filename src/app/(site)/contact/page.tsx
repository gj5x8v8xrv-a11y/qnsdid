import { FlashBanner } from "@/components/ui/flash-banner";
import { InquiryForm } from "@/components/site/inquiry-form";
import { PageHero } from "@/components/site/page-hero";
import { getProjects } from "@/lib/data";
import { getSiteConfig } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "상담문의",
  description: "이름, 연락처, 관심 현장, 문의 내용을 남기면 상담 문의를 저장합니다."
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
            <a className="button-secondary" href={`tel:${site.companyPhone.replace(/[^+\d]/g, "")}`}>
              대표번호 {site.companyPhone}
            </a>
          </>
        }
        description="관심 현장, 분양조건, 방문 희망일을 남겨주시면 대표번호 또는 상담신청으로 빠르게 연결해드립니다."
        eyebrow="Contact"
        title="관심 현장 상담과 방문 문의를 바로 접수해보세요"
        visual={
          <div className="grid gap-4">
            {[
              `대표번호 ${site.companyPhone}`,
              "관심 현장 선택 후 맞춤 상담 가능",
              "방문 예약과 분양 조건 안내 연결"
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
            <h2 className="text-3xl">상담 안내</h2>
            <div className="mt-5 space-y-3 text-sm leading-8 text-muted">
              <p>대표번호 {site.companyPhone}</p>
              <p>이메일 {site.companyEmail}</p>
              <p>주소 {site.companyAddress}</p>
            </div>
          </div>

          <div className="surface-panel p-6 sm:p-8">
            <h2 className="text-3xl">응대 기준</h2>
            <div className="mt-5 space-y-3 text-sm leading-8 text-muted">
              <p>관심 현장과 문의 내용을 함께 남겨주시면 상담 흐름이 훨씬 빨라집니다.</p>
              <p>방문예약이 필요한 경우 별도 안내 또는 네이버 예약 링크로 연결해드립니다.</p>
              <p>남겨주신 연락처로 분양조건, 일정, 현장 분위기까지 순차적으로 안내드립니다.</p>
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

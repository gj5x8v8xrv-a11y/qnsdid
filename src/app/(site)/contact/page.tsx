import { FlashBanner } from "@/components/ui/flash-banner";
import { InquiryForm } from "@/components/site/inquiry-form";
import { PageHero } from "@/components/site/page-hero";
import { getProjects } from "@/lib/data";
import { getSiteConfig } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "상담문의",
  description: "관심 있는 현장과 문의 내용을 남겨주시면 확인 후 순차적으로 안내해드립니다."
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
          <a
            className="button-accent !min-h-[42px] !px-4 sm:!min-h-[44px] sm:!px-6"
            href={`tel:${site.companyPhone.replace(/[^+\d]/g, "")}`}
          >
            전화문의
          </a>
        }
        actionsClassName="flex"
        description="문의칸에 남겨주시면 확인 후 순차적으로 연락드립니다."
        eyebrow="상담문의"
        title="궁금한 현장을 편하게 문의해보세요"
      />

      <section className="page-shell pb-24">
        <div className="mx-auto w-full max-w-3xl space-y-4">
          <div className="space-y-3">
            <FlashBanner message={message} tone="success" />
            <FlashBanner message={error} tone="error" />
          </div>

          <InquiryForm projects={projects} selectedProjectId={selectedProjectId} />
        </div>
      </section>
    </>
  );
}

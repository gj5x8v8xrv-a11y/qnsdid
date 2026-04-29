import { getSiteConfig } from "@/lib/utils";

export const metadata = {
  title: "개인정보처리방침",
  description: "분양맵 개인정보 수집 및 이용 안내"
};

export default function PrivacyPage() {
  const site = getSiteConfig();

  return (
    <section className="page-shell section-space">
      <div className="surface-panel p-6 sm:p-8 lg:p-10">
        <p className="text-xs uppercase tracking-[0.34em] text-muted">Privacy Policy</p>
        <h1 className="mt-4 text-4xl">개인정보처리방침</h1>
        <p className="mt-5 max-w-3xl text-sm leading-8 text-muted">
          {site.companyName}은 상담 문의 확인과 현장 안내를 위해 필요한 최소한의 개인정보만 수집합니다.
        </p>

        <div className="mt-10 grid gap-6">
          {[
            {
              title: "1. 수집하는 개인정보 항목",
              body: "이름, 연락처, 관심 현장, 문의 내용"
            },
            {
              title: "2. 개인정보 이용 목적",
              body: "상담 문의 확인, 관심 현장 안내, 방문 일정 및 상담 관련 연락"
            },
            {
              title: "3. 보관 기간",
              body: "문의 확인과 안내가 완료될 때까지 보관하며, 관련 법령이 정한 기간이 있는 경우 해당 기간 동안 보관할 수 있습니다."
            },
            {
              title: "4. 문의처",
              body: `대표번호 ${site.companyPhone} / 이메일 ${site.companyEmail}`
            }
          ].map((section) => (
            <article className="rounded-[1.75rem] bg-slate-50 p-5 sm:p-6" key={section.title}>
              <h2 className="text-2xl">{section.title}</h2>
              <p className="mt-3 text-sm leading-8 text-muted">{section.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

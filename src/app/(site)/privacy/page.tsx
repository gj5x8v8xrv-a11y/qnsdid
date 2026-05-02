import { PageHero } from "@/components/site/page-hero";

export const metadata = {
  title: "개인정보처리방침",
  description: "분양맵 개인정보처리방침 안내입니다."
};

const policySections = [
  {
    title: "1. 수집하는 개인정보",
    body: "상담문의 이용 시 이름, 연락처, 관심 현장, 문의 내용을 수집할 수 있습니다."
  },
  {
    title: "2. 개인정보 이용 목적",
    body: "남겨주신 문의 확인, 현장 안내, 상담 연락, 방문 일정 조율을 위해 개인정보를 이용합니다."
  },
  {
    title: "3. 보관 기간",
    body: "문의 응대와 사후 안내에 필요한 기간 동안 보관하며, 관련 법령에 따라 별도 보관이 필요한 경우 해당 기간 동안 보관합니다."
  },
  {
    title: "4. 제3자 제공",
    body: "법령에 따른 경우를 제외하고, 이용자의 동의 없이 개인정보를 외부에 제공하지 않습니다."
  },
  {
    title: "5. 문의",
    body: "개인정보 관련 문의는 사이트에 기재된 대표번호 또는 이메일을 통해 접수하실 수 있습니다."
  }
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        description="상담문의 이용 시 수집되는 개인정보와 이용 목적을 안내드립니다."
        eyebrow="개인정보처리방침"
        title="개인정보 수집 및 이용 안내"
      />

      <section className="page-shell pb-24">
        <div className="surface-panel space-y-6 p-8 lg:p-10">
          {policySections.map((section) => (
            <div className="rounded-[1.5rem] bg-slate-50 px-6 py-6" key={section.title}>
              <h2 className="text-2xl">{section.title}</h2>
              <p className="mt-4 text-sm leading-8 text-muted">{section.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

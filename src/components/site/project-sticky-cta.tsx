import { formatPhoneHref } from "@/lib/utils";

export function ProjectStickyCta({
  inquiryUrl,
  phone
}: {
  inquiryUrl: string;
  phone: string;
}) {
  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 hidden w-[320px] lg:block">
        <div className="overflow-hidden border border-white/20 bg-black/85 p-5 text-white shadow-[0_20px_55px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">현장 상담</p>
          <p className="mt-3 text-xl font-semibold">{phone}</p>
          <div className="mt-5 grid gap-3">
            <a
              className="button-primary w-full"
              href={inquiryUrl}
              rel="noreferrer"
              target="_blank"
            >
              문의하기
            </a>
            <a className="button-secondary w-full" href={formatPhoneHref(phone)}>
              전화연결
            </a>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/80 bg-white/70 p-2.5 shadow-[0_-10px_35px_rgba(0,0,0,0.09)] backdrop-blur-2xl lg:hidden">
        <div className="page-shell flex gap-2 px-0">
          <a
            className="button-primary !min-h-[40px] flex-1"
            href={inquiryUrl}
            rel="noreferrer"
            target="_blank"
          >
            문의하기
          </a>
          <a
            className="button-accent !min-h-[40px] flex-1"
            href={formatPhoneHref(phone)}
          >
            전화연결
          </a>
        </div>
      </div>
    </>
  );
}

"use client";

import { usePathname } from "next/navigation";

import type { HomePageSettings } from "@/lib/types";
import { getSiteConfig, NAVER_INQUIRY_URL } from "@/lib/utils";

export function SiteStickyCta({
  settings
}: {
  settings: HomePageSettings;
}) {
  const pathname = usePathname();
  const site = getSiteConfig();
  const phoneHref = `tel:${site.companyPhone.replace(/[^+\d]/g, "")}`;

  if (/^\/projects\/[^/]+$/.test(pathname)) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 hidden w-[320px] lg:block">
        <div className="overflow-hidden rounded-none border border-white/80 bg-white/66 p-5 shadow-[0_20px_55px_rgba(0,0,0,0.1)] backdrop-blur-2xl">
          <p className="text-[length:var(--home-sticky-eyebrow-size,12px)] uppercase tracking-[0.34em] text-muted">{settings.stickyEyebrow}</p>
          <h2 className="mt-3 text-[length:var(--home-sticky-title-size,1.5rem)] leading-tight text-black">{settings.stickyTitle}</h2>
          <p className="mt-3 text-[length:var(--home-sticky-body-size,14px)] leading-7 text-muted">
            {settings.footerPhoneLabel} {site.companyPhone}
            <br />
            {settings.stickyDescription}
          </p>
          <div className="mt-5 grid gap-3">
            <a
              className="button-primary w-full text-[length:var(--home-sticky-button-size,14px)]"
              href={NAVER_INQUIRY_URL}
              rel="noreferrer"
              target="_blank"
            >
              문의하기
            </a>
            <a className="button-secondary w-full text-[length:var(--home-sticky-button-size,14px)]" href={phoneHref}>
              전화연결
            </a>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/80 bg-white/70 p-2.5 shadow-[0_-10px_35px_rgba(0,0,0,0.09)] backdrop-blur-2xl lg:hidden">
        <div className="page-shell flex gap-2 px-0">
          <a
            className="button-primary !min-h-[40px] flex-1 text-[length:var(--home-sticky-button-size,14px)]"
            href={NAVER_INQUIRY_URL}
            rel="noreferrer"
            target="_blank"
          >
            문의하기
          </a>
          <a className="button-accent !min-h-[40px] flex-1 text-[length:var(--home-sticky-button-size,14px)]" href={phoneHref}>
            전화연결
          </a>
        </div>
      </div>
    </>
  );
}

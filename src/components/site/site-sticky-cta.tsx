"use client";

import Link from "next/link";

import { getSiteConfig } from "@/lib/utils";

export function SiteStickyCta() {
  const site = getSiteConfig();
  const phoneHref = `tel:${site.companyPhone.replace(/[^+\d]/g, "")}`;

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 hidden w-[320px] lg:block">
        <div className="surface-dark overflow-hidden rounded-[1.75rem] bg-hero-navy p-5">
          <p className="text-xs uppercase tracking-[0.34em] text-white/50">Contact</p>
          <h2 className="mt-3 text-2xl leading-tight">궁금한 현장은 바로 문의하실 수 있습니다</h2>
          <p className="mt-3 text-sm leading-7 text-white/70">
            대표번호 {site.companyPhone}
            <br />
            문의를 남겨주시면 확인 후 순차적으로 안내해드립니다.
          </p>
          <div className="mt-5 grid gap-3">
            <a className="button-accent w-full" href={phoneHref}>
              전화문의
            </a>
            <Link className="button-secondary w-full !border-white/10 !bg-white !text-deep" href="/contact">
              상담신청
            </Link>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/5 bg-white/95 p-3 shadow-[0_-10px_30px_rgba(15,23,42,0.08)] backdrop-blur lg:hidden">
        <div className="page-shell flex gap-3 px-0">
          <a className="button-primary flex-1" href={phoneHref}>
            전화문의
          </a>
          <Link className="button-accent flex-1" href="/contact">
            상담신청
          </Link>
        </div>
      </div>
    </>
  );
}

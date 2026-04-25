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
          <p className="text-xs uppercase tracking-[0.34em] text-white/50">Quick Contact</p>
          <h2 className="mt-3 text-2xl leading-tight">지금 바로 상담을 시작하면 조건 안내가 빨라집니다</h2>
          <p className="mt-3 text-sm leading-7 text-white/70">
            대표번호 {site.companyPhone}
            <br />
            문의를 남기면 현장 상담과 방문 흐름을 빠르게 도와드립니다.
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

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { getSiteConfig } from "@/lib/utils";

export function SiteStickyCta() {
  const pathname = usePathname();
  const site = getSiteConfig();
  const phoneHref = `tel:${site.companyPhone.replace(/[^+\d]/g, "")}`;

  if (pathname === "/contact" || pathname.startsWith("/projects/")) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 hidden w-[280px] xl:block">
        <div className="surface-dark overflow-hidden rounded-[1.5rem] bg-hero-navy p-4">
          <p className="text-xs uppercase tracking-[0.34em] text-white/50">문의 안내</p>
          <h2 className="mt-3 text-xl leading-tight">관심 있는 현장이 있으신가요?</h2>
          <p className="mt-3 text-sm leading-6 text-white/70">
            대표번호 {site.companyPhone}
            <br />
            문의를 남겨주시면 확인 후 빠르게 안내해드립니다.
          </p>
          <div className="mt-4 grid gap-2.5">
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

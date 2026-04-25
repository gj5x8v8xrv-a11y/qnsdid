"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SITE_NAV_ITEMS } from "@/lib/constants";
import { getSiteConfig } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const site = getSiteConfig();
  const phoneHref = `tel:${site.companyPhone.replace(/[^+\d]/g, "")}`;

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur-xl">
      <div className="border-b border-black/5 bg-deep text-white">
        <div className="page-shell flex min-h-[44px] items-center justify-between gap-4 text-xs tracking-[0.02em] text-white/70">
          <p className="truncate">분양 현장의 신뢰를 설계하는 분양대행 대표 홈페이지</p>
          <a className="hidden font-semibold text-white sm:block" href={phoneHref}>
            대표번호 {site.companyPhone}
          </a>
        </div>
      </div>

      <div className="page-shell flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <Link className="flex items-center gap-4" href="/">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-deep text-sm font-bold tracking-[0.18em] text-white">
            BM
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-muted">
              Bunyang Marketing
            </p>
            <p className="text-xl font-extrabold tracking-[-0.03em]">{site.companyName}</p>
          </div>
        </Link>

        <nav className="flex gap-2 overflow-x-auto pb-1">
          {SITE_NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : item.href === "/projects"
                  ? pathname === "/projects" || pathname.startsWith("/projects/")
                  : pathname === item.href;

            return (
              <Link
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-deep text-white shadow-soft"
                    : "bg-transparent text-foreground hover:bg-slate-100"
                }`}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex lg:items-center lg:gap-3">
          <a className="button-secondary" href={phoneHref}>
            전화문의
          </a>
          <Link className="button-primary" href="/contact">
            상담신청
          </Link>
        </div>
      </div>
    </header>
  );
}

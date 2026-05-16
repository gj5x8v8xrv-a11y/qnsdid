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
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/92 backdrop-blur-xl">
      <div className="border-b border-black/6 bg-black text-white">
        <div className="page-shell flex min-h-[42px] items-center justify-between gap-4 text-[11px] tracking-[0.02em] text-white/68">
          <p className="truncate">중부권 분양 정보를 편하게 살펴볼 수 있는 분양 정보 플랫폼</p>
          <a className="hidden font-semibold text-white sm:block" href={phoneHref}>
            대표번호 {site.companyPhone}
          </a>
        </div>
      </div>

      <div className="page-shell flex flex-col gap-4 py-4 sm:py-5 lg:flex-row lg:items-center lg:justify-between">
        <Link className="flex items-center gap-3 sm:gap-4" href="/">
          <div className="space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-muted">
              BUNYANG MAP
            </p>
            <p className="text-[1.45rem] font-extrabold leading-none tracking-[-0.045em] text-black sm:text-[1.65rem]">
              {site.companyName}
            </p>
            <p className="text-[11px] font-medium tracking-[0.08em] text-muted sm:text-xs">
              중부권 분양 정보 플랫폼
            </p>
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
                className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                  isActive
                    ? "bg-black text-white shadow-soft"
                    : "border border-black/8 bg-white text-foreground hover:bg-slate-50"
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

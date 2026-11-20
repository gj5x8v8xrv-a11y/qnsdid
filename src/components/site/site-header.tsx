"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import type { HomePageSettings } from "@/lib/types";
import {
  getSiteConfig,
  getSiteNavItems,
  NAVER_INQUIRY_URL,
  REAL_ESTATE_INQUIRY_URL
} from "@/lib/utils";

export function SiteHeader({
  settings
}: {
  settings: HomePageSettings;
}) {
  const pathname = usePathname();
  const site = getSiteConfig();
  const phoneHref = `tel:${site.companyPhone.replace(/[^+\d]/g, "")}`;
  const navItems = getSiteNavItems(settings);
  const headerNavItems = [
    ...navItems.slice(0, 3),
    {
      href: REAL_ESTATE_INQUIRY_URL,
      label: "부동산 문의",
      external: true
    },
    ...navItems.slice(3)
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/68 shadow-[0_8px_30px_rgba(0,0,0,0.045)] backdrop-blur-2xl">
      <div className="border-b border-white/10 bg-slate-950 text-white">
        <div className="page-shell flex min-h-[28px] items-center justify-between gap-2 text-[length:var(--home-header-announcement-size,9px)] tracking-[0.01em] text-white/68 sm:min-h-[42px] sm:gap-4 sm:text-[11px]">
          <p className="truncate">{settings.headerAnnouncement}</p>
          <a className="hidden font-semibold text-white sm:block" href={phoneHref}>
            {settings.headerPhoneLabel} {site.companyPhone}
          </a>
        </div>
      </div>

      <div className="page-shell flex items-center gap-3 !px-3 py-2 sm:flex-col sm:items-stretch sm:gap-5 sm:!px-8 sm:py-5 lg:flex-row lg:items-center lg:justify-between lg:!px-12">
        <Link className="shrink-0 sm:flex sm:items-center sm:gap-4" href="/">
          <div className="space-y-0 sm:space-y-1">
            <p className="hidden text-[length:var(--home-brand-english-size,9px)] font-semibold uppercase tracking-[0.24em] text-muted sm:block sm:text-[11px] sm:tracking-[0.32em]">
              {settings.brandEnglishName}
            </p>
            <p className="text-[14px] font-extrabold leading-none tracking-[-0.045em] text-black sm:text-[1.65rem]">
              {site.companyName}
            </p>
            <p className="hidden text-[length:var(--home-brand-caption-size,9px)] font-medium tracking-[0.04em] text-muted sm:block sm:text-xs sm:tracking-[0.08em]">
              {settings.brandCaption}
            </p>
          </div>
        </Link>

        <nav aria-label="주요 메뉴" className="flex min-w-0 flex-1 items-center justify-start gap-1.5 overflow-x-auto sm:gap-2 sm:pb-1 lg:flex-none">
          {headerNavItems.map((item) => {
            const isActive =
              "external" in item && item.external
                ? false
                : item.href === "/"
                ? pathname === "/"
                : item.href === "/projects"
                  ? pathname === "/projects" || pathname.startsWith("/projects/")
                  : pathname === item.href;

            return (
              <Link
                className={`shrink-0 whitespace-nowrap rounded-none border px-2.5 py-1.5 text-[11px] font-medium transition sm:px-4 sm:py-2.5 sm:text-sm ${
                  isActive
                    ? "border-neutral-950 bg-neutral-950 text-white shadow-[0_7px_18px_rgba(0,0,0,0.16)]"
                    : "border-black/10 bg-white/35 text-neutral-600 backdrop-blur-xl hover:border-black/25 hover:bg-white/70 hover:text-black"
                }`}
                href={item.href}
                key={item.href}
                rel={"external" in item && item.external ? "noreferrer" : undefined}
                target={"external" in item && item.external ? "_blank" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex lg:items-center lg:gap-3">
          <a
            className="button-primary text-[length:var(--home-button-size,13px)]"
            href={NAVER_INQUIRY_URL}
            rel="noreferrer"
            target="_blank"
          >
            문의하기
          </a>
          <a className="button-secondary text-[length:var(--home-button-size,13px)]" href={phoneHref}>
            전화연결
          </a>
        </div>
      </div>
    </header>
  );
}

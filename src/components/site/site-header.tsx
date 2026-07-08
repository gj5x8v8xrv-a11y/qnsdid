"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { HomePageSettings } from "@/lib/types";
import { getSiteConfig, getSiteNavItems } from "@/lib/utils";

export function SiteHeader({ settings }: { settings: HomePageSettings }) {
  const pathname = usePathname();
  const site = getSiteConfig();
  const phoneHref = `tel:${site.companyPhone.replace(/[^+\d]/g, "")}`;
  const navItems = getSiteNavItems(settings);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/92 backdrop-blur-xl">
      <div className="border-b border-black/6 bg-black text-white">
        <div className="page-shell flex min-h-[28px] items-center justify-between gap-2 text-[9px] tracking-[0.01em] text-white/68 sm:min-h-[42px] sm:gap-4 sm:text-[11px]">
          <p className="truncate">{settings.headerAnnouncement}</p>
          <a className="hidden font-semibold text-white sm:block" href={phoneHref}>
            {settings.headerPhoneLabel} {site.companyPhone}
          </a>
        </div>
      </div>

      <div className="page-shell flex flex-col gap-2 py-2 sm:gap-4 sm:py-5 lg:flex-row lg:items-center lg:justify-between">
        <Link className="flex items-center gap-2.5 sm:gap-4" href="/">
          <div className="space-y-0 sm:space-y-1">
            <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-muted sm:text-[11px] sm:tracking-[0.32em]">
              {settings.brandEnglishName}
            </p>
            <p className="text-[1.05rem] font-extrabold leading-none tracking-[-0.045em] text-black sm:text-[1.65rem]">
              {site.companyName}
            </p>
            <p className="text-[9px] font-medium tracking-[0.04em] text-muted sm:text-xs sm:tracking-[0.08em]">
              {settings.brandCaption}
            </p>
          </div>
        </Link>

        <nav className="flex gap-1.5 overflow-x-auto pb-0.5 sm:gap-2 sm:pb-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : item.href === "/projects"
                  ? pathname === "/projects" || pathname.startsWith("/projects/")
                  : pathname === item.href;

            return (
              <Link
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-[12px] font-semibold transition sm:px-4 sm:py-2.5 sm:text-sm ${
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
            {settings.headerPhoneButtonLabel}
          </a>
          <Link className="button-primary" href="/contact">
            {settings.headerContactButtonLabel}
          </Link>
        </div>
      </div>
    </header>
  );
}

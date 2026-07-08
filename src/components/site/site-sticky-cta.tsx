"use client";

import Link from "next/link";

import type { HomePageSettings } from "@/lib/types";
import { getSiteConfig } from "@/lib/utils";

export function SiteStickyCta({ settings }: { settings: HomePageSettings }) {
  const site = getSiteConfig();
  const phoneHref = `tel:${site.companyPhone.replace(/[^+\d]/g, "")}`;

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 hidden w-[320px] lg:block">
        <div className="overflow-hidden rounded-[1.75rem] border border-black/8 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <p className="text-[length:var(--home-sticky-eyebrow-size,12px)] uppercase tracking-[0.34em] text-muted">{settings.stickyEyebrow}</p>
          <h2 className="mt-3 text-[length:var(--home-sticky-title-size,1.5rem)] leading-tight text-black">{settings.stickyTitle}</h2>
          <p className="mt-3 text-[length:var(--home-sticky-body-size,14px)] leading-7 text-muted">
            {settings.footerPhoneLabel} {site.companyPhone}
            <br />
            {settings.stickyDescription}
          </p>
          <div className="mt-5 grid gap-3">
            <a className="button-primary w-full text-[length:var(--home-sticky-button-size,14px)]" href={phoneHref}>
              {settings.stickyPhoneButtonLabel}
            </a>
            <Link className="button-secondary w-full text-[length:var(--home-sticky-button-size,14px)]" href="/contact">
              {settings.stickyContactButtonLabel}
            </Link>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/8 bg-white/95 p-3 shadow-[0_-10px_30px_rgba(15,23,42,0.08)] backdrop-blur lg:hidden">
        <div className="page-shell flex gap-3 px-0">
          <a className="button-primary flex-1 text-[length:var(--home-sticky-button-size,14px)]" href={phoneHref}>
            {settings.stickyPhoneButtonLabel}
          </a>
          <Link className="button-accent flex-1 text-[length:var(--home-sticky-button-size,14px)]" href="/contact">
            {settings.stickyContactButtonLabel}
          </Link>
        </div>
      </div>
    </>
  );
}

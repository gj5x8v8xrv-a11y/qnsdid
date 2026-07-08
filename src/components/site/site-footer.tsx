import Link from "next/link";

import type { HomePageSettings } from "@/lib/types";
import { getSiteConfig, getSiteNavItems } from "@/lib/utils";

export function SiteFooter({ settings }: { settings: HomePageSettings }) {
  const site = getSiteConfig();
  const navItems = getSiteNavItems(settings);

  return (
    <footer className="mt-16 border-t border-black/8 bg-white text-black lg:mt-24">
      <div className="page-shell grid gap-10 py-14 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div className="space-y-5">
          <p className="text-[length:var(--home-footer-eyebrow-size,11px)] uppercase tracking-[0.34em] text-muted">{settings.footerBrandEyebrow}</p>
          <h2 className="text-4xl text-black">{site.companyName}</h2>
          <p className="max-w-2xl text-[length:var(--home-footer-body-size,14px)] leading-8 text-muted">
            {settings.footerDescription}
          </p>
          <div className="grid gap-2 text-[length:var(--home-footer-body-size,14px)] text-muted">
            <p>{settings.footerPhoneLabel} {site.companyPhone}</p>
            <p>{settings.footerEmailLabel} {site.companyEmail}</p>
          </div>
        </div>

        <div>
          <p className="text-[length:var(--home-footer-title-size,14px)] font-semibold text-black">{settings.footerSitemapTitle}</p>
          <div className="mt-4 grid gap-3">
            {navItems.map((item) => (
              <Link className="text-[length:var(--home-footer-link-size,14px)] text-muted transition hover:text-black" href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[length:var(--home-footer-title-size,14px)] font-semibold text-black">{settings.footerInquiryTitle}</p>
          <div className="mt-4 grid gap-3">
            <Link className="text-[length:var(--home-footer-link-size,14px)] text-muted transition hover:text-black" href="/contact">
              {settings.footerInquiryContactLabel}
            </Link>
            <Link className="text-[length:var(--home-footer-link-size,14px)] text-muted transition hover:text-black" href="/privacy">
              {settings.footerPrivacyLabel}
            </Link>
            <a
              className="text-[length:var(--home-footer-link-size,14px)] text-muted transition hover:text-black"
              href={`tel:${site.companyPhone.replace(/[^+\d]/g, "")}`}
            >
              {settings.footerInquiryPhoneLabel}
            </a>
            <Link className="text-[length:var(--home-footer-link-size,14px)] text-muted transition hover:text-black" href="/projects">
              {settings.footerInquiryProjectsLabel}
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-black/8">
        <div className="page-shell flex flex-col gap-2 py-5 text-[length:var(--home-footer-bottom-size,12px)] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{site.companyName}. {settings.footerCopyrightText}</p>
          <p>{settings.footerTaglineText}</p>
        </div>
      </div>
    </footer>
  );
}

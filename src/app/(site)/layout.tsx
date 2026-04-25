import type { ReactNode } from "react";

import { DailyVisitorCounter } from "@/components/site/daily-visitor-counter";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { SiteStickyCta } from "@/components/site/site-sticky-cta";

export default function SiteLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="min-h-screen overflow-x-clip">
      <SiteHeader />
      <main className="pb-24 lg:pb-0">{children}</main>
      <SiteFooter />
      <DailyVisitorCounter />
      <SiteStickyCta />
    </div>
  );
}

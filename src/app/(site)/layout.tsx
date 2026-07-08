import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { SiteStickyCta } from "@/components/site/site-sticky-cta";
import { getHomePageSettings } from "@/lib/data";

export default async function SiteLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  const homePageSettings = await getHomePageSettings();

  return (
    <div className="min-h-screen overflow-x-clip">
      <SiteHeader settings={homePageSettings} />
      <main className="pb-24 lg:pb-0">{children}</main>
      <SiteFooter settings={homePageSettings} />
      <SiteStickyCta settings={homePageSettings} />
    </div>
  );
}

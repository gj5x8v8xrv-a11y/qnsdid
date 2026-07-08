import type { CSSProperties, ReactNode } from "react";

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
  const homePageStyle = {
    "--home-header-announcement-size": `${homePageSettings.mobileHeaderAnnouncementPx}px`,
    "--home-brand-english-size": `${homePageSettings.mobileHeaderBrandEnglishPx}px`,
    "--home-brand-name-size": `${homePageSettings.mobileHeaderBrandNameRem}rem`,
    "--home-brand-caption-size": `${homePageSettings.mobileHeaderBrandCaptionPx}px`,
    "--home-nav-size": `${homePageSettings.mobileHeaderNavPx}px`,
    "--home-button-size": `${homePageSettings.mobileHeaderButtonPx}px`,
    "--home-hero-eyebrow-size": `${homePageSettings.mobileHeroEyebrowPx}px`,
    "--home-hero-title-size": `${homePageSettings.mobileHeroTitleRem}rem`,
    "--home-hero-stat-label-size": `${homePageSettings.mobileHeroStatLabelPx}px`,
    "--home-hero-stat-value-size": `${homePageSettings.mobileHeroStatValueRem}rem`,
    "--home-featured-label-size": `${homePageSettings.mobileFeaturedLabelPx}px`,
    "--home-section-title-size": `${homePageSettings.mobileSectionTitleRem}rem`,
    "--home-body-text-size": `${homePageSettings.mobileBodyTextPx}px`,
    "--home-card-title-size": `${homePageSettings.mobileProjectCardTitleRem}rem`,
    "--home-card-meta-size": `${homePageSettings.mobileProjectCardMetaPx}px`,
    "--home-card-body-size": `${homePageSettings.mobileProjectCardBodyPx}px`,
    "--home-card-label-size": `${homePageSettings.mobileProjectCardLabelPx}px`,
    "--home-card-button-size": `${homePageSettings.mobileProjectCardButtonPx}px`,
    "--home-completed-list-title-size": `${homePageSettings.mobileCompletedListTitlePx}px`,
    "--home-completed-list-body-size": `${homePageSettings.mobileCompletedListBodyPx}px`,
    "--home-sticky-eyebrow-size": `${homePageSettings.mobileStickyEyebrowPx}px`,
    "--home-sticky-title-size": `${homePageSettings.mobileStickyTitleRem}rem`,
    "--home-sticky-body-size": `${homePageSettings.mobileStickyBodyPx}px`,
    "--home-sticky-button-size": `${homePageSettings.mobileStickyButtonPx}px`,
    "--home-footer-eyebrow-size": `${homePageSettings.mobileFooterEyebrowPx}px`,
    "--home-footer-title-size": `${homePageSettings.mobileFooterTitlePx}px`,
    "--home-footer-body-size": `${homePageSettings.mobileFooterBodyPx}px`,
    "--home-footer-link-size": `${homePageSettings.mobileFooterLinkPx}px`,
    "--home-footer-bottom-size": `${homePageSettings.mobileFooterBottomPx}px`
  } as CSSProperties;

  return (
    <div className="min-h-screen overflow-x-clip" style={homePageStyle}>
      <SiteHeader settings={homePageSettings} />
      <main className="pb-24 lg:pb-0">{children}</main>
      <SiteFooter settings={homePageSettings} />
      <SiteStickyCta settings={homePageSettings} />
    </div>
  );
}

export type ProjectStatus = "active" | "completed";

export type ProjectImageType =
  | "main"
  | "gallery"
  | "site_plan"
  | "floor_plan"
  | "community"
  | "location"
  | "premium";

export type Project = {
  id: string;
  name: string;
  slug: string;
  status: ProjectStatus;
  region: string;
  province: string | null;
  city: string | null;
  address: string | null;
  location: string;
  householdCount: string;
  unitPlan: string;
  expectedMoveIn: string;
  salesConditions: string;
  premiumSummary: string;
  locationDescription: string;
  coverImageUrl: string | null;
  coverImagePath: string | null;
  contactPhone: string;
  reservationUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ProjectImage = {
  id: string;
  projectId: string;
  imageUrl: string;
  imagePath: string | null;
  imageType: ProjectImageType;
  sortOrder: number;
  createdAt: string;
};

export type ProjectWithImages = Project & {
  gallery: ProjectImage[];
};

export type InquiryStatus = "new" | "processing" | "done";

export type Inquiry = {
  id: string;
  name: string;
  phone: string;
  message: string;
  projectId: string | null;
  projectName: string | null;
  status: InquiryStatus;
  createdAt: string;
};

export type SiteConfig = {
  companyName: string;
  companyTagline: string;
  companyDescription: string;
  companyPhone: string;
  companyEmail: string;
  companyAddress: string;
  siteUrl: string;
};

export type HomePageSettings = {
  headerAnnouncement: string;
  headerPhoneLabel: string;
  brandEnglishName: string;
  brandCaption: string;
  navHomeLabel: string;
  navCompanyLabel: string;
  navProjectsLabel: string;
  navCompletedLabel: string;
  navContactLabel: string;
  headerPhoneButtonLabel: string;
  headerContactButtonLabel: string;
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  heroPhoneButtonLabel: string;
  heroContactButtonLabel: string;
  heroActiveStatLabel: string;
  heroCompletedStatLabel: string;
  heroPhoneStatLabel: string;
  featuredProjectLabel: string;
  activeSectionEyebrow: string;
  activeSectionTitle: string;
  activeSectionDescription: string;
  activeSectionButtonLabel: string;
  activeSectionEmptyMessage: string;
  completedSectionEyebrow: string;
  completedSectionTitle: string;
  completedSectionDescription: string;
  completedSectionEmptyMessage: string;
  completedSectionButtonLabel: string;
  contactSectionEyebrow: string;
  contactSectionTitle: string;
  contactSectionDescription: string;
  contactPhoneButtonLabel: string;
  contactFormButtonLabel: string;
  projectCardHouseholdLabel: string;
  projectCardUnitPlanLabel: string;
  projectCardMoveInLabel: string;
  projectCardPhoneLabel: string;
  projectCardPhoneButtonLabel: string;
  projectCardDetailButtonLabel: string;
  stickyEyebrow: string;
  stickyTitle: string;
  stickyDescription: string;
  stickyPhoneButtonLabel: string;
  stickyContactButtonLabel: string;
  footerBrandEyebrow: string;
  footerDescription: string;
  footerPhoneLabel: string;
  footerEmailLabel: string;
  footerSitemapTitle: string;
  footerInquiryTitle: string;
  footerInquiryContactLabel: string;
  footerPrivacyLabel: string;
  footerInquiryPhoneLabel: string;
  footerInquiryProjectsLabel: string;
  footerCopyrightText: string;
  footerTaglineText: string;
  mobileHeaderAnnouncementPx: number;
  mobileHeaderBrandEnglishPx: number;
  mobileHeaderBrandNameRem: number;
  mobileHeaderBrandCaptionPx: number;
  mobileHeaderNavPx: number;
  mobileHeaderButtonPx: number;
  mobileHeroEyebrowPx: number;
  mobileHeroTitleRem: number;
  mobileHeroStatLabelPx: number;
  mobileHeroStatValueRem: number;
  mobileFeaturedLabelPx: number;
  mobileSectionTitleRem: number;
  mobileBodyTextPx: number;
  mobileProjectCardTitleRem: number;
  mobileProjectCardMetaPx: number;
  mobileProjectCardBodyPx: number;
  mobileProjectCardLabelPx: number;
  mobileProjectCardButtonPx: number;
  mobileCompletedListTitlePx: number;
  mobileCompletedListBodyPx: number;
  mobileStickyEyebrowPx: number;
  mobileStickyTitleRem: number;
  mobileStickyBodyPx: number;
  mobileStickyButtonPx: number;
  mobileFooterEyebrowPx: number;
  mobileFooterTitlePx: number;
  mobileFooterBodyPx: number;
  mobileFooterLinkPx: number;
  mobileFooterBottomPx: number;
};

export type AdminProjectFormState = {
  ok: boolean;
  message: string;
};

export type InquiryFormState = {
  ok: boolean;
  message: string;
};

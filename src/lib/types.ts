export type ProjectStatus = "active" | "completed";

export type Project = {
  id: string;
  name: string;
  slug: string;
  status: ProjectStatus;
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

export type AdminProjectFormState = {
  ok: boolean;
  message: string;
};

export type InquiryFormState = {
  ok: boolean;
  message: string;
};

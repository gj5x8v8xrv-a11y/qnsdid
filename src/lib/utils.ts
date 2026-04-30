import type { InquiryStatus, Project, ProjectStatus, SiteConfig } from "@/lib/types";

type SupabaseConfigIssue =
  | "missing-url"
  | "invalid-url"
  | "missing-publishable-key"
  | "invalid-publishable-key"
  | "missing-secret-key"
  | "invalid-secret-key";

function isValidUrl(value: string) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

function isValidPublishableKey(value: string) {
  const trimmed = value.trim();
  return trimmed.startsWith("sb_publishable_") || trimmed.startsWith("eyJ");
}

function isValidSecretKey(value: string) {
  const trimmed = value.trim();
  return trimmed.startsWith("sb_secret_") || trimmed.startsWith("eyJ");
}

export function getSiteConfig(): SiteConfig {
  return {
    companyName: process.env.NEXT_PUBLIC_COMPANY_NAME || "분양맵",
    companyTagline:
      process.env.NEXT_PUBLIC_COMPANY_TAGLINE ||
      "좋은 분양 현장을 편하게 살펴볼 수 있는 분양 정보 플랫폼",
    companyDescription:
      process.env.NEXT_PUBLIC_COMPANY_DESCRIPTION ||
      "관심 있는 분양 현장을 살펴보고 상담과 방문 문의를 편하게 남길 수 있는 분양 정보 플랫폼입니다.",
    companyPhone: process.env.NEXT_PUBLIC_COMPANY_PHONE || "1533-8170",
    companyEmail:
      process.env.NEXT_PUBLIC_COMPANY_EMAIL || "hgw3342@naver.com",
    companyAddress:
      process.env.NEXT_PUBLIC_COMPANY_ADDRESS || "",
    siteUrl:
      process.env.NEXT_PUBLIC_SITE_URL || "https://www.example-estate.co.kr"
  };
}

export function formatStatusLabel(status: ProjectStatus | InquiryStatus) {
  if (status === "active") return "분양중";
  if (status === "completed") return "분양완료";
  if (status === "processing") return "응대중";
  if (status === "done") return "완료";
  return "신규";
}

export function formatDateLabel(value: string) {
  if (!value) return "-";

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(parsed);
}

export function formatPhoneHref(phone: string) {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

export function absoluteUrl(path: string) {
  const { siteUrl } = getSiteConfig();
  return new URL(path, siteUrl).toString();
}

export function summarizeText(text: string, maxLength = 140) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).trim()}...`;
}

export function isSupabaseConfigured() {
  return getSupabaseConfigIssues().length === 0;
}

export function getSupabaseConfigIssues(): SupabaseConfigIssue[] {
  const issues: SupabaseConfigIssue[] = [];
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim();
  const publishableKey = (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "").trim();
  const secretKey = (process.env.SUPABASE_SECRET_KEY || "").trim();

  if (!url) {
    issues.push("missing-url");
  } else if (!isValidUrl(url)) {
    issues.push("invalid-url");
  }

  if (!publishableKey) {
    issues.push("missing-publishable-key");
  } else if (!isValidPublishableKey(publishableKey)) {
    issues.push("invalid-publishable-key");
  }

  if (!secretKey) {
    issues.push("missing-secret-key");
  } else if (!isValidSecretKey(secretKey)) {
    issues.push("invalid-secret-key");
  }

  return issues;
}

export function getSupabaseConfigMessage() {
  const issues = getSupabaseConfigIssues();

  if (issues.length === 0) {
    return null;
  }

  if (issues.includes("invalid-secret-key")) {
    return "SUPABASE_SECRET_KEY 값이 올바르지 않습니다. Vercel Value 칸에 Supabase API Keys의 sb_secret_... 값을 넣어주세요.";
  }

  if (issues.includes("missing-secret-key")) {
    return "SUPABASE_SECRET_KEY 값이 비어 있습니다. Vercel Environment Variables에 Supabase Secret key를 추가해주세요.";
  }

  if (issues.includes("invalid-publishable-key")) {
    return "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY 값이 올바르지 않습니다. Supabase API Keys의 Publishable key를 넣어주세요.";
  }

  if (issues.includes("missing-publishable-key")) {
    return "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY 값이 비어 있습니다. Supabase Publishable key를 추가해주세요.";
  }

  if (issues.includes("invalid-url")) {
    return "NEXT_PUBLIC_SUPABASE_URL 값이 올바르지 않습니다. Supabase 프로젝트 URL을 다시 확인해주세요.";
  }

  return "Supabase 환경변수 설정이 필요합니다. 프로젝트 URL, Publishable key, Secret key를 다시 확인해주세요.";
}

export function toPositiveInteger(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return null;

  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

function stripAdministrativeSuffix(value: string) {
  return value
    .replace(/특별자치시$/u, "")
    .replace(/특별자치도$/u, "")
    .replace(/특별시$/u, "")
    .replace(/광역시$/u, "")
    .replace(/자치시$/u, "")
    .replace(/자치도$/u, "")
    .replace(/시$/u, "")
    .replace(/군$/u, "")
    .replace(/구$/u, "")
    .trim();
}

export function inferProjectRegion({
  region,
  province,
  city,
  location
}: {
  region?: string | null;
  province?: string | null;
  city?: string | null;
  location?: string | null;
}) {
  const candidates = [region, city, province, location]
    .map((value) => (value || "").trim())
    .filter(Boolean);

  if (candidates.length === 0) return "";

  const normalized = stripAdministrativeSuffix(candidates[0].split(/\s+/u)[0] || candidates[0]);
  return normalized || candidates[0];
}

export function buildProjectLocation({
  province,
  city,
  address,
  location
}: {
  province?: string | null;
  city?: string | null;
  address?: string | null;
  location?: string | null;
}) {
  const parts = [province, city, address]
    .map((value) => (value || "").trim())
    .filter(Boolean);

  if (parts.length > 0) {
    return parts.join(" ");
  }

  return (location || "").trim();
}

export function getProjectRegion(project: Pick<Project, "region" | "province" | "city" | "location">) {
  return inferProjectRegion(project);
}

export function getProjectAddressLine(
  project: Pick<Project, "province" | "city" | "address" | "location">
) {
  return buildProjectLocation(project);
}

export function getProjectCardMeta(
  project: Pick<Project, "region" | "province" | "city" | "location" | "unitPlan" | "status">
) {
  return [
    getProjectRegion(project),
    project.unitPlan,
    formatStatusLabel(project.status)
  ]
    .filter(Boolean)
    .join(" · ");
}

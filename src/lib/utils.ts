import type { InquiryStatus, ProjectStatus, SiteConfig } from "@/lib/types";

export function getSiteConfig(): SiteConfig {
  return {
    companyName: process.env.NEXT_PUBLIC_COMPANY_NAME || "분양맵",
    companyTagline:
      process.env.NEXT_PUBLIC_COMPANY_TAGLINE ||
      "좋은 분양 현장을 편하게 살펴보는 분양 정보 안내",
    companyDescription:
      process.env.NEXT_PUBLIC_COMPANY_DESCRIPTION ||
      "분양중인 현장과 소개가 완료된 현장을 함께 살펴보고, 관심 있는 현장은 편하게 문의하실 수 있습니다.",
    companyPhone: process.env.NEXT_PUBLIC_COMPANY_PHONE || "1533-8170",
    companyEmail:
      process.env.NEXT_PUBLIC_COMPANY_EMAIL || "hello@bunyangmap.co.kr",
    companyAddress:
      process.env.NEXT_PUBLIC_COMPANY_ADDRESS || "서울시 강남구 테헤란로 100",
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

export function getKstDateKey(date = new Date()) {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Seoul"
  }).format(date);
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
  return isSupabaseAdminConfigured();
}

export function isSupabasePublicConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  );
}

export function looksLikeSupabaseSecretKey(value?: string | null) {
  return Boolean(value && value.startsWith("sb_secret_"));
}

export function isSupabaseAdminConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY &&
      looksLikeSupabaseSecretKey(process.env.SUPABASE_SECRET_KEY)
  );
}

export function getSupabaseAdminSetupMessage() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return "NEXT_PUBLIC_SUPABASE_URL 값을 먼저 연결해주세요.";
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    return "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY 값을 먼저 연결해주세요.";
  }

  if (!process.env.SUPABASE_SECRET_KEY) {
    return "SUPABASE_SECRET_KEY 값이 없어 관리자 저장과 이미지 업로드가 비활성화되어 있습니다.";
  }

  if (!looksLikeSupabaseSecretKey(process.env.SUPABASE_SECRET_KEY)) {
    return "SUPABASE_SECRET_KEY 값이 올바르지 않습니다. Supabase Settings > API Keys의 Secret key 전체를 Vercel Environment Variables의 Value 칸에 넣고 다시 배포해주세요.";
  }

  return null;
}

export function toPositiveInteger(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return null;

  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

import type { InquiryStatus, ProjectStatus, SiteConfig } from "@/lib/types";

export function getSiteConfig(): SiteConfig {
  return {
    companyName: process.env.NEXT_PUBLIC_COMPANY_NAME || "분양맵",
    companyTagline:
      process.env.NEXT_PUBLIC_COMPANY_TAGLINE ||
      "프리미엄 분양 현장을 가장 설득력 있게 소개하는 파트너",
    companyDescription:
      process.env.NEXT_PUBLIC_COMPANY_DESCRIPTION ||
      "현장 소개부터 상담 연결까지 신뢰감 있게 운영하는 분양대행 전문 회사",
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

export function absoluteUrl(path: string) {
  const { siteUrl } = getSiteConfig();
  return new URL(path, siteUrl).toString();
}

export function summarizeText(text: string, maxLength = 140) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).trim()}...`;
}

export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY &&
      process.env.SUPABASE_SECRET_KEY
  );
}

export function toPositiveInteger(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return null;

  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

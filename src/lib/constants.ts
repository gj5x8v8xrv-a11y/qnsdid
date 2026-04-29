import type { HomeHeroContent, ProjectStatus } from "@/lib/types";

export const PROJECT_STATUS_OPTIONS: Array<{
  label: string;
  value: ProjectStatus;
}> = [
  { label: "분양중", value: "active" },
  { label: "분양완료", value: "completed" }
];

export const DEFAULT_STORAGE_BUCKET = "project-media";

export const LEGACY_HOME_HERO_CONTENT: HomeHeroContent = {
  eyebrow: "Premium Sales Marketing",
  title: "지금 바로 확인할 분양 현장과 조건 상담을 빠르게 연결해드립니다",
  description:
    "처음 방문한 고객이 분양중 현장, 핵심 장점, 상담 번호를 한 번에 보고 바로 전화나 방문예약으로 이어질 수 있도록 구성했습니다.",
  featuredLabel: "오늘 추천 현장"
};

export const DEFAULT_HOME_HERO_CONTENT: HomeHeroContent = {
  eyebrow: "PREMIUM PROPERTY CURATION",
  title: "좋은 분양 현장을 선별해 소개드립니다",
  description:
    "청주, 대전, 천안, 세종 중부권 지역의 분양 현장을 보기 쉽게 정리해 안내합니다.",
  featuredLabel: "오늘 추천 현장"
};

export const SITE_NAV_ITEMS = [
  { href: "/", label: "홈" },
  { href: "/company", label: "회사소개" },
  { href: "/projects", label: "분양중" },
  { href: "/completed", label: "분양완료" },
  { href: "/contact", label: "상담문의" }
];

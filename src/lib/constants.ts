import type { ProjectImageType, ProjectStatus } from "@/lib/types";

export const PROJECT_STATUS_OPTIONS: Array<{
  label: string;
  value: ProjectStatus;
}> = [
  { label: "분양중", value: "active" },
  { label: "분양완료", value: "completed" }
];

export const DEFAULT_STORAGE_BUCKET = "project-media";

export const PROJECT_IMAGE_MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024;
export const PROJECT_IMAGE_MAX_FILE_SIZE_LABEL = "20MB";
export const PROJECT_IMAGE_MAX_COUNT = 50;
export const PROJECT_IMAGE_ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const PROJECT_IMAGE_ACCEPTED_EXTENSIONS = ".jpg,.jpeg,.png,.webp";

export const PROJECT_IMAGE_TYPE_OPTIONS: Array<{
  label: string;
  description: string;
  value: Exclude<ProjectImageType, "main">;
}> = [
  {
    label: "현장 갤러리",
    description: "현장 전경, 내부, 외부 투시도 등 일반 소개 이미지",
    value: "gallery"
  },
  {
    label: "단지배치도",
    description: "단지 전체 배치, 동 배치, 조경 구성 이미지",
    value: "site_plan"
  },
  {
    label: "평면도",
    description: "타입별 평면도, 구조도, 세대 구성 이미지",
    value: "floor_plan"
  },
  {
    label: "입지 이미지",
    description: "주변 입지, 지도, 생활권, 교통권 설명 이미지",
    value: "location"
  },
  {
    label: "커뮤니티",
    description: "커뮤니티 시설, 부대시설, 특화 공간 이미지",
    value: "community"
  },
  {
    label: "프리미엄",
    description: "개발호재, 장점 요약, 특장점 소개 이미지",
    value: "premium"
  }
];

export const SITE_NAV_ITEMS = [
  { href: "/", label: "홈" },
  { href: "/company", label: "회사소개" },
  { href: "/projects", label: "분양중" },
  { href: "/completed", label: "분양완료" },
  { href: "/contact", label: "상담문의" }
];

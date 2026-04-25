import type { ProjectStatus } from "@/lib/types";

export const PROJECT_STATUS_OPTIONS: Array<{
  label: string;
  value: ProjectStatus;
}> = [
  { label: "분양중", value: "active" },
  { label: "분양완료", value: "completed" }
];

export const DEFAULT_STORAGE_BUCKET = "project-media";

export const SITE_NAV_ITEMS = [
  { href: "/", label: "홈" },
  { href: "/company", label: "회사소개" },
  { href: "/projects", label: "분양중" },
  { href: "/completed", label: "분양완료" },
  { href: "/contact", label: "상담문의" }
];

import "server-only";

import {
  DEFAULT_STORAGE_BUCKET,
  PROJECT_IMAGE_ACCEPTED_TYPES,
  PROJECT_IMAGE_MAX_FILE_SIZE_BYTES
} from "@/lib/constants";
import type { HomePageSettings, ProjectImageType } from "@/lib/types";
import { getDefaultHomePageSettings } from "@/lib/utils";
import { getAdminSupabaseClient } from "@/lib/supabase/admin";

const HOME_PAGE_SETTINGS_PATH = "site-settings/home-page.json";

function sanitizePathSegment(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function resolveStorageBucket() {
  return process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || DEFAULT_STORAGE_BUCKET;
}

export function isSupportedProjectImageType(value: string): value is ProjectImageType {
  return [
    "main",
    "gallery",
    "site_plan",
    "floor_plan",
    "community",
    "location",
    "premium"
  ].includes(value);
}

export function validateProjectImageCandidate({
  fileName,
  contentType,
  fileSize
}: {
  fileName: string;
  contentType: string;
  fileSize?: number;
}) {
  const normalizedType = contentType.trim().toLowerCase();
  const extension = fileName.split(".").pop()?.toLowerCase();

  if (!PROJECT_IMAGE_ACCEPTED_TYPES.includes(normalizedType)) {
    throw new Error("jpg, jpeg, png, webp 형식의 이미지만 업로드할 수 있습니다.");
  }

  if (!extension || !["jpg", "jpeg", "png", "webp"].includes(extension)) {
    throw new Error("jpg, jpeg, png, webp 형식의 이미지만 업로드할 수 있습니다.");
  }

  if (typeof fileSize === "number" && fileSize > PROJECT_IMAGE_MAX_FILE_SIZE_BYTES) {
    throw new Error("이미지 한 장당 최대 20MB까지 업로드할 수 있습니다.");
  }
}

export function buildProjectAssetPath({
  fileName,
  imageType,
  projectId,
  uploadSessionId
}: {
  fileName: string;
  imageType: ProjectImageType;
  projectId?: string | null;
  uploadSessionId?: string | null;
}) {
  const extension = sanitizePathSegment(fileName.split(".").pop() || "jpg") || "jpg";
  const baseId =
    sanitizePathSegment(projectId || "") ||
    (uploadSessionId ? `draft-${sanitizePathSegment(uploadSessionId)}` : `draft-${crypto.randomUUID()}`);
  const folder = imageType === "main" ? "main" : imageType;

  return `projects/${baseId}/${folder}/${Date.now()}-${crypto.randomUUID()}.${extension}`;
}

export function getProjectAssetPublicUrl(filePath: string) {
  const supabase = getAdminSupabaseClient();
  const {
    data: { publicUrl }
  } = supabase.storage.from(resolveStorageBucket()).getPublicUrl(filePath);

  return publicUrl;
}

function normalizeHomePageSettings(value: unknown): HomePageSettings {
  const defaults = getDefaultHomePageSettings();

  if (!value || typeof value !== "object") {
    return defaults;
  }

  const record = value as Record<string, unknown>;

  return {
    heroTitle:
      typeof record.heroTitle === "string" && record.heroTitle.trim()
        ? record.heroTitle.trim()
        : defaults.heroTitle,
    heroDescription:
      typeof record.heroDescription === "string" && record.heroDescription.trim()
        ? record.heroDescription.trim()
        : defaults.heroDescription,
    activeSectionTitle:
      typeof record.activeSectionTitle === "string" && record.activeSectionTitle.trim()
        ? record.activeSectionTitle.trim()
        : defaults.activeSectionTitle,
    activeSectionDescription:
      typeof record.activeSectionDescription === "string" && record.activeSectionDescription.trim()
        ? record.activeSectionDescription.trim()
        : defaults.activeSectionDescription,
    completedSectionTitle:
      typeof record.completedSectionTitle === "string" && record.completedSectionTitle.trim()
        ? record.completedSectionTitle.trim()
        : defaults.completedSectionTitle,
    completedSectionDescription:
      typeof record.completedSectionDescription === "string" &&
      record.completedSectionDescription.trim()
        ? record.completedSectionDescription.trim()
        : defaults.completedSectionDescription,
    contactSectionTitle:
      typeof record.contactSectionTitle === "string" && record.contactSectionTitle.trim()
        ? record.contactSectionTitle.trim()
        : defaults.contactSectionTitle,
    contactSectionDescription:
      typeof record.contactSectionDescription === "string" &&
      record.contactSectionDescription.trim()
        ? record.contactSectionDescription.trim()
        : defaults.contactSectionDescription,
    mobileHeroTitleRem:
      typeof record.mobileHeroTitleRem === "number" && Number.isFinite(record.mobileHeroTitleRem)
        ? record.mobileHeroTitleRem
        : defaults.mobileHeroTitleRem,
    mobileSectionTitleRem:
      typeof record.mobileSectionTitleRem === "number" &&
      Number.isFinite(record.mobileSectionTitleRem)
        ? record.mobileSectionTitleRem
        : defaults.mobileSectionTitleRem,
    mobileBodyTextPx:
      typeof record.mobileBodyTextPx === "number" && Number.isFinite(record.mobileBodyTextPx)
        ? record.mobileBodyTextPx
        : defaults.mobileBodyTextPx,
    mobileProjectCardTitleRem:
      typeof record.mobileProjectCardTitleRem === "number" &&
      Number.isFinite(record.mobileProjectCardTitleRem)
        ? record.mobileProjectCardTitleRem
        : defaults.mobileProjectCardTitleRem
  };
}

export async function readHomePageSettingsFromStorage() {
  const supabase = getAdminSupabaseClient();
  const { data, error } = await supabase
    .storage
    .from(resolveStorageBucket())
    .download(HOME_PAGE_SETTINGS_PATH);

  if (error) {
    const missingFileCodes = new Set(["404", "Not Found", "Object not found"]);
    if (
      missingFileCodes.has(error.statusCode || "") ||
      error.message.toLowerCase().includes("not found")
    ) {
      return getDefaultHomePageSettings();
    }

    throw new Error(error.message);
  }

  if (!data) {
    return getDefaultHomePageSettings();
  }

  const content = await data.text();

  if (!content.trim()) {
    return getDefaultHomePageSettings();
  }

  try {
    return normalizeHomePageSettings(JSON.parse(content));
  } catch {
    return getDefaultHomePageSettings();
  }
}

export async function writeHomePageSettingsToStorage(settings: HomePageSettings) {
  const supabase = getAdminSupabaseClient();
  const normalized = normalizeHomePageSettings(settings);
  const payload = JSON.stringify(normalized, null, 2);

  const { error } = await supabase
    .storage
    .from(resolveStorageBucket())
    .upload(HOME_PAGE_SETTINGS_PATH, payload, {
      contentType: "application/json",
      upsert: true
    });

  if (error) {
    throw new Error(error.message);
  }

  return normalized;
}

export async function createProjectSignedUpload({
  fileName,
  contentType,
  imageType,
  projectId,
  uploadSessionId
}: {
  fileName: string;
  contentType: string;
  imageType: ProjectImageType;
  projectId?: string | null;
  uploadSessionId?: string | null;
}) {
  validateProjectImageCandidate({ fileName, contentType });

  const supabase = getAdminSupabaseClient();
  const bucket = resolveStorageBucket();
  const path = buildProjectAssetPath({
    fileName,
    imageType,
    projectId,
    uploadSessionId
  });

  const { data, error } = await supabase.storage.from(bucket).createSignedUploadUrl(path);

  if (error || !data) {
    throw new Error(error?.message || "이미지 업로드 주소를 준비하지 못했습니다.");
  }

  return {
    bucket,
    path,
    token: data.token,
    publicUrl: getProjectAssetPublicUrl(path)
  };
}

export async function removeProjectAsset(filePath?: string | null) {
  if (!filePath) return;

  const supabase = getAdminSupabaseClient();
  await supabase.storage.from(resolveStorageBucket()).remove([filePath]);
}

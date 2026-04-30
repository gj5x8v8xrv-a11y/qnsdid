import "server-only";

import {
  DEFAULT_STORAGE_BUCKET,
  PROJECT_IMAGE_ACCEPTED_TYPES,
  PROJECT_IMAGE_MAX_FILE_SIZE_BYTES
} from "@/lib/constants";
import type { ProjectImageType } from "@/lib/types";
import { getAdminSupabaseClient } from "@/lib/supabase/admin";

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

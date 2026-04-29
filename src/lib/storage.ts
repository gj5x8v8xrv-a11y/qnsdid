import "server-only";

import { DEFAULT_STORAGE_BUCKET } from "@/lib/constants";
import { getAdminSupabaseClient } from "@/lib/supabase/admin";
import { looksLikeSupabaseSecretKey } from "@/lib/utils";

const MAX_ASSET_SIZE_BYTES = 10 * 1024 * 1024;

function sanitizeFileName(fileName: string) {
  return fileName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]+/g, "-")
    .replace(/-+/g, "-");
}

function resolveBucket() {
  return process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || DEFAULT_STORAGE_BUCKET;
}

function normalizeStorageError(message: string) {
  if (message.toLowerCase().includes("payload too large")) {
    return "업로드 용량이 너무 큽니다. 이미지를 줄이거나 여러 장은 나눠서 업로드해주세요.";
  }

  if (
    message.includes("Bucket not found") ||
    message.includes("not found") ||
    message.includes("does not exist")
  ) {
    return "Supabase Storage에 `project-media` 버킷이 없거나 접근할 수 없습니다. 버킷을 Public으로 만들어주세요.";
  }

  if (
    message.includes("Invalid JWT") ||
    message.includes("JWT") ||
    message.includes("Unauthorized") ||
    message.includes("permission denied")
  ) {
    return "SUPABASE_SECRET_KEY 값이 올바르지 않아 이미지 업로드 권한이 없습니다. Supabase Secret key를 다시 확인해주세요.";
  }

  return message;
}

function validateAssetFile(file: File) {
  if (!file.type.startsWith("image/")) {
    throw new Error("이미지 파일만 업로드할 수 있습니다.");
  }

  if (file.size > MAX_ASSET_SIZE_BYTES) {
    throw new Error("한 장당 10MB 이하 이미지만 업로드할 수 있습니다.");
  }
}

export async function uploadProjectAsset({
  file,
  folder
}: {
  file: File;
  folder: string;
}) {
  if (!looksLikeSupabaseSecretKey(process.env.SUPABASE_SECRET_KEY)) {
    throw new Error(
      "SUPABASE_SECRET_KEY 값이 올바르지 않아 이미지를 저장할 수 없습니다. Vercel Environment Variables의 Value 칸을 다시 확인해주세요."
    );
  }

  validateAssetFile(file);

  const supabase = getAdminSupabaseClient();
  const bucket = resolveBucket();
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const filePath = `${folder}/${crypto.randomUUID()}.${sanitizeFileName(ext)}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage.from(bucket).upload(filePath, buffer, {
    contentType: file.type || "image/jpeg",
    upsert: true
  });

  if (error) {
    throw new Error(normalizeStorageError(error.message));
  }

  const {
    data: { publicUrl }
  } = supabase.storage.from(bucket).getPublicUrl(filePath);

  return {
    filePath,
    publicUrl
  };
}

export async function removeProjectAsset(filePath?: string | null) {
  if (!filePath) return;

  const supabase = getAdminSupabaseClient();
  const bucket = resolveBucket();
  await supabase.storage.from(bucket).remove([filePath]);
}

import "server-only";

import { DEFAULT_STORAGE_BUCKET } from "@/lib/constants";
import { getAdminSupabaseClient } from "@/lib/supabase/admin";

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

export async function uploadProjectAsset({
  file,
  folder
}: {
  file: File;
  folder: string;
}) {
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
    throw new Error(error.message);
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

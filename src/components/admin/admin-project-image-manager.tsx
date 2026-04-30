"use client";

import { useMemo, useState, type ChangeEvent } from "react";

import {
  PROJECT_IMAGE_ACCEPTED_EXTENSIONS,
  PROJECT_IMAGE_ACCEPTED_TYPES,
  PROJECT_IMAGE_MAX_COUNT,
  PROJECT_IMAGE_MAX_FILE_SIZE_BYTES,
  PROJECT_IMAGE_MAX_FILE_SIZE_LABEL,
  PROJECT_IMAGE_TYPE_OPTIONS
} from "@/lib/constants";
import { getBrowserSupabaseClient } from "@/lib/supabase/client";
import type { ProjectImage } from "@/lib/types";

type UploadedCoverAsset = {
  imageUrl: string;
  imagePath: string;
};

type UploadedProjectAsset = {
  imageUrl: string;
  imagePath: string;
  imageType: Exclude<ProjectImage["imageType"], "main">;
  sortOrder: number;
};

type AdminProjectImageManagerProps = {
  coverImageUrl?: string | null;
  existingImages: ProjectImage[];
  projectId?: string;
};

type SignedUploadPayload = {
  path: string;
  token: string;
  publicUrl: string;
};

function formatUploadError(error: unknown) {
  if (error instanceof Error) return error.message;
  return "이미지를 업로드하지 못했습니다. 잠시 후 다시 시도해주세요.";
}

function validateImageFile(file: File) {
  if (!PROJECT_IMAGE_ACCEPTED_TYPES.includes(file.type)) {
    throw new Error("jpg, jpeg, png, webp 형식의 이미지만 업로드할 수 있습니다.");
  }

  if (file.size > PROJECT_IMAGE_MAX_FILE_SIZE_BYTES) {
    throw new Error(`이미지 한 장당 최대 ${PROJECT_IMAGE_MAX_FILE_SIZE_LABEL}까지 업로드할 수 있습니다.`);
  }
}

export function AdminProjectImageManager({
  coverImageUrl,
  existingImages,
  projectId
}: AdminProjectImageManagerProps) {
  const [coverAsset, setCoverAsset] = useState<UploadedCoverAsset | null>(null);
  const [uploadedAssets, setUploadedAssets] = useState<UploadedProjectAsset[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [uploadSessionId] = useState(() => crypto.randomUUID());

  const existingImagesByType = useMemo(() => {
    return existingImages.reduce<Record<string, ProjectImage[]>>((accumulator, image) => {
      if (!accumulator[image.imageType]) {
        accumulator[image.imageType] = [];
      }
      accumulator[image.imageType].push(image);
      return accumulator;
    }, {});
  }, [existingImages]);

  async function signUpload(file: File, imageType: ProjectImage["imageType"]) {
    const response = await fetch("/api/admin/storage/sign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fileName: file.name,
        contentType: file.type,
        imageType,
        projectId,
        uploadSessionId
      })
    });

    const payload = (await response.json()) as SignedUploadPayload & { message?: string };

    if (!response.ok) {
      throw new Error(payload.message || "이미지 업로드 주소를 준비하지 못했습니다.");
    }

    return payload;
  }

  async function uploadFile(file: File, imageType: ProjectImage["imageType"]) {
    validateImageFile(file);

    const signed = await signUpload(file, imageType);
    const supabase = getBrowserSupabaseClient();
    const { error } = await supabase.storage
      .from(process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || "project-media")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .uploadToSignedUrl(signed.path, signed.token, file as any, {
        contentType: file.type,
        upsert: true
      });

    if (error) {
      throw new Error(error.message);
    }

    return signed;
  }

  async function handleCoverImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setFeedback(null);

    try {
      const uploaded = await uploadFile(file, "main");
      setCoverAsset({
        imageUrl: uploaded.publicUrl,
        imagePath: uploaded.path
      });
      setFeedback("대표 이미지를 업로드했습니다.");
    } catch (error) {
      setFeedback(formatUploadError(error));
    } finally {
      event.target.value = "";
      setIsUploading(false);
    }
  }

  async function handleImageTypeUpload(
    event: ChangeEvent<HTMLInputElement>,
    imageType: UploadedProjectAsset["imageType"]
  ) {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    const nextTotal = existingImages.length + uploadedAssets.length + files.length;
    if (nextTotal > PROJECT_IMAGE_MAX_COUNT) {
      setFeedback(`상세 이미지는 최대 ${PROJECT_IMAGE_MAX_COUNT}장까지 업로드할 수 있습니다.`);
      event.target.value = "";
      return;
    }

    setIsUploading(true);
    setFeedback(null);

    try {
      const uploadedResults: UploadedProjectAsset[] = [];

      for (const file of files) {
        const uploaded = await uploadFile(file, imageType);
        uploadedResults.push({
          imageUrl: uploaded.publicUrl,
          imagePath: uploaded.path,
          imageType,
          sortOrder: uploadedAssets.length + uploadedResults.length
        });
      }

      setUploadedAssets((current) => [
        ...current,
        ...uploadedResults.map((item, index) => ({
          ...item,
          sortOrder: current.length + index
        }))
      ]);
      setFeedback(`${files.length}장의 이미지를 업로드했습니다.`);
    } catch (error) {
      setFeedback(formatUploadError(error));
    } finally {
      event.target.value = "";
      setIsUploading(false);
    }
  }

  function removeUploadedAsset(targetPath: string) {
    setUploadedAssets((current) => current.filter((asset) => asset.imagePath !== targetPath));
  }

  return (
    <section className="grid gap-6 rounded-[1.75rem] bg-slate-50 p-5 sm:p-6">
      <input
        name="coverImageAssetJson"
        type="hidden"
        value={coverAsset ? JSON.stringify(coverAsset) : ""}
      />
      <input
        name="projectImagesJson"
        type="hidden"
        value={JSON.stringify(
          uploadedAssets.map((asset, index) => ({
            ...asset,
            sortOrder: index
          }))
        )}
      />

      <div>
        <p className="text-xs uppercase tracking-[0.32em] text-muted">Image Upload</p>
        <h3 className="mt-2 text-2xl">이미지 업로드</h3>
        <p className="mt-3 text-sm leading-7 text-muted">
          대표 이미지는 1장, 상세 이미지는 최대 {PROJECT_IMAGE_MAX_COUNT}장까지 업로드할 수 있습니다.
          파일 형식은 jpg, jpeg, png, webp를 지원하며, 한 장당 최대 용량은 {PROJECT_IMAGE_MAX_FILE_SIZE_LABEL}
          입니다.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
        <div className="grid gap-4 rounded-[1.5rem] bg-white p-5 shadow-soft">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-muted">Main Image</p>
            <h4 className="mt-2 text-xl">대표 이미지</h4>
          </div>

          <label className="grid gap-3 text-sm font-semibold">
            대표 이미지 업로드
            <input
              accept={PROJECT_IMAGE_ACCEPTED_EXTENSIONS}
              className="field-shell file:mr-3 file:border-0 file:bg-transparent file:font-medium"
              disabled={isUploading}
              onChange={handleCoverImageChange}
              type="file"
            />
          </label>

          <div className="overflow-hidden rounded-[1.25rem] bg-slate-100">
            {(coverAsset?.imageUrl || coverImageUrl) ? (
              <img
                alt="대표 이미지 미리보기"
                className="aspect-[16/10] w-full object-cover"
                src={coverAsset?.imageUrl || coverImageUrl || undefined}
              />
            ) : (
              <div className="flex aspect-[16/10] items-center justify-center px-6 text-center text-sm text-muted">
                아직 대표 이미지가 없습니다.
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-4">
          {PROJECT_IMAGE_TYPE_OPTIONS.map((option) => (
            <div className="rounded-[1.5rem] bg-white p-5 shadow-soft" key={option.value}>
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h4 className="text-lg">{option.label}</h4>
                  <p className="mt-2 text-sm leading-7 text-muted">{option.description}</p>
                  {existingImagesByType[option.value]?.length ? (
                    <p className="mt-2 text-sm text-slate-600">
                      기존 등록 {existingImagesByType[option.value].length}장
                    </p>
                  ) : null}
                </div>
                <label className="text-sm font-semibold">
                  <span className="sr-only">{option.label} 업로드</span>
                  <input
                    accept={PROJECT_IMAGE_ACCEPTED_EXTENSIONS}
                    className="field-shell file:mr-3 file:border-0 file:bg-transparent file:font-medium"
                    disabled={isUploading}
                    multiple
                    onChange={(event) => handleImageTypeUpload(event, option.value)}
                    type="file"
                  />
                </label>
              </div>

              {uploadedAssets.filter((asset) => asset.imageType === option.value).length ? (
                <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {uploadedAssets
                    .filter((asset) => asset.imageType === option.value)
                    .map((asset) => (
                      <div
                        className="overflow-hidden rounded-[1.25rem] border border-[color:var(--line)] bg-slate-50 p-2"
                        key={asset.imagePath}
                      >
                        <img
                          alt={option.label}
                          className="aspect-[4/3] w-full rounded-[1rem] object-cover"
                          src={asset.imageUrl}
                        />
                        <button
                          className="mt-2 text-sm font-medium text-slate-600 hover:text-slate-900"
                          onClick={() => removeUploadedAsset(asset.imagePath)}
                          type="button"
                        >
                          업로드 취소
                        </button>
                      </div>
                    ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[1.5rem] bg-white px-5 py-4 text-sm leading-7 text-muted shadow-soft">
        {feedback || "업로드한 이미지는 저장 버튼을 눌러야 현장 정보에 반영됩니다."}
      </div>
    </section>
  );
}

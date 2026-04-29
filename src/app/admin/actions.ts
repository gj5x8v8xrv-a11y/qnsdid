"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getProjectById } from "@/lib/data";
import { DEFAULT_HOME_HERO_CONTENT } from "@/lib/constants";
import { isAllowedAdmin, requireAdminUser } from "@/lib/auth";
import { getAdminSupabaseClient } from "@/lib/supabase/admin";
import { getServerSupabaseClient } from "@/lib/supabase/server";
import { removeProjectAsset, uploadProjectAsset } from "@/lib/storage";
import type { InquiryStatus, ProjectStatus } from "@/lib/types";
import {
  getSupabaseAdminSetupMessage,
  isSupabaseConfigured,
  isSupabasePublicConfigured
} from "@/lib/utils";

function buildRedirectUrl(
  path: string,
  params: Record<string, string | null | undefined>
) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value);
    }
  });

  const query = searchParams.toString();
  return query ? `${path}?${query}` : path;
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return "요청을 처리하는 중 오류가 발생했습니다.";
}

function getAdminSetupError(defaultMessage: string) {
  return getSupabaseAdminSetupMessage() || defaultMessage;
}

function normalizeProjectWriteError(message: string) {
  if (
    [
      "business_overview",
      "transport_info",
      "living_infra_info",
      "education_info",
      "premium_details",
      "site_plan_info",
      "floor_plan_info",
      "community_info",
      "development_info",
      "consultation_guide"
    ].some((column) => message.includes(column))
  ) {
    return "Supabase SQL Editor에서 최신 schema.sql을 다시 실행한 뒤 저장해주세요.";
  }

  return message;
}

function getTextField(formData: FormData, key: string, label: string) {
  const value = formData.get(key);
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${label}을 입력해주세요.`);
  }

  return value.trim();
}

function getOptionalTextField(formData: FormData, key: string) {
  const value = formData.get(key);
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function getStatusField(formData: FormData) {
  const value = formData.get("status");
  if (value === "active" || value === "completed") {
    return value;
  }

  throw new Error("현장 상태를 선택해주세요.");
}

function getInquiryStatusField(formData: FormData) {
  const value = formData.get("status");
  if (value === "new" || value === "processing" || value === "done") {
    return value;
  }

  throw new Error("문의 상태 값이 올바르지 않습니다.");
}

function getSlugField(formData: FormData) {
  const slug = getTextField(formData, "slug", "slug").toLowerCase();

  if (!/^[a-z0-9-]+$/.test(slug)) {
    throw new Error("slug는 영문 소문자, 숫자, 하이픈만 사용할 수 있습니다.");
  }

  return slug;
}

function getOptionalFile(formData: FormData, key: string) {
  const value = formData.get(key);
  if (!(value instanceof File) || value.size === 0) {
    return null;
  }

  return value;
}

function getOptionalFiles(formData: FormData, key: string) {
  return formData
    .getAll(key)
    .filter((value): value is File => value instanceof File && value.size > 0);
}

function getOptionalBoundedTextField(formData: FormData, key: string, maxLength: number) {
  const value = getOptionalTextField(formData, key);
  if (!value) return null;
  return value.slice(0, maxLength);
}

function getProjectPayload(formData: FormData) {
  return {
    name: getTextField(formData, "name", "현장명"),
    slug: getSlugField(formData),
    status: getStatusField(formData),
    location: getTextField(formData, "location", "위치"),
    household_count: getTextField(formData, "householdCount", "세대수"),
    unit_plan: getTextField(formData, "unitPlan", "평형"),
    expected_move_in: getTextField(formData, "expectedMoveIn", "입주예정일"),
    sales_conditions: getTextField(formData, "salesConditions", "분양조건"),
    premium_summary: getTextField(formData, "premiumSummary", "프리미엄 요약"),
    location_description: getTextField(formData, "locationDescription", "입지 설명"),
    business_overview: getOptionalTextField(formData, "businessOverview"),
    transport_info: getOptionalTextField(formData, "transportInfo"),
    living_infra_info: getOptionalTextField(formData, "livingInfraInfo"),
    education_info: getOptionalTextField(formData, "educationInfo"),
    premium_details: getOptionalTextField(formData, "premiumDetails"),
    site_plan_info: getOptionalTextField(formData, "sitePlanInfo"),
    floor_plan_info: getOptionalTextField(formData, "floorPlanInfo"),
    community_info: getOptionalTextField(formData, "communityInfo"),
    development_info: getOptionalTextField(formData, "developmentInfo"),
    consultation_guide: getOptionalTextField(formData, "consultationGuide"),
    contact_phone: getTextField(formData, "contactPhone", "전화문의 번호"),
    reservation_url: getOptionalTextField(formData, "reservationUrl")
  };
}

async function appendGalleryImages(projectId: string, files: File[]) {
  if (files.length === 0) return;

  const supabase = getAdminSupabaseClient();
  const { data: currentRows, error: currentError } = await supabase
    .from("project_images")
    .select("sort_order")
    .eq("project_id", projectId)
    .order("sort_order", { ascending: false })
    .limit(1);

  if (currentError) {
    throw new Error(currentError.message);
  }

  let nextSortOrder = (currentRows?.[0]?.sort_order ?? -1) + 1;

  for (const file of files) {
    const uploaded = await uploadProjectAsset({
      file,
      folder: `projects/${projectId}/gallery`
    });

    const { error } = await supabase.from("project_images").insert({
      project_id: projectId,
      image_url: uploaded.publicUrl,
      image_path: uploaded.filePath,
      sort_order: nextSortOrder
    });

    if (error) {
      throw new Error(error.message);
    }

    nextSortOrder += 1;
  }
}

function revalidateProjectPaths(slug: string, previousSlug?: string | null) {
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/contact");
  revalidatePath("/admin");
  revalidatePath("/admin/inquiries");
  revalidatePath(`/projects/${slug}`);

  if (previousSlug && previousSlug !== slug) {
    revalidatePath(`/projects/${previousSlug}`);
  }
}

export async function loginAction(formData: FormData) {
  const email = getTextField(formData, "email", "이메일");
  const password = getTextField(formData, "password", "비밀번호");

  if (!isSupabasePublicConfigured()) {
    redirect(
      buildRedirectUrl("/admin/login", {
        error: "Supabase 환경변수 설정 후 관리자 로그인이 가능합니다."
      })
    );
  }

  let destination = "/admin";

  try {
    const supabase = await getServerSupabaseClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      throw new Error("이메일 또는 비밀번호를 확인해주세요.");
    }

    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user || !isAllowedAdmin(user.email)) {
      await supabase.auth.signOut();
      throw new Error("이 계정은 관리자 접근 권한이 없습니다.");
    }
  } catch (error) {
    destination = buildRedirectUrl("/admin/login", {
      error: getErrorMessage(error)
    });
  }

  redirect(destination);
}

export async function logoutAction() {
  if (isSupabasePublicConfigured()) {
    const supabase = await getServerSupabaseClient();
    await supabase.auth.signOut();
  }

  redirect("/admin/login");
}

export async function createProjectAction(formData: FormData) {
  if (!isSupabaseConfigured()) {
    redirect(
      buildRedirectUrl("/admin/projects/new", {
        error: getAdminSetupError("Supabase 설정 후 현장을 저장할 수 있습니다.")
      })
    );
  }

  await requireAdminUser();

  let destination = "/admin";

  try {
    const payload = getProjectPayload(formData);
    const coverImage = getOptionalFile(formData, "coverImage");
    const galleryImages = getOptionalFiles(formData, "galleryImages");
    const supabase = getAdminSupabaseClient();

    const { data: createdProject, error: createError } = await supabase
      .from("projects")
      .insert(payload)
      .select("id, slug")
      .single();

    if (createError || !createdProject) {
      throw new Error(
        normalizeProjectWriteError(createError?.message || "현장을 저장하지 못했습니다.")
      );
    }

    if (coverImage) {
      const uploaded = await uploadProjectAsset({
        file: coverImage,
        folder: `projects/${createdProject.id}/cover`
      });

      const { error: coverError } = await supabase
        .from("projects")
        .update({
          cover_image_url: uploaded.publicUrl,
          cover_image_path: uploaded.filePath
        })
        .eq("id", createdProject.id);

      if (coverError) {
        throw new Error(coverError.message);
      }
    }

    await appendGalleryImages(createdProject.id, galleryImages);
    revalidateProjectPaths(createdProject.slug);

    destination = buildRedirectUrl("/admin", {
      message: "새 현장이 등록되었습니다."
    });
  } catch (error) {
    destination = buildRedirectUrl("/admin/projects/new", {
      error: getErrorMessage(error)
    });
  }

  redirect(destination);
}

export async function updateProjectAction(formData: FormData) {
  const projectId =
    typeof formData.get("projectId") === "string" ? String(formData.get("projectId")) : "";

  if (!isSupabaseConfigured()) {
    redirect(
      buildRedirectUrl(
        projectId ? `/admin/projects/${projectId}/edit` : "/admin",
        {
          error: getAdminSetupError("Supabase 설정 후 현장을 수정할 수 있습니다.")
        }
      )
    );
  }

  await requireAdminUser();

  let destination = "/admin";

  try {
    const projectId = getTextField(formData, "projectId", "프로젝트 ID");
    const previousSlug = getOptionalTextField(formData, "previousSlug");
    const payload = getProjectPayload(formData);
    const coverImage = getOptionalFile(formData, "coverImage");
    const galleryImages = getOptionalFiles(formData, "galleryImages");
    const supabase = getAdminSupabaseClient();
    const currentProject = await getProjectById(projectId);

    if (!currentProject) {
      throw new Error("수정할 현장을 찾을 수 없습니다.");
    }

    let coverPatch = {};

    if (coverImage) {
      const uploaded = await uploadProjectAsset({
        file: coverImage,
        folder: `projects/${projectId}/cover`
      });

      coverPatch = {
        cover_image_url: uploaded.publicUrl,
        cover_image_path: uploaded.filePath
      };
    }

    const { error: updateError } = await supabase
      .from("projects")
      .update({
        ...payload,
        ...coverPatch
      })
      .eq("id", projectId);

    if (updateError) {
      throw new Error(normalizeProjectWriteError(updateError.message));
    }

    if (coverImage && currentProject.coverImagePath) {
      await removeProjectAsset(currentProject.coverImagePath);
    }

    await appendGalleryImages(projectId, galleryImages);
    revalidateProjectPaths(payload.slug, previousSlug);

    destination = buildRedirectUrl(`/admin/projects/${projectId}/edit`, {
      message: "현장 정보가 수정되었습니다."
    });
  } catch (error) {
    destination = buildRedirectUrl(
      projectId ? `/admin/projects/${projectId}/edit` : "/admin",
      {
        error: getErrorMessage(error)
      }
    );
  }

  redirect(destination);
}

export async function deleteProjectAction(formData: FormData) {
  if (!isSupabaseConfigured()) {
    redirect(
      buildRedirectUrl("/admin", {
        error: getAdminSetupError("Supabase 설정 후 현장을 삭제할 수 있습니다.")
      })
    );
  }

  await requireAdminUser();

  let destination = "/admin";

  try {
    const projectId = getTextField(formData, "projectId", "프로젝트 ID");
    const project = await getProjectById(projectId);

    if (!project) {
      throw new Error("삭제할 현장을 찾을 수 없습니다.");
    }

    const supabase = getAdminSupabaseClient();

    const galleryPaths = project.gallery
      .map((image) => image.imagePath)
      .filter((value): value is string => Boolean(value));

    const { error: imageDeleteError } = await supabase
      .from("project_images")
      .delete()
      .eq("project_id", projectId);

    if (imageDeleteError) {
      throw new Error(imageDeleteError.message);
    }

    const { error: projectDeleteError } = await supabase
      .from("projects")
      .delete()
      .eq("id", projectId);

    if (projectDeleteError) {
      throw new Error(projectDeleteError.message);
    }

    if (project.coverImagePath) {
      await removeProjectAsset(project.coverImagePath);
    }

    for (const path of galleryPaths) {
      await removeProjectAsset(path);
    }

    revalidateProjectPaths(project.slug);
    destination = buildRedirectUrl("/admin", {
      message: "현장이 삭제되었습니다."
    });
  } catch (error) {
    destination = buildRedirectUrl("/admin", {
      error: getErrorMessage(error)
    });
  }

  redirect(destination);
}

export async function updateProjectStatusAction(formData: FormData) {
  if (!isSupabaseConfigured()) {
    redirect(
      buildRedirectUrl("/admin", {
        error: getAdminSetupError("Supabase 설정 후 상태를 변경할 수 있습니다.")
      })
    );
  }

  await requireAdminUser();

  let destination = "/admin";

  try {
    const projectId = getTextField(formData, "projectId", "프로젝트 ID");
    const nextStatus = getStatusField(formData);
    const project = await getProjectById(projectId);

    if (!project) {
      throw new Error("상태를 변경할 현장을 찾을 수 없습니다.");
    }

    const supabase = getAdminSupabaseClient();
    const { error } = await supabase
      .from("projects")
      .update({
        status: nextStatus
      })
      .eq("id", projectId);

    if (error) {
      throw new Error(error.message);
    }

    revalidateProjectPaths(project.slug);
    destination = buildRedirectUrl("/admin", {
      message: "현장 상태가 변경되었습니다."
    });
  } catch (error) {
    destination = buildRedirectUrl("/admin", {
      error: getErrorMessage(error)
    });
  }

  redirect(destination);
}

export async function deleteProjectImageAction(formData: FormData) {
  const projectId =
    typeof formData.get("projectId") === "string" ? String(formData.get("projectId")) : "";

  if (!isSupabaseConfigured()) {
    redirect(
      buildRedirectUrl(
        projectId ? `/admin/projects/${projectId}/edit` : "/admin",
        {
          error: getAdminSetupError("Supabase 설정 후 이미지를 삭제할 수 있습니다.")
        }
      )
    );
  }

  await requireAdminUser();

  let destination = "/admin";

  try {
    const imageId = getTextField(formData, "imageId", "이미지 ID");
    const projectId = getTextField(formData, "projectId", "프로젝트 ID");

    const supabase = getAdminSupabaseClient();
    const { data: imageRow, error: imageError } = await supabase
      .from("project_images")
      .select("image_path")
      .eq("id", imageId)
      .maybeSingle();

    if (imageError) {
      throw new Error(imageError.message);
    }

    const { error: deleteError } = await supabase
      .from("project_images")
      .delete()
      .eq("id", imageId);

    if (deleteError) {
      throw new Error(deleteError.message);
    }

    await removeProjectAsset(imageRow?.image_path || null);
    revalidatePath(`/admin/projects/${projectId}/edit`);
    destination = buildRedirectUrl(`/admin/projects/${projectId}/edit`, {
      message: "상세 이미지가 삭제되었습니다."
    });
  } catch (error) {
    destination = buildRedirectUrl(
      projectId ? `/admin/projects/${projectId}/edit` : "/admin",
      {
        error: getErrorMessage(error)
      }
    );
  }

  redirect(destination);
}

export async function updateInquiryStatusAction(formData: FormData) {
  if (!isSupabaseConfigured()) {
    redirect(
      buildRedirectUrl("/admin/inquiries", {
        error: "Supabase 설정 후 문의 상태를 변경할 수 있습니다."
      })
    );
  }

  await requireAdminUser();

  let destination = "/admin/inquiries";

  try {
    const inquiryId = getTextField(formData, "inquiryId", "문의 ID");
    const status = getInquiryStatusField(formData);
    const supabase = getAdminSupabaseClient();

    const { error } = await supabase
      .from("inquiries")
      .update({
        status
      })
      .eq("id", inquiryId);

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/admin");
    revalidatePath("/admin/inquiries");
    destination = buildRedirectUrl("/admin/inquiries", {
      message: "문의 상태가 업데이트되었습니다."
    });
  } catch (error) {
    destination = buildRedirectUrl("/admin/inquiries", {
      error: getErrorMessage(error)
    });
  }

  redirect(destination);
}

export async function submitInquiryAction(formData: FormData) {
  let destination = "/contact";

  try {
    const name = getTextField(formData, "name", "이름");
    const phone = getTextField(formData, "phone", "연락처");
    const message = getTextField(formData, "message", "문의 내용");
    const projectId = getOptionalTextField(formData, "projectId");
    const privacyConsent = formData.get("privacyConsent");

    if (privacyConsent !== "agreed") {
      throw new Error("개인정보 수집 및 이용에 동의해주세요.");
    }

    if (!isSupabaseConfigured()) {
      throw new Error("Supabase 설정 후 문의 저장이 가능합니다.");
    }

    const supabase = getAdminSupabaseClient();
    const { error } = await supabase.from("inquiries").insert({
      name,
      phone,
      message,
      project_id: projectId,
      status: "new"
    });

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/admin");
    revalidatePath("/admin/inquiries");
    destination = buildRedirectUrl("/contact", {
      message: "상담 문의가 접수되었습니다. 빠르게 연락드리겠습니다."
    });
  } catch (error) {
    destination = buildRedirectUrl("/contact", {
      error: getErrorMessage(error)
    });
  }

  redirect(destination);
}

export async function updateHomeHeroContentAction(formData: FormData) {
  if (!isSupabaseConfigured()) {
    redirect(
      buildRedirectUrl("/admin/site", {
        error: getAdminSetupError("Supabase 설정 후 메인 문구를 저장할 수 있습니다.")
      })
    );
  }

  await requireAdminUser();

  let destination = "/admin/site";

  try {
    const eyebrow =
      getOptionalBoundedTextField(formData, "eyebrow", 60) ||
      DEFAULT_HOME_HERO_CONTENT.eyebrow;
    const title =
      getOptionalBoundedTextField(formData, "title", 140) ||
      DEFAULT_HOME_HERO_CONTENT.title;
    const description =
      getOptionalBoundedTextField(formData, "description", 240) ||
      DEFAULT_HOME_HERO_CONTENT.description;
    const featuredLabel =
      getOptionalBoundedTextField(formData, "featuredLabel", 40) ||
      DEFAULT_HOME_HERO_CONTENT.featuredLabel;

    const supabase = getAdminSupabaseClient();
    const { error } = await supabase.from("site_settings").upsert(
      {
        key: "home_hero",
        value: {
          eyebrow,
          title,
          description,
          featuredLabel
        }
      },
      { onConflict: "key" }
    );

    if (error) {
      throw new Error(
        error.message.includes("site_settings")
          ? "site_settings 테이블이 없어 저장할 수 없습니다. Supabase SQL Editor에서 최신 schema.sql을 다시 실행해주세요."
          : error.message
      );
    }

    revalidatePath("/");
    revalidatePath("/admin/site");
    destination = buildRedirectUrl("/admin/site", {
      message: "메인 문구가 저장되었습니다."
    });
  } catch (error) {
    destination = buildRedirectUrl("/admin/site", {
      error: getErrorMessage(error)
    });
  }

  redirect(destination);
}

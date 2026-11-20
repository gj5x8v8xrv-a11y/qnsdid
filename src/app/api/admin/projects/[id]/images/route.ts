import { NextResponse } from "next/server";

import { requireAdminUser } from "@/lib/auth";
import { PROJECT_IMAGE_MAX_COUNT } from "@/lib/constants";
import { getAdminSupabaseClient } from "@/lib/supabase/admin";
import { isSupportedProjectImageType } from "@/lib/storage";

type UploadedImage = { imageUrl: string; imagePath: string; imageType: string };

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdminUser();

  try {
    const { id: projectId } = await params;
    const body = (await request.json()) as { images?: UploadedImage[] };
    const images = Array.isArray(body.images) ? body.images : [];

    if (!projectId || images.length === 0) {
      return NextResponse.json({ message: "저장할 이미지가 없습니다." }, { status: 400 });
    }

    const normalized = images.map((image) => {
      if (
        !image ||
        typeof image.imageUrl !== "string" ||
        typeof image.imagePath !== "string" ||
        !isSupportedProjectImageType(image.imageType) ||
        image.imageType === "main"
      ) {
        throw new Error("이미지 정보가 올바르지 않습니다.");
      }
      return image;
    });

    const supabase = getAdminSupabaseClient();
    const { count, error: countError } = await supabase
      .from("project_images")
      .select("id", { count: "exact", head: true })
      .eq("project_id", projectId);

    if (countError) throw new Error(countError.message);
    if ((count || 0) + normalized.length > PROJECT_IMAGE_MAX_COUNT) {
      throw new Error(`상세 이미지는 최대 ${PROJECT_IMAGE_MAX_COUNT}장까지 저장할 수 있습니다.`);
    }

    const { data: lastRows, error: orderError } = await supabase
      .from("project_images")
      .select("sort_order")
      .eq("project_id", projectId)
      .order("sort_order", { ascending: false })
      .limit(1);

    if (orderError) throw new Error(orderError.message);
    const firstSortOrder = (lastRows?.[0]?.sort_order ?? -1) + 1;
    const { error: insertError } = await supabase.from("project_images").insert(
      normalized.map((image, index) => ({
        project_id: projectId,
        image_url: image.imageUrl,
        image_path: image.imagePath,
        image_type: image.imageType,
        sort_order: firstSortOrder + index
      }))
    );

    if (insertError) throw new Error(insertError.message);
    return NextResponse.json({ ok: true, savedCount: normalized.length });
  } catch (error) {
    const message = error instanceof Error ? error.message : "이미지를 저장하지 못했습니다.";
    return NextResponse.json({ message }, { status: 400 });
  }
}

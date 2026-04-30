import { NextResponse } from "next/server";

import { getCurrentAdminUser } from "@/lib/auth";
import { createProjectSignedUpload, isSupportedProjectImageType } from "@/lib/storage";

type SignUploadRequest = {
  fileName?: string;
  contentType?: string;
  imageType?: string;
  projectId?: string | null;
  uploadSessionId?: string | null;
};

export async function POST(request: Request) {
  const adminUser = await getCurrentAdminUser();

  if (!adminUser) {
    return NextResponse.json({ message: "관리자 로그인 후 업로드할 수 있습니다." }, { status: 401 });
  }

  let payload: SignUploadRequest;

  try {
    payload = (await request.json()) as SignUploadRequest;
  } catch {
    return NextResponse.json({ message: "업로드 요청 형식이 올바르지 않습니다." }, { status: 400 });
  }

  if (!payload.fileName || !payload.contentType || !payload.imageType) {
    return NextResponse.json({ message: "파일 정보가 누락되었습니다." }, { status: 400 });
  }

  if (!isSupportedProjectImageType(payload.imageType)) {
    return NextResponse.json({ message: "지원하지 않는 이미지 유형입니다." }, { status: 400 });
  }

  try {
    const signedUpload = await createProjectSignedUpload({
      fileName: payload.fileName,
      contentType: payload.contentType,
      imageType: payload.imageType,
      projectId: payload.projectId,
      uploadSessionId: payload.uploadSessionId
    });

    return NextResponse.json(signedUpload);
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "이미지 업로드를 준비하지 못했습니다."
      },
      { status: 400 }
    );
  }
}

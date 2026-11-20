import { NextResponse } from "next/server";

import { recordDailyVisitor } from "@/lib/visitor-analytics";
import { isSupabaseConfigured } from "@/lib/utils";

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ok: true });
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    if (typeof body.visitorId !== "string") {
      return NextResponse.json({ message: "방문자 정보가 올바르지 않습니다." }, { status: 400 });
    }

    await recordDailyVisitor(body.visitorId, {
      referrer: body.referrer,
      landingPath: body.landingPath,
      utmSource: body.utmSource,
      utmMedium: body.utmMedium,
      utmCampaign: body.utmCampaign,
      userAgent: request.headers.get("user-agent"),
      country: request.headers.get("x-vercel-ip-country"),
      city: request.headers.get("x-vercel-ip-city")
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to record visitor", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

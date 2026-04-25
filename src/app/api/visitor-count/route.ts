import { NextResponse } from "next/server";

import { getDailyVisitorCount } from "@/lib/visitor-counter";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let payload: { dateKey?: string; increment?: boolean } = {};

  try {
    payload = await request.json();
  } catch {
    payload = {};
  }

  const result = await getDailyVisitorCount({
    dateKey: payload.dateKey,
    increment: Boolean(payload.increment)
  });

  return NextResponse.json(result);
}

import "server-only";

import { getAdminSupabaseClient } from "@/lib/supabase/admin";
import { resolveStorageBucket } from "@/lib/storage";

const VISITOR_ROOT = "analytics/daily-visitors";

type VisitorDetailsInput = {
  referrer?: unknown;
  landingPath?: unknown;
  utmSource?: unknown;
  utmMedium?: unknown;
  utmCampaign?: unknown;
  userAgent?: unknown;
  country?: unknown;
  city?: unknown;
};

type VisitorRecord = {
  visitedAt: string;
  source: string;
  medium: string | null;
  campaign: string | null;
  landingPath: string;
  device: string;
  country: string | null;
  city: string | null;
};

export type VisitorInsightItem = {
  label: string;
  count: number;
};

export type VisitorInsights = {
  sources: VisitorInsightItem[];
  campaigns: VisitorInsightItem[];
  landingPages: VisitorInsightItem[];
  devices: VisitorInsightItem[];
  locations: VisitorInsightItem[];
};

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, maxLength) : null;
}

function decodeHeader(value: string | null) {
  if (!value) return null;
  try {
    return decodeURIComponent(value).slice(0, 80);
  } catch {
    return value.slice(0, 80);
  }
}

function resolveSource(referrer: string | null, utmSource: string | null) {
  if (utmSource) return utmSource;
  if (!referrer) return "직접 방문";

  try {
    const hostname = new URL(referrer).hostname.replace(/^www\./, "").toLowerCase();
    if (!hostname || hostname.includes("bunyangmap.co.kr") || hostname.includes("qnsdid.vercel.app")) {
      return "직접 방문";
    }
    if (hostname.includes("naver")) return "네이버";
    if (hostname.includes("google")) return "구글";
    if (hostname.includes("instagram")) return "인스타그램";
    if (hostname.includes("facebook") || hostname === "fb.com") return "페이스북";
    if (hostname.includes("kakao") || hostname.includes("daum")) return "카카오·다음";
    if (hostname.includes("bing")) return "빙";
    return hostname;
  } catch {
    return "기타 유입";
  }
}

function resolveDevice(userAgent: string | null) {
  if (!userAgent) return "알 수 없음";
  if (/ipad|tablet|playbook|silk/i.test(userAgent)) return "태블릿";
  if (/mobile|iphone|ipod|android/i.test(userAgent)) return "모바일";
  return "PC";
}

function buildVisitorRecord(details: VisitorDetailsInput): VisitorRecord {
  const referrer = cleanText(details.referrer, 500);
  const utmSource = cleanText(details.utmSource, 100);
  const city = decodeHeader(cleanText(details.city, 120));
  const country = cleanText(details.country, 8)?.toUpperCase() || null;

  return {
    visitedAt: new Date().toISOString(),
    source: resolveSource(referrer, utmSource),
    medium: cleanText(details.utmMedium, 100),
    campaign: cleanText(details.utmCampaign, 160),
    landingPath: cleanText(details.landingPath, 500) || "/",
    device: resolveDevice(cleanText(details.userAgent, 500)),
    country,
    city
  };
}

function getKoreaDateKey(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date);
}

export async function recordDailyVisitor(visitorId: string, details: VisitorDetailsInput = {}) {
  if (!/^[0-9a-f-]{36}$/i.test(visitorId)) return;

  const supabase = getAdminSupabaseClient();
  const dateKey = getKoreaDateKey();
  const path = `${VISITOR_ROOT}/${dateKey}/${visitorId}.json`;
  const payload = new Blob(
    [JSON.stringify(buildVisitorRecord(details))],
    { type: "application/json" }
  );
  const { error } = await supabase.storage
    .from(resolveStorageBucket())
    .upload(path, payload, { upsert: false, contentType: "application/json" });

  if (error && !/already exists|duplicate/i.test(error.message)) {
    throw new Error(error.message);
  }
}

function countTop(values: Array<string | null | undefined>, limit = 6) {
  const counts = new Map<string, number>();
  values.forEach((value) => {
    if (!value) return;
    counts.set(value, (counts.get(value) || 0) + 1);
  });

  return [...counts.entries()]
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0], "ko"))
    .slice(0, limit)
    .map(([label, count]) => ({ label, count }));
}

export async function getTodayVisitorInsights(): Promise<VisitorInsights> {
  const supabase = getAdminSupabaseClient();
  const dateKey = getKoreaDateKey();
  const folder = `${VISITOR_ROOT}/${dateKey}`;
  const { data, error } = await supabase.storage
    .from(resolveStorageBucket())
    .list(folder, { limit: 1000, sortBy: { column: "created_at", order: "desc" } });

  if (error) {
    return { sources: [], campaigns: [], landingPages: [], devices: [], locations: [] };
  }

  const records = await Promise.all(
    (data || [])
      .filter((item) => item.name.endsWith(".json"))
      .map(async (item) => {
        const { data: file } = await supabase.storage
          .from(resolveStorageBucket())
          .download(`${folder}/${item.name}`);
        if (!file) return null;
        try {
          return JSON.parse(await file.text()) as Partial<VisitorRecord>;
        } catch {
          return null;
        }
      })
  );

  const validRecords = records.filter((record): record is Partial<VisitorRecord> => Boolean(record));
  return {
    sources: countTop(validRecords.map((record) => record.source || "기존 방문 기록")),
    campaigns: countTop(validRecords.map((record) => record.campaign)),
    landingPages: countTop(validRecords.map((record) => record.landingPath || "/")),
    devices: countTop(validRecords.map((record) => record.device || "알 수 없음")),
    locations: countTop(
      validRecords.map((record) =>
        record.city ? `${record.city}${record.country ? ` (${record.country})` : ""}` : record.country
      )
    )
  };
}

export async function getDailyVisitorCounts(dayCount = 7) {
  const dates = Array.from({ length: dayCount }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - index);
    return getKoreaDateKey(date);
  });

  const supabase = getAdminSupabaseClient();
  return Promise.all(
    dates.map(async (date) => {
      const { data, error } = await supabase.storage
        .from(resolveStorageBucket())
        .list(`${VISITOR_ROOT}/${date}`, {
          limit: 1000,
          sortBy: { column: "name", order: "asc" }
        });

      return {
        date,
        count: error ? 0 : (data || []).filter((item) => item.name.endsWith(".json")).length
      };
    })
  );
}

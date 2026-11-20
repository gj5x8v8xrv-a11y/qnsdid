import "server-only";

import { getAdminSupabaseClient } from "@/lib/supabase/admin";
import { resolveStorageBucket } from "@/lib/storage";

const VISITOR_ROOT = "analytics/daily-visitors";

function getKoreaDateKey(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date);
}

export async function recordDailyVisitor(visitorId: string) {
  if (!/^[0-9a-f-]{36}$/i.test(visitorId)) return;

  const supabase = getAdminSupabaseClient();
  const dateKey = getKoreaDateKey();
  const path = `${VISITOR_ROOT}/${dateKey}/${visitorId}.json`;
  const payload = new Blob(
    [JSON.stringify({ visitedAt: new Date().toISOString() })],
    { type: "application/json" }
  );
  const { error } = await supabase.storage
    .from(resolveStorageBucket())
    .upload(path, payload, { upsert: false, contentType: "application/json" });

  if (error && !/already exists|duplicate/i.test(error.message)) {
    throw new Error(error.message);
  }
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

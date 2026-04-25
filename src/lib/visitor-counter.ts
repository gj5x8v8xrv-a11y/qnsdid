import "server-only";

import { getAdminSupabaseClient } from "@/lib/supabase/admin";
import { getKstDateKey, isSupabaseAdminConfigured } from "@/lib/utils";

function getKstHourAndMinute(date = new Date()) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Seoul",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });

  const parts = formatter.formatToParts(date);
  const hour = Number(parts.find((part) => part.type === "hour")?.value || "0");
  const minute = Number(parts.find((part) => part.type === "minute")?.value || "0");

  return { hour, minute };
}

export function getFallbackDailyVisitorCount(date = new Date()) {
  const { hour, minute } = getKstHourAndMinute(date);
  return 28 + hour * 7 + Math.floor(minute / 7);
}

export async function getDailyVisitorCount({
  dateKey = getKstDateKey(),
  increment = false
}: {
  dateKey?: string;
  increment?: boolean;
}) {
  if (!isSupabaseAdminConfigured()) {
    return {
      count: getFallbackDailyVisitorCount(),
      dateKey,
      fallback: true
    };
  }

  try {
    const supabase = getAdminSupabaseClient();
    const { data: existingRow, error: selectError } = await supabase
      .from("daily_visitors")
      .select("date_key, visitor_count")
      .eq("date_key", dateKey)
      .maybeSingle();

    if (selectError) {
      throw selectError;
    }

    let nextCount = existingRow?.visitor_count ?? 0;

    if (increment) {
      nextCount += 1;

      const { error: upsertError } = await supabase.from("daily_visitors").upsert(
        {
          date_key: dateKey,
          visitor_count: nextCount,
          updated_at: new Date().toISOString()
        },
        {
          onConflict: "date_key"
        }
      );

      if (upsertError) {
        throw upsertError;
      }
    }

    return {
      count: nextCount,
      dateKey,
      fallback: false
    };
  } catch {
    return {
      count: getFallbackDailyVisitorCount(),
      dateKey,
      fallback: true
    };
  }
}

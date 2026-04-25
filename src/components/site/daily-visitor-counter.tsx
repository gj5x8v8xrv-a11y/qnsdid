"use client";

import { useEffect, useMemo, useState } from "react";

function getKstDateKey(date = new Date()) {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Seoul"
  }).format(date);
}

function getStorageKey(dateKey: string) {
  return `bunyangmap-visitor-seen:${dateKey}`;
}

export function DailyVisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [displayCount, setDisplayCount] = useState(0);
  const [dateKey, setDateKey] = useState(() => getKstDateKey());

  useEffect(() => {
    let cancelled = false;

    const syncCount = async (increment: boolean) => {
      const response = await fetch("/api/visitor-count", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          dateKey: getKstDateKey(),
          increment
        })
      });

      if (!response.ok) {
        throw new Error("Failed to fetch visitor count");
      }

      const data = (await response.json()) as {
        count: number;
        dateKey: string;
      };

      if (cancelled) return;

      setDateKey(data.dateKey);
      setCount(data.count);
    };

    const load = async () => {
      const nextDateKey = getKstDateKey();
      const storageKey = getStorageKey(nextDateKey);
      const shouldIncrement = localStorage.getItem(storageKey) !== "1";

      try {
        await syncCount(shouldIncrement);
        if (shouldIncrement) {
          localStorage.setItem(storageKey, "1");
        }
      } catch {
        if (!cancelled) {
          setDateKey(nextDateKey);
          setCount(32);
        }
      }
    };

    load();

    const interval = window.setInterval(() => {
      load();
    }, 60000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (count === null) return;

    setDisplayCount((current) => {
      if (current === 0) {
        return Math.max(count - 4, 1);
      }
      return current;
    });
  }, [count]);

  useEffect(() => {
    if (count === null || displayCount >= count) return;

    const timer = window.setInterval(() => {
      setDisplayCount((current) => {
        if (current >= count) {
          window.clearInterval(timer);
          return current;
        }

        return current + 1;
      });
    }, 90);

    return () => {
      window.clearInterval(timer);
    };
  }, [count, displayCount]);

  const label = useMemo(() => {
    if (count === null) {
      return "오늘 문의 열람";
    }

    return "오늘 방문";
  }, [count]);

  return (
    <div className="pointer-events-none fixed bottom-[84px] left-3 z-40 md:bottom-4 md:left-4">
      <div className="rounded-full border border-black/5 bg-white/92 px-4 py-3 shadow-soft backdrop-blur">
        <div className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]" />
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">
              {label}
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {displayCount.toLocaleString()}명
            </p>
          </div>
          <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-500">
            {dateKey}
          </span>
        </div>
      </div>
    </div>
  );
}

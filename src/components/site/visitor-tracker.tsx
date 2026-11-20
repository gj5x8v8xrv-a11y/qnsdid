"use client";

import { useEffect } from "react";

const VISITOR_ID_KEY = "bunyangmap-visitor-id";

export function VisitorTracker() {
  useEffect(() => {
    try {
      let visitorId = localStorage.getItem(VISITOR_ID_KEY);
      if (!visitorId) {
        visitorId = crypto.randomUUID();
        localStorage.setItem(VISITOR_ID_KEY, visitorId);
      }

      void fetch("/api/visitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitorId }),
        keepalive: true
      });
    } catch {
      // 저장소 사용이 제한된 브라우저에서는 방문 집계를 건너뜁니다.
    }
  }, []);

  return null;
}

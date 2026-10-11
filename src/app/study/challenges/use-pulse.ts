"use client";

import { useEffect, useState } from "react";

export type Pulse = { online: Record<string, boolean>; unread: Record<string, number> };
const EVERY = 25_000;

// Asks the server every 25 seconds who is online and how many chat messages are unread, but only while the page is
// in front. A classmate whose link is missing from `online` has not shared their status (or the learner has not shared theirs).
export function usePulse(enabled: boolean): Pulse {
  const [pulse, setPulse] = useState<Pulse>({ online: {}, unread: {} });
  useEffect(() => {
    if (!enabled) return;
    let stopped = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const poll = async () => {
      if (document.visibilityState === "visible") {
        try {
          const response = await fetch("/api/social/pulse", { cache: "no-store" });
          if (response.status === 401 || response.status === 403 || response.status === 404) return;
          if (response.ok && !stopped) setPulse((await response.json()) as Pulse);
        } catch { /* try again next time */ }
      }
      if (!stopped) timer = setTimeout(poll, EVERY);
    };
    const onVisible = () => { if (document.visibilityState === "visible") { clearTimeout(timer); void poll(); } };
    void poll();
    document.addEventListener("visibilitychange", onVisible);
    return () => { stopped = true; clearTimeout(timer); document.removeEventListener("visibilitychange", onVisible); };
  }, [enabled]);
  return pulse;
}

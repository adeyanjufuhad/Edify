"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Pulse = { online: Record<string, boolean>; unread: Record<string, number>; classOnline: Record<string, boolean> };
const EMPTY: Pulse = { online: {}, unread: {}, classOnline: {} };
const EVERY = 25_000;
const PulseContext = createContext<Pulse>(EMPTY);

// Asks the server every 25 seconds who is online and how many chat messages are unread, but only while the page is in
// front. One request serves the whole page. A classmate missing from `online` / `classOnline` has not shared their status
// (or this learner has not shared theirs).
export function PulseProvider({ enabled, children }: { enabled: boolean; children: React.ReactNode }) {
  const [pulse, setPulse] = useState<Pulse>(EMPTY);
  useEffect(() => {
    if (!enabled) return;
    let stopped = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const poll = async () => {
      if (document.visibilityState === "visible") {
        try {
          const response = await fetch("/api/social/pulse", { cache: "no-store" });
          if (response.status === 401 || response.status === 403 || response.status === 404) return;
          if (response.ok && !stopped) setPulse({ ...EMPTY, ...((await response.json()) as Partial<Pulse>) });
        } catch { /* try again next time */ }
      }
      if (!stopped) timer = setTimeout(poll, EVERY);
    };
    const onVisible = () => { if (document.visibilityState === "visible") { clearTimeout(timer); void poll(); } };
    void poll();
    document.addEventListener("visibilitychange", onVisible);
    return () => { stopped = true; clearTimeout(timer); document.removeEventListener("visibilitychange", onVisible); };
  }, [enabled]);
  return <PulseContext.Provider value={pulse}>{children}</PulseContext.Provider>;
}

export const usePulse = () => useContext(PulseContext);

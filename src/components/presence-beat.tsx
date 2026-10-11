"use client";

import { useEffect } from "react";

// Tells the server "this learner has Edify open" every 30 seconds, while the page is in front. Mounted only when the
// owner has switched presence on and the learner's parent has too. It shows nothing and stops by itself if the server says no.
export default function PresenceBeat() {
  useEffect(() => {
    let stopped = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const beat = async () => {
      if (document.visibilityState === "visible") {
        try {
          const response = await fetch("/api/social/heartbeat", { method: "POST", cache: "no-store", keepalive: true });
          if (response.status === 401 || response.status === 403 || response.status === 404) { stopped = true; return; }
        } catch { /* try again next time */ }
      }
      if (!stopped) timer = setTimeout(beat, 30_000);
    };
    const onVisible = () => { if (document.visibilityState === "visible" && !stopped) { clearTimeout(timer); void beat(); } };
    void beat();
    document.addEventListener("visibilitychange", onVisible);
    return () => { stopped = true; clearTimeout(timer); document.removeEventListener("visibilitychange", onVisible); };
  }, []);
  return null;
}

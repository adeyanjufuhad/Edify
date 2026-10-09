"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/client";

export default function LearnerNav({ name }: { name: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function logOut() {
    setBusy(true);
    try { await authClient.signOut(); } finally { router.replace("/login"); router.refresh(); }
  }

  return (
    <div className="dashboard-nav">
      <span className="nav-avatar" aria-hidden="true">{name[0]}</span>
      <span>{name}</span>
      <button type="button" onClick={logOut} disabled={busy}>{busy ? "Logging out…" : "Log out"}</button>
    </div>
  );
}

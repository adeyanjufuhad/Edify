"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth/client";
import { forgetProfile } from "@/app/(account)/profiles/actions";

// Forgets the open learner, signs the parent out and goes home. Used on /profiles and in the study app's
// sidebar and phone menu.
export default function SignOutButton({ className = "pill-outline small", children }: { className?: string; children?: React.ReactNode }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  return (
    <button type="button" className={className} disabled={busy} onClick={async () => {
      setBusy(true);
      try { await forgetProfile(); await authClient.signOut(); } finally { router.push("/"); router.refresh(); }
    }}>{children}{busy ? "Signing out…" : "Sign out"}</button>
  );
}

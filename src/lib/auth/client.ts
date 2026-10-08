"use client";

import { createAuthClient } from "@neondatabase/auth/next";

export const authClient = createAuthClient();

export function displayName(name: string | null | undefined): string {
  return name === "Taiwo" || name === "Kehinde" ? name : "Learner";
}

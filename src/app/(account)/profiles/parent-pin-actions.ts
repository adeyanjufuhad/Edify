"use server";

import { refresh } from "next/cache";
import { requireParent } from "@/lib/account";
import { hashPin } from "@/lib/pin-hash";
import { PARENT_PIN_PATTERN, checkParentPin, forgetUnlock, readPinSetting, rememberUnlock, savePinHash, signedInRecently } from "@/lib/parent-lock";

// The parent PIN (see src/lib/parent-lock.ts). The parent always comes from the session; nothing in a form says whose
// PIN it is.
export type ParentPinState = { error?: string; done?: "set" | "changed" | "removed" | "unlocked" };

const CONNECTION = "Could not check the PIN. Check your connection and try again.";

export async function unlockParentArea(_state: ParentPinState, formData: FormData): Promise<ParentPinState> {
  const parent = await requireParent();
  try {
    const check = await checkParentPin(parent.id, String(formData.get("pin") ?? ""));
    if (!check.ok) return { error: check.error };
    if (!(await rememberUnlock(parent.id, check.hash))) return { error: "Parent controls can’t be unlocked right now. Please try again later." };
  } catch {
    return { error: CONNECTION };
  }
  refresh();
  return { done: "unlocked" };
}

export async function lockParentArea() {
  await requireParent();
  await forgetUnlock();
  refresh();
}

// Sets the first parent PIN, changes it, or removes it (intent=remove). Changing or removing needs the current PIN,
// or a sign-in from the last few minutes for a parent who forgot it.
export async function saveParentPin(_state: ParentPinState, formData: FormData): Promise<ParentPinState> {
  const parent = await requireParent();
  const remove = formData.get("intent") === "remove";
  const pin = String(formData.get("pin") ?? "");
  if (!remove) {
    if (!PARENT_PIN_PATTERN.test(pin)) return { error: "Choose a parent PIN of 4 to 8 digits." };
    if (pin !== String(formData.get("confirmPin") ?? "")) return { error: "The two parent PINs don’t match. Type the same digits twice." };
  }
  let existing: string | null;
  try {
    const setting = await readPinSetting(parent.id);
    if (!setting.available) return { error: "Parent PINs aren’t switched on for Edify yet. Please try again later." };
    existing = setting.hash;
    if (existing && !signedInRecently(parent.signedInAt)) {
      const check = await checkParentPin(parent.id, String(formData.get("currentPin") ?? ""));
      if (!check.ok) return { error: check.error };
    }
  } catch {
    return { error: CONNECTION };
  }
  try {
    if (remove) {
      if (existing) await savePinHash(parent.id, null);
      await forgetUnlock();
    } else {
      const hash = await hashPin(pin);
      await savePinHash(parent.id, hash);
      // The parent has just typed the new PIN, so the parent area opens with it.
      await rememberUnlock(parent.id, hash);
    }
  } catch {
    return { error: "Could not save the parent PIN. Check your connection and try again." };
  }
  refresh();
  return { done: remove ? "removed" : existing ? "changed" : "set" };
}

"use server";

import { notFound } from "next/navigation";
import { refresh } from "next/cache";
import { requireConsentedParent } from "@/lib/account";
import { LOCKED_MESSAGE, parentCanManage } from "@/lib/parent-lock";
import { challengesEnabled } from "@/lib/social/flags";
import { blockAsParent, cancelInvite, createInvite, linkOwnLearners, redeemInvite, removeAsParent, unblockAsParent } from "@/lib/social/links";
import { saveSettings } from "@/lib/social/settings";
import { deleteMessageAsParent } from "@/lib/social/chat";

// Every action here is for the signed-in parent. The parent comes from the session; the learner and the link in the
// form are only references, and each query checks that they belong to this parent.
export type SettingsState = { saved?: boolean; error?: string };
export type InviteState = { code?: string; expiresAt?: string; error?: string };
export type SiblingState = { linked?: boolean; error?: string };
export type RedeemState = { joined?: { name: string; classLevel: string }; error?: string };

// Null when a parent PIN is set and the parent area is locked (src/lib/parent-lock.ts): then nothing changes, actions
// with a message say so, and the others refresh the page, which shows the lock.
async function parentOrNotFound() {
  if (!challengesEnabled()) notFound();
  const parent = await requireConsentedParent();
  return (await parentCanManage(parent)) ? parent : null;
}

const field = (formData: FormData, name: string) => String(formData.get(name) ?? "");
const on = (formData: FormData, name: string) => formData.get(name) === "on";

export async function saveSettingsAction(_state: SettingsState, formData: FormData): Promise<SettingsState> {
  const parent = await parentOrNotFound();
  if (!parent) return { error: LOCKED_MESSAGE };
  const saved = await saveSettings(parent.id, field(formData, "learnerId"), {
    challenges: on(formData, "challenges"), classVisible: on(formData, "classVisible"), presence: on(formData, "presence"), chat: on(formData, "chat"), voice: on(formData, "voice"),
  });
  if (!saved) return { error: "That learner isn’t on your account." };
  refresh();
  return { saved: true };
}

export async function createInviteAction(_state: InviteState, formData: FormData): Promise<InviteState> {
  const parent = await parentOrNotFound();
  if (!parent) return { error: LOCKED_MESSAGE };
  const made = await createInvite(parent.id, field(formData, "learnerId"));
  if ("error" in made) return { error: made.error };
  refresh();
  return made;
}

export async function cancelInviteAction(formData: FormData) {
  const parent = await parentOrNotFound();
  if (parent) await cancelInvite(parent.id, field(formData, "inviteId"));
  refresh();
}

export async function redeemInviteAction(_state: RedeemState, formData: FormData): Promise<RedeemState> {
  const parent = await parentOrNotFound();
  if (!parent) return { error: LOCKED_MESSAGE };
  const joined = await redeemInvite(parent.id, field(formData, "learnerId"), field(formData, "code"));
  if ("error" in joined) return { error: joined.error };
  refresh();
  return { joined: joined.classmate };
}

export async function blockLinkAction(formData: FormData) {
  const parent = await parentOrNotFound();
  if (parent) await blockAsParent(parent.id, field(formData, "learnerId"), field(formData, "linkId"));
  refresh();
}

export async function unblockLinkAction(formData: FormData) {
  const parent = await parentOrNotFound();
  if (parent) await unblockAsParent(parent.id, field(formData, "learnerId"), field(formData, "linkId"));
  refresh();
}

export async function removeLinkAction(formData: FormData) {
  const parent = await parentOrNotFound();
  if (parent) await removeAsParent(parent.id, field(formData, "learnerId"), field(formData, "linkId"));
  refresh();
}

// Deletes one message (and its voice recording) from a conversation one of the parent's learners is in.
export async function deleteMessageAction(formData: FormData) {
  const parent = await parentOrNotFound();
  if (parent) await deleteMessageAsParent(parent.id, field(formData, "messageId"));
  refresh();
}

// Links two of this parent's own children (same class and school) without a code.
export async function linkSiblingAction(_state: SiblingState, formData: FormData): Promise<SiblingState> {
  const parent = await parentOrNotFound();
  if (!parent) return { error: LOCKED_MESSAGE };
  const result = await linkOwnLearners(parent.id, field(formData, "learnerId"), field(formData, "siblingId"));
  if ("error" in result) return { error: result.error };
  refresh();
  return { linked: true };
}

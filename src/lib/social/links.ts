import "server-only";
import { createHash, randomInt } from "node:crypto";
import { getProfile } from "@/lib/profiles";
import { LIMITS, areClassmates, formatCode, makeCode, normalizeCode } from "@/lib/social-rules";
import * as sq from "@/lib/social-queries";
import { claimInviteQuery } from "@/lib/social-sql";
import { isUuid, run, runTogether, toIso, withinLimit } from "./data";
import { getSettings } from "./settings";

const hashCode = (code: string) => createHash("sha256").update(code).digest("hex");

// ---------- What a learner sees ----------
export type Classmate = { linkId: string; learnerId: string; name: string; classLevel: string; presence: boolean; chat: boolean; voice: boolean };

// Linked classmates whose parents have switched challenges on. First name and class only.
export async function listClassmates(learnerId: string): Promise<Classmate[]> {
  if (!isUuid(learnerId)) return [];
  const rows = await run(sq.classmatesQuery(learnerId));
  return rows.map((row) => ({
    linkId: row.link_id as string, learnerId: row.learner_id as string, name: row.name as string, classLevel: row.class_level as string,
    presence: row.presence_on === true, chat: row.chat_on === true, voice: row.voice_on === true,
  }));
}

export type LinkedLearner = { linkId: string; status: string; other: { id: string; name: string; classLevel: string }; otherSwitches: { challenges: boolean; presence: boolean; chat: boolean; voice: boolean } };

// A link, only if this learner is on it. The other learner's id comes from the link, never from the browser.
export async function getLinkForLearner(learnerId: string, linkId: string): Promise<LinkedLearner | null> {
  if (!isUuid(learnerId) || !isUuid(linkId)) return null;
  const row = (await run(sq.linkForLearnerQuery(learnerId, linkId)))[0];
  if (!row) return null;
  return {
    linkId: row.link_id as string, status: row.status as string,
    other: { id: row.other_id as string, name: row.other_name as string, classLevel: row.other_class as string },
    otherSwitches: { challenges: row.other_challenges === true, presence: row.other_presence === true, chat: row.other_chat === true, voice: row.other_voice === true },
  };
}

// ---------- What a parent sees ----------
export type ParentLink = { linkId: string; status: "active" | "blocked"; blocked: "by-us" | "by-them" | null; learnerId: string; other: { name: string; classLevel: string } };

// Each link from the point of view of each of the parent's learners on it (two views when both learners are theirs).
export async function listParentLinks(parentId: string): Promise<ParentLink[]> {
  const rows = await run(sq.parentLinksQuery(parentId));
  return rows.flatMap((row) => {
    const status = row.status === "blocked" ? "blocked" : "active";
    const sides = [
      { mine: { id: row.a_id as string, parent: row.a_parent as string }, other: { name: row.b_name as string, classLevel: row.b_class as string } },
      { mine: { id: row.b_id as string, parent: row.b_parent as string }, other: { name: row.a_name as string, classLevel: row.a_class as string } },
    ];
    return sides.filter((side) => side.mine.parent === parentId).map((side) => ({
      linkId: row.link_id as string, status: status as "active" | "blocked", learnerId: side.mine.id, other: side.other,
      blocked: status === "active" ? null : row.blocked_by === side.mine.id ? ("by-us" as const) : ("by-them" as const),
    }));
  });
}

export type PendingInvite = { id: string; learnerId: string; expiresAt: string };

export async function listPendingInvites(parentId: string): Promise<PendingInvite[]> {
  return (await run(sq.pendingInvitesQuery(parentId))).map((row) => ({ id: row.id as string, learnerId: row.learner_id as string, expiresAt: toIso(row.expires_at) }));
}

export type SentReport = { id: string; reporterName: string; reportedName: string; reportedClass: string; reason: string; createdAt: string };

export async function listReportsByParent(parentId: string): Promise<SentReport[]> {
  return (await run(sq.reportsByParentQuery(parentId))).map((row) => ({
    id: row.id as string, reporterName: row.reporter_name as string, reportedName: row.reported_name as string, reportedClass: row.reported_class as string,
    reason: row.reason as string, createdAt: toIso(row.created_at),
  }));
}

// ---------- Classmate codes ----------
// Parent A makes a one-time code for their learner. The code is shown once; only its hash is stored.
export async function createInvite(parentId: string, learnerId: string): Promise<{ code: string; expiresAt: string } | { error: string }> {
  const learner = await getProfile(parentId, learnerId);
  if (!learner) return { error: "That learner isn’t on your account." };
  if (!(await getSettings(learner.id)).challenges) return { error: `Switch on “Challenges and classmates” for ${learner.name} first.` };
  if (!learner.school) return { error: `${learner.name} has no school saved, so they can’t be matched with classmates.` };
  if (!(await withinLimit({ parentId }, "invite", LIMITS.codesPerParentPerDay, 86400))) return { error: "You’ve made enough codes for today. Try again tomorrow." };
  if (((await run(sq.pendingInviteCountQuery(learner.id)))[0]?.n as number) >= LIMITS.pendingCodesPerLearner) return { error: `${learner.name} already has ${LIMITS.pendingCodesPerLearner} unused codes. Cancel one, or wait for it to expire.` };
  if (((await run(sq.linkCountQuery(learner.id)))[0]?.n as number) >= LIMITS.maxClassmates) return { error: `${learner.name} already has ${LIMITS.maxClassmates} classmates, which is the most we allow.` };

  const code = makeCode((below) => randomInt(below));
  const row = (await run(sq.createInviteQuery(parentId, learner.id, hashCode(code), LIMITS.codeValidDays)))[0];
  if (!row) return { error: "Could not make a code. Try again." };
  return { code: formatCode(code), expiresAt: toIso(row.expires_at) };
}

export async function cancelInvite(parentId: string, inviteId: string): Promise<boolean> {
  if (!isUuid(inviteId)) return false;
  return (await run(sq.cancelInviteQuery(parentId, inviteId))).length > 0;
}

const CODE_PROBLEM = "That code can’t be used for this learner. Check the code, that the other learner is in the same school and class, and that their parent has switched on challenges and made the code recently.";

// Parent B types the code for one of their learners. Every failure gives the same message, so a wrong guess learns nothing.
export async function redeemInvite(parentId: string, learnerId: string, rawCode: string): Promise<{ classmate: { name: string; classLevel: string } } | { error: string }> {
  const learner = await getProfile(parentId, learnerId);
  if (!learner) return { error: "That learner isn’t on your account." };
  if (!(await withinLimit({ parentId }, "redeem", LIMITS.codeTriesPerParentPerHour, 3600))) return { error: "Too many tries. Wait an hour and try again." };
  const code = normalizeCode(rawCode);
  if (!code) return { error: "That isn’t a classmate code. It has 8 letters and numbers, like ABCD-2345." };

  const invite = (await run(sq.inviteByHashQuery(hashCode(code))))[0];
  if (!invite || invite.learner_id === learner.id) return { error: CODE_PROBLEM };
  const inviter = { name: invite.name as string, classLevel: invite.class_level as string, school: (invite.school as string | null) ?? null };
  if (!areClassmates(inviter, { school: learner.school, classLevel: learner.classLevel })) return { error: CODE_PROBLEM };
  if (!(await getSettings(learner.id)).challenges) return { error: `Switch on “Challenges and classmates” for ${learner.name} first.` };
  if (!(await getSettings(invite.learner_id as string)).challenges) return { error: CODE_PROBLEM };
  if ((await run(sq.linkBetweenQuery(learner.id, invite.learner_id as string)))[0]) return { error: CODE_PROBLEM };
  for (const id of [learner.id, invite.learner_id as string]) {
    if (((await run(sq.linkCountQuery(id)))[0]?.n as number) >= LIMITS.maxClassmates) return { error: CODE_PROBLEM };
  }
  const claimed = (await run(claimInviteQuery(invite.id as string, learner.id)))[0];
  if (!claimed || claimed.claimed !== 1 || !claimed.link_id) return { error: CODE_PROBLEM };
  return { classmate: { name: inviter.name, classLevel: inviter.classLevel } };
}

// ---------- Block, unblock, remove, report ----------
// A learner blocks a classmate: the link stops working both ways and open challenges between them end.
export async function blockAsLearner(learnerId: string, linkId: string): Promise<boolean> {
  if (!isUuid(learnerId) || !isUuid(linkId)) return false;
  const [blocked] = await runTogether([sq.blockLinkQuery(null, learnerId, linkId), sq.cancelOpenForLinkQuery(null, learnerId, linkId)]);
  return blocked.length > 0;
}

export async function blockAsParent(parentId: string, learnerId: string, linkId: string): Promise<boolean> {
  if (!isUuid(learnerId) || !isUuid(linkId)) return false;
  const [blocked] = await runTogether([sq.blockLinkQuery(parentId, learnerId, linkId), sq.cancelOpenForLinkQuery(parentId, learnerId, linkId)]);
  return blocked.length > 0;
}

export async function unblockAsParent(parentId: string, learnerId: string, linkId: string): Promise<boolean> {
  if (!isUuid(learnerId) || !isUuid(linkId)) return false;
  return (await run(sq.unblockLinkQuery(parentId, learnerId, linkId))).length > 0;
}

export async function removeAsParent(parentId: string, learnerId: string, linkId: string): Promise<boolean> {
  if (!isUuid(learnerId) || !isUuid(linkId)) return false;
  const [, removed] = await runTogether([sq.cancelOpenForLinkQuery(parentId, learnerId, linkId), sq.removeLinkQuery(parentId, learnerId, linkId)]);
  return removed.length > 0;
}

// A learner reports a classmate. The report is saved for the owner and the link is blocked straight away.
export async function reportAsLearner(learnerId: string, linkId: string, reason: string, note: string, message?: { id: string; text: string }): Promise<{ ok: true } | { error: string }> {
  if (!isUuid(learnerId) || !isUuid(linkId)) return { error: "That classmate isn’t available." };
  if (!(await withinLimit({ learnerId }, "report", LIMITS.reportsPerLearnerPerDay, 86400))) return { error: "You’ve sent enough reports for today. A parent can contact us for more help." };
  const cleanNote = note.replace(/\s+/g, " ").trim().slice(0, 300) || null;
  const excerpt = message ? message.text.slice(0, 500) : null;
  const [report] = await runTogether([
    sq.reportQuery(learnerId, linkId, reason, cleanNote, message && isUuid(message.id) ? message.id : null, excerpt),
    sq.blockLinkQuery(null, learnerId, linkId),
    sq.cancelOpenForLinkQuery(null, learnerId, linkId),
  ]);
  return report.length ? { ok: true } : { error: "That classmate isn’t available." };
}

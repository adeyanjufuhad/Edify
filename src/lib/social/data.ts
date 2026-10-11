import "server-only";
import { database } from "@/lib/db";
import { rateLimitQuery, type Query } from "@/lib/social-sql";

export type Row = Record<string, unknown>;

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export const isUuid = (value: unknown): value is string => typeof value === "string" && UUID_PATTERN.test(value);

export async function run(query: Query): Promise<Row[]> {
  return (await database().query(query.text, query.params as unknown[])) as Row[];
}

// Runs several statements as one all-or-nothing transaction.
export async function runTogether(queries: Query[]): Promise<Row[][]> {
  const sql = database();
  return (await sql.transaction(queries.map((query) => sql.query(query.text, query.params as unknown[])))) as Row[][];
}

// True when this action is within its limit (and records it). See rateLimitQuery.
export async function withinLimit(actor: { learnerId: string } | { parentId: string }, kind: string, max: number, windowSeconds: number) {
  const rows = await run(rateLimitQuery(actor, kind, max, windowSeconds));
  return rows[0]?.allowed === true;
}

export const toIso = (value: unknown) => new Date(value as string).toISOString();

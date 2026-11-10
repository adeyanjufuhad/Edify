import { readFile } from "node:fs/promises";
import { neon } from "@neondatabase/serverless";

// Local configuration is never printed. On hosting, DATABASE_URL comes from the environment.
if (!process.env.DATABASE_URL) process.loadEnvFile(".env.local");
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required.");
const sql = neon(process.env.DATABASE_URL);
const migration = await readFile(new URL("../db/migrations/006_payments.sql", import.meta.url), "utf8");
const statements = migration.split(";").map((statement) => statement.trim()).filter(Boolean);
// 016 renames paystack_id to provider_id. It is one do-block, so it is sent whole rather than split on semicolons.
const provider = await readFile(new URL("../db/migrations/016_payment_provider.sql", import.meta.url), "utf8");
await sql.transaction([...statements, provider].map((statement) => sql.query(statement)));
console.log("Payment migrations applied successfully.");

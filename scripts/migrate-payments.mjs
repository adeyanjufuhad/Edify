import { readFile } from "node:fs/promises";
import { neon } from "@neondatabase/serverless";

// Local configuration is never printed. On hosting, DATABASE_URL comes from the environment.
if (!process.env.DATABASE_URL) process.loadEnvFile(".env.local");
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required.");
const sql = neon(process.env.DATABASE_URL);
const migration = await readFile(new URL("../db/migrations/006_payments.sql", import.meta.url), "utf8");
const statements = migration.split(";").map((statement) => statement.trim()).filter(Boolean);
await sql.transaction(statements.map((statement) => sql.query(statement)));
console.log("Payment migration applied successfully.");

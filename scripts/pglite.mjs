// Loads PGlite (an in-memory Postgres that only the SQL tests use; it is not an app dependency).
// Either `npm i --no-save @electric-sql/pglite`, or install it in any folder and point PGLITE_DIR at that folder.
import { join } from "node:path";
import { pathToFileURL } from "node:url";

export async function loadPGlite() {
  try {
    return (await import("@electric-sql/pglite")).PGlite;
  } catch {
    if (!process.env.PGLITE_DIR) throw new Error("PGlite is not installed: run `npm i --no-save @electric-sql/pglite`, or set PGLITE_DIR to a folder that has it in node_modules.");
    const entry = join(process.env.PGLITE_DIR, "node_modules", "@electric-sql", "pglite", "dist", "index.js");
    return (await import(pathToFileURL(entry).href)).PGlite;
  }
}

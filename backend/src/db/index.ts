import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import { ENV } from "../config/env";

if (!ENV.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in environment variables");
}

// initialize PostgreSQL connection pool
const pool = new Pool({ connectionString: ENV.DATABASE_URL });

// log when first connection is made
pool.on("connect", () => {
  console.log("Database connected successfully ✅");
});

// log when an error occurs
pool.on("error", (err) => {
  console.error("💥 Database connection error:", err);
});

// Pass the pool directly, then the schema options
export const db = drizzle(pool, { schema });
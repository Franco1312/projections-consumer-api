// file: src/infrastructure/database/migrations/runMigration.ts

import { readFileSync } from "fs";
import { join, dirname } from "path";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

async function runMigration(): Promise<void> {
  const host = process.env.DB_HOST;
  const port = process.env.DB_PORT || "5432";
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const databaseName = process.env.DB_NAME || "projections-consumer-api";

  if (!host || !user || !password) {
    throw new Error(
      "Missing required database environment variables: DB_HOST, DB_USER, DB_PASSWORD"
    );
  }

  const pool = new Pool({
    host,
    port: parseInt(port, 10),
    user,
    password,
    database: databaseName,
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
  });

  try {
    // Try to read from dist first (production), then fallback to src (development)
    let migrationPath = join(__dirname, "001_create_series_table.sql");
    
    try {
      readFileSync(migrationPath, "utf-8");
    } catch {
      // If not found in dist, try src directory
      migrationPath = join(process.cwd(), "src", "infrastructure", "database", "migrations", "001_create_series_table.sql");
    }
    
    const migrationFile = readFileSync(migrationPath, "utf-8");

    console.log("Running migration: 001_create_series_table.sql");
    await pool.query(migrationFile);
    console.log("Migration completed successfully");
  } catch (error) {
    console.error("Migration failed:", error);
    throw error;
  } finally {
    await pool.end();
  }
}

if (require.main === module) {
  runMigration()
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.error("Failed to run migration:", error);
      process.exit(1);
    });
}

export { runMigration };


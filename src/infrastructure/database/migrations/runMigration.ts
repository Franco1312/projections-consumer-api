// file: src/infrastructure/database/migrations/runMigration.ts

import { readFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

async function runMigration(): Promise<void> {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    // Fallback to individual variables
    const host = process.env.DB_HOST;
    const port = process.env.DB_PORT || "5432";
    const user = process.env.DB_USER;
    const password = process.env.DB_PASSWORD;
    const databaseName = process.env.DB_NAME || "projections-consumer-api";

    if (!host || !user || !password) {
      throw new Error(
        "Missing required database configuration. Provide either DATABASE_URL or DB_HOST, DB_USER, DB_PASSWORD"
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

    await executeMigration(pool);
    return;
  }

  const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  await executeMigration(pool);
}

async function executeMigration(pool: Pool): Promise<void> {
  try {
    // Determine migration directory path
    let migrationsDir: string;
    try {
      // Try dist first (production)
      migrationsDir = __dirname;
      readdirSync(migrationsDir);
    } catch {
      // Fallback to src (development)
      migrationsDir = join(process.cwd(), "src", "infrastructure", "database", "migrations");
    }

    // Get all SQL files and sort them
    const migrationFiles = readdirSync(migrationsDir)
      .filter((file) => file.endsWith(".sql"))
      .sort();

    if (migrationFiles.length === 0) {
      console.log("No migration files found");
      return;
    }

    console.log(`Found ${migrationFiles.length} migration file(s)`);

    // Execute each migration in order
    for (const migrationFile of migrationFiles) {
      const migrationPath = join(migrationsDir, migrationFile);
      const migrationContent = readFileSync(migrationPath, "utf-8");

      console.log(`Running migration: ${migrationFile}`);
      await pool.query(migrationContent);
      console.log(`Migration ${migrationFile} completed successfully`);
    }

    console.log("All migrations completed successfully");
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


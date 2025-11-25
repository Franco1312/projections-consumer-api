// file: test-db-connection.ts (temporary script)

import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

async function testConnection(): Promise<void> {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "Missing DATABASE_URL environment variable. Provide a PostgreSQL connection string."
    );
  }

  // Mask password in log
  const maskedConnectionString = connectionString.replace(
    /:([^:@]+)@/,
    ":****@"
  );

  console.log("Testing database connection...");
  console.log(`Connection string: ${maskedConnectionString}\n`);

  const pool = new Pool({
    connectionString,
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : { rejectUnauthorized: false },
    connectionTimeoutMillis: parseInt(process.env.DB_CONNECTION_TIMEOUT || "10000", 10),
  });

  try {
    console.log("Attempting to connect...");
    const client = await pool.connect();
    console.log("✅ Connection successful!\n");

    console.log("Testing query...");
    const result = await pool.query("SELECT NOW() as current_time, version() as postgres_version");
    console.log("✅ Query successful!");
    console.log(`Current time: ${result.rows[0].current_time}`);
    console.log(`PostgreSQL version: ${result.rows[0].postgres_version.split(",")[0]}\n`);

    console.log("Testing series table...");
    const seriesCount = await pool.query("SELECT COUNT(*) as count FROM series");
    console.log(`✅ Series table accessible!`);
    console.log(`Total series records: ${seriesCount.rows[0].count}\n`);

    const distinctCodes = await pool.query(
      "SELECT COUNT(DISTINCT internal_series_code) as count FROM series"
    );
    console.log(`Distinct series codes: ${distinctCodes.rows[0].count}`);

    client.release();
    console.log("\n✅ All tests passed!");
  } catch (error: any) {
    console.error("❌ Connection failed:");
    console.error(`Error: ${error.message}`);
    if (error.code) {
      console.error(`Error code: ${error.code}`);
    }
    throw error;
  } finally {
    await pool.end();
  }
}

testConnection()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Database connection test failed:", error);
    process.exit(1);
  });


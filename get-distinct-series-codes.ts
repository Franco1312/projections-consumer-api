// file: get-distinct-series-codes.ts (temporary script)

import { Pool } from "pg";
import dotenv from "dotenv";
import { writeFileSync } from "fs";

dotenv.config();

async function getDistinctSeriesCodes(): Promise<void> {
  const databaseUrl = process.env.DATABASE_URL;

  let pool: Pool;

  if (databaseUrl) {
    pool = new Pool({
      connectionString: databaseUrl,
      ssl: databaseUrl.includes("render.com") ? { rejectUnauthorized: false } : false,
    });
  } else {
    const host = process.env.DB_HOST;
    const port = process.env.DB_PORT || "5432";
    const user = process.env.DB_USER;
    const password = process.env.DB_PASSWORD;
    const databaseName = process.env.DB_NAME || "projections-consumer-api";

    if (!host || !user || !password) {
      throw new Error(
        "Missing required database environment variables: DATABASE_URL or DB_HOST, DB_USER, DB_PASSWORD"
      );
    }

    pool = new Pool({
      host,
      port: parseInt(port, 10),
      user,
      password,
      database: databaseName,
      ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
    });
  }

  try {
    const result = await pool.query(`
      SELECT DISTINCT internal_series_code
      FROM series
      ORDER BY internal_series_code ASC
    `);

    const seriesCodes = result.rows.map((row) => row.internal_series_code);

    console.log(`Found ${seriesCodes.length} unique series codes:\n`);
    seriesCodes.forEach((code, index) => {
      console.log(`${index + 1}. ${code}`);
    });

    console.log(`\nTotal: ${seriesCodes.length} unique series codes`);
  } catch (error) {
    console.error("Error querying database:", error);
    throw error;
  } finally {
    await pool.end();
  }
}

getDistinctSeriesCodes()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error("Failed to get distinct series codes:", error);
    process.exit(1);
  });


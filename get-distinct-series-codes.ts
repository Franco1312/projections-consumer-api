// file: get-distinct-series-codes.ts (temporary script)

import { Pool } from "pg";
import dotenv from "dotenv";
import { writeFileSync } from "fs";

dotenv.config();

async function getDistinctSeriesCodes(): Promise<void> {
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
    const result = await pool.query(`
      SELECT DISTINCT ON (internal_series_code)
        internal_series_code,
        obs_time,
        value
      FROM series
      ORDER BY internal_series_code, obs_time DESC
    `);

    const seriesData = result.rows.map((row) => ({
      internal_series_code: row.internal_series_code,
      last_obs_time: row.obs_time,
      last_value: row.value,
    }));

    console.log(`Found ${seriesData.length} distinct series codes:\n`);
    seriesData.forEach((item, index) => {
      console.log(
        `${index + 1}. ${item.internal_series_code} - Last obs_time: ${item.last_obs_time}, Last value: ${item.last_value}`
      );
    });

    const outputFile = "series-codes-with-last-values.json";
    writeFileSync(outputFile, JSON.stringify(seriesData, null, 2));
    console.log(`\nResults saved to ${outputFile}`);
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


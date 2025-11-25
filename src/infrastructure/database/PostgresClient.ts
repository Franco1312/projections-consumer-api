// file: src/infrastructure/database/PostgresClient.ts

import { Pool, PoolClient, QueryResult } from "pg";
import { DatabaseClient } from "@/domain/interfaces/database.interface";
import { logger } from "@/infrastructure/logger/PinoLogger";
import { LOG_EVENTS } from "@/infrastructure/logger/LOG_EVENTS";

export class PostgresClient implements DatabaseClient {
  private pool: Pool | null = null;
  private isConnectedFlag: boolean = false;

  constructor() {
    const connectionString = this.buildConnectionString();
    
    this.pool = new Pool({
      connectionString,
      ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
      max: parseInt(process.env.DB_POOL_MAX || "10", 10),
      idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT || "30000", 10),
      connectionTimeoutMillis: parseInt(
        process.env.DB_CONNECTION_TIMEOUT || "2000",
        10
      ),
    });

    this.pool.on("error", (err) => {
      logger.error({
        event: LOG_EVENTS.DATABASE_ERROR,
        msg: "Unexpected error on idle database client",
        err,
      });
      this.isConnectedFlag = false;
    });
  }

  private buildConnectionString(): string {
    const host = process.env.DB_HOST;
    const port = process.env.DB_PORT || "5432";
    const database = process.env.DB_NAME;
    const user = process.env.DB_USER;
    const password = process.env.DB_PASSWORD;

    if (!host || !database || !user || !password) {
      throw new Error(
        "Missing required database environment variables: DB_HOST, DB_NAME, DB_USER, DB_PASSWORD"
      );
    }

    return `postgresql://${user}:${password}@${host}:${port}/${database}`;
  }

  async connect(): Promise<void> {
    if (this.pool && !this.isConnectedFlag) {
      try {
        const client = await this.pool.connect();
        client.release();
        this.isConnectedFlag = true;
      } catch (error) {
        this.isConnectedFlag = false;
        throw error;
      }
    }
  }

  async disconnect(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
      this.isConnectedFlag = false;
      this.pool = null;
    }
  }

  isConnected(): boolean {
    return this.isConnectedFlag && this.pool !== null;
  }

  async query<T = unknown>(text: string, params?: unknown[]): Promise<T[]> {
    if (!this.pool) {
      throw new Error("Database pool is not initialized");
    }

    const result: QueryResult = await this.pool.query(text, params);
    return result.rows as T[];
  }

  async getClient(): Promise<PoolClient> {
    if (!this.pool) {
      throw new Error("Database pool is not initialized");
    }
    return this.pool.connect();
  }
}


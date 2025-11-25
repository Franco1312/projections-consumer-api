// file: src/infrastructure/database/index.ts

import { PostgresClient } from "./PostgresClient";

export const databaseClient = new PostgresClient();


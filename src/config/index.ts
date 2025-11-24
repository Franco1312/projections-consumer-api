// file: src/config/index.ts

import dotenv from "dotenv";
import { Environment } from "@/config/env";
import { config as localConfig } from "@/config/local";
import { config as stagingConfig } from "@/config/staging";
import { config as productionConfig } from "@/config/production";

dotenv.config();

const nodeEnv = process.env.NODE_ENV || "local";

let config: Environment;

switch (nodeEnv) {
  case "staging":
    config = stagingConfig;
    break;
  case "production":
    config = productionConfig;
    break;
  default:
    config = localConfig;
    break;
}

export { config };
export type { Environment };


// file: src/config/staging.ts

import { Environment } from "@/config/env";

export const config: Environment = {
  envName: "staging",
  port: 3001,
  sqs: {
    enabled: true,
    projectionUpdatesConsumerUrl:
      "https://sqs.us-east-1.amazonaws.com/706341500093/projections-updates-api-consumer.fifo",
    region: "us-east-1",
  },
};


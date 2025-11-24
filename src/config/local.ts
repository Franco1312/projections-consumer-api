// file: src/config/local.ts

import { Environment } from "@/config/env";

export const config: Environment = {
  envName: "local",
  port: Number(process.env.PORT) || 3000,
  sqs: {
    enabled: true,
    projectionUpdatesConsumerUrl:
      "https://sqs.us-east-1.amazonaws.com/706341500093/projections-updates-api-consumer.fifo",
    region: "us-east-1",
  },
  s3: {
    region: "us-east-1",
  },
};


// file: src/config/env.ts

export type Environment = {
  envName: "local" | "staging" | "production";
  port: number;
  sqs: {
    enabled: boolean;
    projectionUpdatesConsumerUrl: string;
    region: string;
  };
};


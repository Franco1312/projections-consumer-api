// file: src/server.ts

import { config } from "@/config";
import { createApp } from "@/app";
import { logger } from "@/infrastructure/logger/PinoLogger";
import { LOG_EVENTS } from "@/infrastructure/logger/LOG_EVENTS";

const app = createApp();

const server = app.listen(config.port, () => {
  logger.info({
    event: LOG_EVENTS.SERVER_STARTED,
    msg: "Server listening",
    data: {
      port: config.port,
      environment: config.envName,
    },
  });
});

process.on("SIGTERM", () => {
  logger.info({
    event: LOG_EVENTS.SERVER_SHUTDOWN,
    msg: "SIGTERM signal received: closing HTTP server",
  });
  server.close(() => {
    logger.info({
      event: LOG_EVENTS.SERVER_CLOSED,
      msg: "HTTP server closed",
    });
  });
});


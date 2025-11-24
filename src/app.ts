// file: src/app.ts

import express, { Express } from "express";
import { logger } from "@/infrastructure/logger/PinoLogger";
import { LOG_EVENTS } from "@/infrastructure/logger/LOG_EVENTS";
import { registerHealthRoutes } from "@/interfaces/http/routes/health.routes";

export function createApp(): Express {
  const app = express();

  app.use(express.json());

  app.use((req, res, next) => {
    logger.info({
      event: LOG_EVENTS.HTTP_REQUEST,
      msg: "HTTP request received",
      data: {
        method: req.method,
        path: req.path,
      },
    });
    next();
  });

  const router = express.Router();
  registerHealthRoutes(router);
  app.use(router);

  return app;
}


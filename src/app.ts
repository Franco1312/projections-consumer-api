// file: src/app.ts

import express, { Express } from "express";
import { logger } from "@/infrastructure/logger/PinoLogger";
import { LOG_EVENTS } from "@/infrastructure/logger/LOG_EVENTS";
import { registerHealthRoutes } from "@/interfaces/http/routes/health.routes";
import { registerProjectionUpdateRoutes } from "@/interfaces/http/routes/projection-update.routes";
import { setupSwagger } from "@/infrastructure/http/swagger.config";

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
  registerProjectionUpdateRoutes(router);
  app.use(router);

  setupSwagger(app);

  return app;
}


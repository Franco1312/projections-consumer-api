// file: src/interfaces/http/routes/create-series.routes.ts

import { Router } from "express";
import { defaultCreateSeriesController } from "../controllers/CreateSeriesController";
import { validate } from "@/infrastructure/http/middleware/validation.middleware";
import { CreateSeriesSchema } from "@/domain/validators/CreateSeries.validator";

export function registerCreateSeriesRoutes(router: Router): void {
  router.post(
    "/api/v1/series",
    validate(CreateSeriesSchema, "body"),
    (req, res) => defaultCreateSeriesController.handle(req, res)
  );
}


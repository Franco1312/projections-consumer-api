// file: src/interfaces/http/routes/get-latest-series.routes.ts

import { Router } from "express";
import { defaultGetLatestSeriesController } from "../controllers/GetLatestSeriesController";
import { validate } from "@/infrastructure/http/middleware/validation.middleware";
import { GetLatestSeriesQuerySchema } from "@/domain/validators/GetLatestSeriesQuery.validator";

export function registerGetLatestSeriesRoutes(router: Router): void {
  router.get(
    "/api/v1/series/latest",
    validate(GetLatestSeriesQuerySchema, "query"),
    (req, res) => defaultGetLatestSeriesController.handle(req, res)
  );
}


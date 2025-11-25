// file: src/interfaces/http/routes/get-series.routes.ts

import { Router } from "express";
import { defaultGetSeriesController } from "../controllers/GetSeriesController";
import { validate } from "@/infrastructure/http/middleware/validation.middleware";
import { GetSeriesQuerySchema } from "@/domain/validators/GetSeriesQuery.validator";

export function registerGetSeriesRoutes(router: Router): void {
  router.get(
    "/api/v1/series",
    validate(GetSeriesQuerySchema, "query"),
    (req, res) => defaultGetSeriesController.handle(req, res)
  );
}


// file: src/interfaces/http/routes/get-series-with-metadata.routes.ts

import { Router } from "express";
import { defaultGetSeriesWithMetadataController } from "../controllers/GetSeriesWithMetadataController";
import { validate } from "@/infrastructure/http/middleware/validation.middleware";
import { GetSeriesWithMetadataParamsSchema } from "@/domain/validators/GetSeriesWithMetadataParams.validator";

export function registerGetSeriesWithMetadataRoutes(router: Router): void {
  router.get(
    "/api/v1/series/:code/metadata",
    validate(GetSeriesWithMetadataParamsSchema, "params"),
    (req, res) => defaultGetSeriesWithMetadataController.handle(req, res)
  );
}


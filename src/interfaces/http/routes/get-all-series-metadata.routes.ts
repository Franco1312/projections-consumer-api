// file: src/interfaces/http/routes/get-all-series-metadata.routes.ts

import { Router } from "express";
import { defaultGetAllSeriesMetadataController } from "../controllers/GetAllSeriesMetadataController";

export function registerGetAllSeriesMetadataRoutes(router: Router): void {
  router.get(
    "/api/v1/series/metadata",
    (req, res) => defaultGetAllSeriesMetadataController.handle(req, res)
  );
}




// file: src/interfaces/http/routes/projection-update.routes.ts

import { Router } from "express";
import { defaultProjectionUpdateController } from "../controllers/ProjectionUpdateController";
import { validate } from "@/infrastructure/http/middleware/validation.middleware";
import { ProjectionUpdateEventSchema } from "@/domain/validators/ProjectionUpdateEvent.validator";

export function registerProjectionUpdateRoutes(router: Router): void {
  router.post(
    "/api/v1/projections/update",
    validate(ProjectionUpdateEventSchema, "body"),
    (req, res) => defaultProjectionUpdateController.handle(req, res)
  );
}


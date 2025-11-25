// file: src/interfaces/http/routes/projection-update.routes.ts

import { Router } from "express";
import { ProjectionUpdateController } from "../controllers/ProjectionUpdateController";
import { ProcessProjectionUpdateUseCase } from "@/application/use-cases/ProcessProjectionUpdate.use-case";
import { validateRequest } from "@/infrastructure/http/middleware/validation.middleware";
import { ProjectionUpdateEventSchema } from "@/domain/validators/ProjectionUpdateEvent.validator";

export function registerProjectionUpdateRoutes(router: Router): void {
  const processProjectionUpdateUseCase = new ProcessProjectionUpdateUseCase();
  const controller = new ProjectionUpdateController(
    processProjectionUpdateUseCase
  );

  router.post(
    "/api/v1/projections/update",
    validateRequest(ProjectionUpdateEventSchema),
    (req, res) => controller.handle(req, res)
  );
}


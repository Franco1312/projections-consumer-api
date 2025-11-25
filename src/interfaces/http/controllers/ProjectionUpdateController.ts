// file: src/interfaces/http/controllers/ProjectionUpdateController.ts

import { Request, Response } from "express";
import { defaultProcessProjectionUpdateUseCase } from "@/application/use-cases/ProcessProjectionUpdate.use-case";
import { ProjectionUpdateEvent } from "@/domain/events/ProjectionUpdateEvent";
import { logger } from "@/infrastructure/logger/PinoLogger";
import { LOG_EVENTS } from "@/infrastructure/logger/LOG_EVENTS";
import { ProcessProjectionUpdateUseCase } from "@/application/use-cases/ProcessProjectionUpdate.use-case";

class ProjectionUpdateController {
  constructor(
    private readonly processProjectionUpdateUseCase: ProcessProjectionUpdateUseCase = defaultProcessProjectionUpdateUseCase
  ) { }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const event = req.body as ProjectionUpdateEvent;

      await this.processProjectionUpdateUseCase.execute(event);

      res.status(200).json({
        success: true,
        message: "Projection update event processed successfully",
      });
    } catch (error) {
      logger.error({
        event: LOG_EVENTS.PROJECTION_UPDATE_ERROR,
        msg: "Error processing projection update",
        err: error,
      });

      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}

export const defaultProjectionUpdateController = new ProjectionUpdateController();

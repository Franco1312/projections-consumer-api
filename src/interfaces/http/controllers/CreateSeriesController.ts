// file: src/interfaces/http/controllers/CreateSeriesController.ts

import { Request, Response } from "express";
import { defaultCreateSeriesUseCase } from "@/application/use-cases/CreateSeries.use-case";
import { CreateSeriesUseCase } from "@/application/use-cases/CreateSeries.use-case";
import { logger } from "@/infrastructure/logger/PinoLogger";
import { LOG_EVENTS } from "@/infrastructure/logger/LOG_EVENTS";

class CreateSeriesController {
  constructor(
    private readonly createSeriesUseCase: CreateSeriesUseCase = defaultCreateSeriesUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const series = await this.createSeriesUseCase.execute(req.body);

      res.status(201).json({
        success: true,
        data: series,
        message: "Series created successfully",
      });
    } catch (error) {
      logger.error({
        event: LOG_EVENTS.PROJECTION_UPDATE_ERROR,
        msg: "Error creating series",
        err: error,
      });

      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}

export const defaultCreateSeriesController = new CreateSeriesController();


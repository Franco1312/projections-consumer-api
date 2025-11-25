// file: src/interfaces/http/controllers/GetLatestSeriesController.ts

import { Request, Response } from "express";
import { defaultGetLatestSeriesUseCase } from "@/application/use-cases/GetLatestSeries.use-case";
import { GetLatestSeriesUseCase } from "@/application/use-cases/GetLatestSeries.use-case";
import { logger } from "@/infrastructure/logger/PinoLogger";
import { LOG_EVENTS } from "@/infrastructure/logger/LOG_EVENTS";

class GetLatestSeriesController {
  constructor(
    private readonly getLatestSeriesUseCase: GetLatestSeriesUseCase = defaultGetLatestSeriesUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { code } = req.query;

      const series = await this.getLatestSeriesUseCase.execute({
        code: code as string,
      });

      if (!series) {
        res.status(404).json({
          success: false,
          message: "Series not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: series,
      });
    } catch (error) {
      logger.error({
        event: LOG_EVENTS.PROJECTION_UPDATE_ERROR,
        msg: "Error getting latest series",
        err: error,
      });

      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}

export const defaultGetLatestSeriesController = new GetLatestSeriesController();


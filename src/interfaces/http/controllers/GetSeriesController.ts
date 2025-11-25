// file: src/interfaces/http/controllers/GetSeriesController.ts

import { Request, Response } from "express";
import { defaultGetSeriesUseCase } from "@/application/use-cases/GetSeries.use-case";
import { GetSeriesUseCase } from "@/application/use-cases/GetSeries.use-case";
import { logger } from "@/infrastructure/logger/PinoLogger";
import { LOG_EVENTS } from "@/infrastructure/logger/LOG_EVENTS";

class GetSeriesController {
  constructor(
    private readonly getSeriesUseCase: GetSeriesUseCase = defaultGetSeriesUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { code, startDate, endDate } = req.query;

      const series = await this.getSeriesUseCase.execute({
        code: code as string,
        startDate: startDate as string,
        endDate: endDate as string,
      });

      res.status(200).json({
        success: true,
        data: series,
        count: series.length,
      });
    } catch (error) {
      logger.error({
        event: LOG_EVENTS.PROJECTION_UPDATE_ERROR,
        msg: "Error getting series",
        err: error,
      });

      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}

export const defaultGetSeriesController = new GetSeriesController();



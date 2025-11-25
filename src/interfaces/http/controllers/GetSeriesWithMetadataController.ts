// file: src/interfaces/http/controllers/GetSeriesWithMetadataController.ts

import { Request, Response } from "express";
import { defaultGetSeriesWithMetadataUseCase } from "@/application/use-cases/GetSeriesWithMetadata.use-case";
import { GetSeriesWithMetadataUseCase } from "@/application/use-cases/GetSeriesWithMetadata.use-case";
import { logger } from "@/infrastructure/logger/PinoLogger";
import { LOG_EVENTS } from "@/infrastructure/logger/LOG_EVENTS";

class GetSeriesWithMetadataController {
  constructor(
    private readonly getSeriesWithMetadataUseCase: GetSeriesWithMetadataUseCase = defaultGetSeriesWithMetadataUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { code } = req.params;

      const series = await this.getSeriesWithMetadataUseCase.execute(code as string);

      if (!series) {
        res.status(404).json({
          success: false,
          message: "Series metadata not found",
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
        msg: "Error getting series metadata",
        err: error,
      });

      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}

export const defaultGetSeriesWithMetadataController = new GetSeriesWithMetadataController();


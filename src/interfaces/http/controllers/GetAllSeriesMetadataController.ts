// file: src/interfaces/http/controllers/GetAllSeriesMetadataController.ts

import { Request, Response } from "express";
import { defaultGetAllSeriesMetadataUseCase } from "@/application/use-cases/GetAllSeriesMetadata.use-case";
import { GetAllSeriesMetadataUseCase } from "@/application/use-cases/GetAllSeriesMetadata.use-case";
import { logger } from "@/infrastructure/logger/PinoLogger";
import { LOG_EVENTS } from "@/infrastructure/logger/LOG_EVENTS";

class GetAllSeriesMetadataController {
  constructor(
    private readonly getAllSeriesMetadataUseCase: GetAllSeriesMetadataUseCase = defaultGetAllSeriesMetadataUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const metadata = await this.getAllSeriesMetadataUseCase.execute();

      res.status(200).json({
        success: true,
        data: metadata,
        count: metadata.length,
      });
    } catch (error) {
      logger.error({
        event: LOG_EVENTS.PROJECTION_UPDATE_ERROR,
        msg: "Error getting all series metadata",
        err: error,
      });

      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}

export const defaultGetAllSeriesMetadataController = new GetAllSeriesMetadataController();


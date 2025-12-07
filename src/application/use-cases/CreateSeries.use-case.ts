// file: src/application/use-cases/CreateSeries.use-case.ts

import { Series } from "@/domain/entities/Series";
import { SeriesRepository } from "@/domain/interfaces/series.repository.interface";
import { CreateSeriesInput } from "@/domain/validators/CreateSeries.validator";
import { seriesRepository as defaultSeriesRepository } from "@/infrastructure/database/repositories";
import { logger } from "@/infrastructure/logger/PinoLogger";
import { LOG_EVENTS } from "@/infrastructure/logger/LOG_EVENTS";

export class CreateSeriesUseCase {
  constructor(
    private readonly seriesRepository: SeriesRepository = defaultSeriesRepository
  ) {}

  async execute(input: CreateSeriesInput): Promise<Series> {
    logger.info({
      event: LOG_EVENTS.SERIES_SAVED,
      msg: "Creating new series",
      data: {
        internal_series_code: input.internal_series_code,
        obs_time: input.obs_time,
      },
    });

    const series: Series = {
      obs_time: input.obs_time,
      internal_series_code: input.internal_series_code,
      value: input.value,
      unit: input.unit,
      frequency: input.frequency,
      collection_date: input.collection_date,
    };

    // insertMany maneja el caso de conflicto (ON CONFLICT DO UPDATE)
    await this.seriesRepository.insertMany([series]);

    // Obtener la serie creada/actualizada buscando por código y obs_time
    const obsTime = new Date(input.obs_time);
    const startDate = new Date(obsTime.getTime() - 1000).toISOString(); // 1 segundo antes
    const endDate = new Date(obsTime.getTime() + 1000).toISOString(); // 1 segundo después

    const foundSeries = await this.seriesRepository.findByCodeAndDateRange({
      code: input.internal_series_code,
      startDate,
      endDate,
    });

    if (foundSeries.length === 0) {
      throw new Error("Failed to create series");
    }

    // Encontrar el registro exacto que coincide con obs_time
    const createdSeries = foundSeries.find(
      (s) => s.obs_time === input.obs_time
    ) || foundSeries[0];

    logger.info({
      event: LOG_EVENTS.SERIES_SAVED,
      msg: "Series created successfully",
      data: {
        internal_series_code: createdSeries.internal_series_code,
        id: createdSeries.id,
      },
    });

    return createdSeries;
  }
}

export const defaultCreateSeriesUseCase = new CreateSeriesUseCase();


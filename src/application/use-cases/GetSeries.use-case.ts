// file: src/application/use-cases/GetSeries.use-case.ts

import { Series } from "@/domain/entities/Series";
import { SeriesRepository } from "@/domain/interfaces/series.repository.interface";
import { GetSeriesQuery } from "@/domain/validators/GetSeriesQuery.validator";
import { seriesRepository as defaultSeriesRepository } from "@/infrastructure/database/repositories";

export class GetSeriesUseCase {
  constructor(
    private readonly seriesRepository: SeriesRepository = defaultSeriesRepository
  ) {}

  async execute(query: GetSeriesQuery): Promise<Series[]> {
    return this.seriesRepository.findByCodeAndDateRange({
      code: query.code,
      startDate: query.startDate,
      endDate: query.endDate,
    });
  }
}

export const defaultGetSeriesUseCase = new GetSeriesUseCase();


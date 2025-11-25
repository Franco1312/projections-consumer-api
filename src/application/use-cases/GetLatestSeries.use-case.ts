// file: src/application/use-cases/GetLatestSeries.use-case.ts

import { Series } from "@/domain/entities/Series";
import { SeriesRepository } from "@/domain/interfaces/series.repository.interface";
import { GetLatestSeriesQuery } from "@/domain/validators/GetLatestSeriesQuery.validator";
import { seriesRepository as defaultSeriesRepository } from "@/infrastructure/database/repositories";

export class GetLatestSeriesUseCase {
  constructor(
    private readonly seriesRepository: SeriesRepository = defaultSeriesRepository
  ) {}

  async execute(query: GetLatestSeriesQuery): Promise<Series | null> {
    return this.seriesRepository.findLatestByCode(query.code);
  }
}

export const defaultGetLatestSeriesUseCase = new GetLatestSeriesUseCase();


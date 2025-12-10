// file: src/application/use-cases/GetLatestSeries.use-case.ts

import { SeriesWithVariation } from "@/domain/entities/SeriesWithVariation";
import { SeriesRepository } from "@/domain/interfaces/series.repository.interface";
import { GetLatestSeriesQuery } from "@/domain/validators/GetLatestSeriesQuery.validator";
import { seriesRepository as defaultSeriesRepository } from "@/infrastructure/database/repositories";

export class GetLatestSeriesUseCase {
  constructor(
    private readonly seriesRepository: SeriesRepository = defaultSeriesRepository
  ) {}

  async execute(
    query: GetLatestSeriesQuery
  ): Promise<SeriesWithVariation | null> {
    return this.seriesRepository.findLatestWithVariationByCode(query.code);
  }
}

export const defaultGetLatestSeriesUseCase = new GetLatestSeriesUseCase();


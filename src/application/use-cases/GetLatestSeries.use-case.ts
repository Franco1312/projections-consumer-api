// file: src/application/use-cases/GetLatestSeries.use-case.ts

import { Series } from "@/domain/entities/Series";
import { SeriesWithVariation } from "@/domain/entities/SeriesWithVariation";
import { SeriesRepository } from "@/domain/interfaces/series.repository.interface";
import { GetLatestSeriesQuery } from "@/domain/validators/GetLatestSeriesQuery.validator";
import { seriesRepository as defaultSeriesRepository } from "@/infrastructure/database/repositories";

export class GetLatestSeriesUseCase {
  constructor(
    private readonly seriesRepository: SeriesRepository = defaultSeriesRepository
  ) {}

  async execute(query: GetLatestSeriesQuery): Promise<SeriesWithVariation | null> {
    const latestSeries = await this.seriesRepository.findLatestByCode(query.code);

    if (!latestSeries) {
      return null;
    }

    // Solo calcular variación para series mensuales (M) o diarias (D)
    if (latestSeries.frequency !== "M" && latestSeries.frequency !== "D") {
      return latestSeries as SeriesWithVariation;
    }

    // Obtener el valor anterior
    const previousSeries = await this.seriesRepository.findPreviousByCodeAndObsTime(
      latestSeries.internal_series_code,
      latestSeries.obs_time,
      latestSeries.frequency
    );

    if (!previousSeries) {
      // Si no hay valor anterior, devolver la serie sin variación
      return latestSeries as SeriesWithVariation;
    }

    // Calcular variación
    const currentValue = Number(latestSeries.value);
    const previousValue = Number(previousSeries.value);

    const change = currentValue - previousValue;
    const changePercent =
      previousValue !== 0
        ? ((currentValue - previousValue) / previousValue) * 100
        : undefined;

    const seriesWithVariation: SeriesWithVariation = {
      ...latestSeries,
      change,
      change_percent: changePercent,
      previous_value: previousValue,
      previous_obs_time: previousSeries.obs_time,
    };

    return seriesWithVariation;
  }
}

export const defaultGetLatestSeriesUseCase = new GetLatestSeriesUseCase();


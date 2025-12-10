// file: src/domain/interfaces/series.repository.interface.ts

import { Series } from "@/domain/entities/Series";
import { SeriesWithVariation } from "@/domain/entities/SeriesWithVariation";

export interface SeriesRepository {
  insertMany(series: Series[]): Promise<void>;
  findByCodeAndDateRange(params: {
    code: string;
    startDate: string;
    endDate: string;
  }): Promise<Series[]>;
  findLatestByCode(code: string): Promise<Series | null>;
  findLatestWithVariationByCode(
    code: string
  ): Promise<SeriesWithVariation | null>;
}


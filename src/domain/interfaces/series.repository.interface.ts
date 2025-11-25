// file: src/domain/interfaces/series.repository.interface.ts

import { Series } from "@/domain/entities/Series";

export interface SeriesRepository {
  insertMany(series: Series[]): Promise<void>;
  findByCodeAndDateRange(params: {
    code: string;
    startDate: string;
    endDate: string;
  }): Promise<Series[]>;
}


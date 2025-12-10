// file: src/domain/interfaces/series.repository.interface.ts

import { Series } from "@/domain/entities/Series";

export interface SeriesRepository {
  insertMany(series: Series[]): Promise<void>;
  findByCodeAndDateRange(params: {
    code: string;
    startDate: string;
    endDate: string;
  }): Promise<Series[]>;
  findLatestByCode(code: string): Promise<Series | null>;
  findPreviousByCodeAndObsTime(
    code: string,
    obsTime: string,
    frequency: string
  ): Promise<Series | null>;
}


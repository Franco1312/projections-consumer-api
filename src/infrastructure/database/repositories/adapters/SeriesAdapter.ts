// file: src/infrastructure/database/repositories/adapters/SeriesAdapter.ts

import { Series } from "@/domain/entities/Series";

export interface SeriesDbEntity {
  id?: number;
  obs_time: Date;
  internal_series_code: string;
  value: number;
  unit: string;
  frequency: string;
  collection_date: Date;
  created_at?: Date;
  updated_at?: Date;
}

class SeriesAdapter {
  toDbEntity(series: Series): SeriesDbEntity {
    return {
      id: series.id,
      obs_time: new Date(series.obs_time),
      internal_series_code: series.internal_series_code,
      value: series.value,
      unit: series.unit,
      frequency: series.frequency,
      collection_date: new Date(series.collection_date),
      created_at: series.created_at ? new Date(series.created_at) : undefined,
      updated_at: series.updated_at ? new Date(series.updated_at) : undefined,
    };
  }

  toDomain(dbEntity: SeriesDbEntity): Series {
    return {
      id: dbEntity.id,
      obs_time: dbEntity.obs_time.toISOString(),
      internal_series_code: dbEntity.internal_series_code,
      value: dbEntity.value,
      unit: dbEntity.unit,
      frequency: dbEntity.frequency,
      collection_date: dbEntity.collection_date.toISOString(),
      created_at: dbEntity.created_at?.toISOString(),
      updated_at: dbEntity.updated_at?.toISOString(),
    };
  }
}

export const seriesAdapter = new SeriesAdapter();


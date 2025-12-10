// file: src/infrastructure/database/repositories/adapters/SeriesAdapter.ts

import { Series } from "@/domain/entities/Series";
import { SeriesWithVariation } from "@/domain/entities/SeriesWithVariation";

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

export interface SeriesWithVariationDbEntity extends SeriesDbEntity {
  change?: number | null;
  change_percent?: number | null;
  previous_value?: number | null;
  previous_obs_time?: Date | null;
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

  toDomainWithVariation(
    dbEntity: SeriesWithVariationDbEntity
  ): SeriesWithVariation {
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
      change: dbEntity.change ?? undefined,
      change_percent: dbEntity.change_percent ?? undefined,
      previous_value: dbEntity.previous_value ?? undefined,
      previous_obs_time: dbEntity.previous_obs_time?.toISOString(),
    };
  }
}

export const seriesAdapter = new SeriesAdapter();


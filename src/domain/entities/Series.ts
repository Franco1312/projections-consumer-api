// file: src/domain/entities/Series.ts

export interface Series {
  id?: number;
  obs_time: string; // ISO 8601 timestamp with timezone
  internal_series_code: string;
  value: number;
  unit: string;
  frequency: string;
  collection_date: string; // ISO 8601 timestamp with timezone
  created_at?: string;
  updated_at?: string;
}


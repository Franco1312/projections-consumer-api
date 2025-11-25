// file: src/domain/entities/SeriesWithMetadata.ts

export interface SeriesWithMetadata {
  internal_series_code: string;
  description: string | null;
  methodology: string | null;
  source: string | null;
}


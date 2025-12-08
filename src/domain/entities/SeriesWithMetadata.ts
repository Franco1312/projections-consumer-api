// file: src/domain/entities/SeriesWithMetadata.ts

export interface SeriesWithMetadata {
  internal_series_code: string;
  title: string | null;
  description: string | null;
  methodology: string | null;
  source: string | null;
}


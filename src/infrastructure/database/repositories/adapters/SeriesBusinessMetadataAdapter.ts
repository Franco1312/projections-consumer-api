// file: src/infrastructure/database/repositories/adapters/SeriesBusinessMetadataAdapter.ts

import { SeriesWithMetadata } from "@/domain/entities/SeriesWithMetadata";

export interface SeriesBusinessMetadataDbEntity {
  internal_series_code: string;
  title: string | null;
  description: string | null;
  methodology: string | null;
  source: string | null;
}

class SeriesBusinessMetadataAdapter {
  toDomain(dbEntity: SeriesBusinessMetadataDbEntity): SeriesWithMetadata {
    return {
      internal_series_code: dbEntity.internal_series_code,
      title: dbEntity.title,
      description: dbEntity.description,
      methodology: dbEntity.methodology,
      source: dbEntity.source,
    };
  }
}

export const seriesBusinessMetadataAdapter = new SeriesBusinessMetadataAdapter();


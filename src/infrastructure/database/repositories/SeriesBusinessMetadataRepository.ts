// file: src/infrastructure/database/repositories/SeriesBusinessMetadataRepository.ts

import { SeriesBusinessMetadataRepository } from "@/domain/interfaces/series-business-metadata.repository.interface";
import { SeriesWithMetadata } from "@/domain/entities/SeriesWithMetadata";
import { databaseClient } from "@/infrastructure/database";
import {
  seriesBusinessMetadataAdapter,
  SeriesBusinessMetadataDbEntity,
} from "./adapters/SeriesBusinessMetadataAdapter";

class PostgresSeriesBusinessMetadataRepository
  implements SeriesBusinessMetadataRepository
{
  async findByCode(code: string): Promise<SeriesWithMetadata | null> {
    const query = `
      SELECT 
        internal_series_code,
        title,
        description,
        methodology,
        source
      FROM series_bussines_metadata
      WHERE internal_series_code = $1
      LIMIT 1
    `;

    const rows = await databaseClient.query<SeriesBusinessMetadataDbEntity>(
      query,
      [code]
    );

    if (rows.length === 0) {
      return null;
    }

    return seriesBusinessMetadataAdapter.toDomain(rows[0]);
  }

  async findAll(): Promise<SeriesWithMetadata[]> {
    const query = `
      SELECT 
        internal_series_code,
        title,
        description,
        methodology,
        source
      FROM series_bussines_metadata
      ORDER BY internal_series_code ASC
    `;

    const rows = await databaseClient.query<SeriesBusinessMetadataDbEntity>(
      query
    );

    return rows.map((row) => seriesBusinessMetadataAdapter.toDomain(row));
  }
}

export const defaultSeriesBusinessMetadataRepository =
  new PostgresSeriesBusinessMetadataRepository();


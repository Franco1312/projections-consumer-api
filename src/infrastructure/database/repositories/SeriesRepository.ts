// file: src/infrastructure/database/repositories/SeriesRepository.ts

import { SeriesRepository } from "@/domain/interfaces/series.repository.interface";
import { Series } from "@/domain/entities/Series";
import { databaseClient } from "@/infrastructure/database";
import { seriesAdapter, SeriesDbEntity } from "./adapters/SeriesAdapter";

class PostgresSeriesRepository implements SeriesRepository {
  async insertMany(series: Series[]): Promise<void> {
    if (series.length === 0) return;

    const dbEntities = series.map((s) => seriesAdapter.toDbEntity(s));

    const obs_time: Date[] = [];
    const internal_code: string[] = [];
    const value: number[] = [];
    const unit: string[] = [];
    const frequency: string[] = [];
    const collection_date: Date[] = [];

    for (const dbEntity of dbEntities) {
      obs_time.push(dbEntity.obs_time);
      internal_code.push(dbEntity.internal_series_code);
      value.push(dbEntity.value);
      unit.push(dbEntity.unit);
      frequency.push(dbEntity.frequency);
      collection_date.push(dbEntity.collection_date);
    }

    const query = `
      INSERT INTO series
        (obs_time, internal_series_code, value, unit, frequency, collection_date)
      SELECT *
      FROM UNNEST (
        $1::timestamptz[],
        $2::text[],
        $3::numeric[],
        $4::text[],
        $5::text[],
        $6::timestamptz[]
      )
      ON CONFLICT (internal_series_code, obs_time)
      DO UPDATE SET
        value = EXCLUDED.value,
        unit = EXCLUDED.unit,
        frequency = EXCLUDED.frequency,
        collection_date = EXCLUDED.collection_date,
        updated_at = NOW();
    `;

    await databaseClient.query(query, [
      obs_time,
      internal_code,
      value,
      unit,
      frequency,
      collection_date,
    ]);
  }

  async findByCodeAndDateRange(params: {
    code: string;
    startDate: string;
    endDate: string;
  }): Promise<Series[]> {
    const query = `
      SELECT 
        id,
        obs_time,
        internal_series_code,
        value,
        unit,
        frequency,
        collection_date,
        created_at,
        updated_at
      FROM series
      WHERE internal_series_code = $1
        AND obs_time >= $2::timestamptz
        AND obs_time <= $3::timestamptz
      ORDER BY obs_time ASC
    `;

    const rows = await databaseClient.query<SeriesDbEntity>(query, [
      params.code,
      new Date(params.startDate),
      new Date(params.endDate),
    ]);

    return rows.map((row) => seriesAdapter.toDomain(row));
  }
}

export const defaultSeriesRepository = new PostgresSeriesRepository();


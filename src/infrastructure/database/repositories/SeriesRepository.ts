// file: src/infrastructure/database/repositories/SeriesRepository.ts

import { SeriesRepository } from "@/domain/interfaces/series.repository.interface";
import { Series } from "@/domain/entities/Series";
import { SeriesWithVariation } from "@/domain/entities/SeriesWithVariation";
import { databaseClient } from "@/infrastructure/database";
import {
  seriesAdapter,
  SeriesDbEntity,
  SeriesWithVariationDbEntity,
} from "./adapters/SeriesAdapter";

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

  async findLatestByCode(code: string): Promise<Series | null> {
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
      ORDER BY obs_time DESC
      LIMIT 1
    `;

    const rows = await databaseClient.query<SeriesDbEntity>(query, [code]);

    if (rows.length === 0) {
      return null;
    }

    return seriesAdapter.toDomain(rows[0]);
  }

  async findLatestWithVariationByCode(
    code: string
  ): Promise<SeriesWithVariation | null> {
    // Query que calcula la variación directamente en SQL
    // Para series diarias (D): compara con el último valor del día anterior
    // Para series mensuales (M): compara con el último valor del mes anterior
    const query = `
      WITH latest_record AS (
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
        ORDER BY obs_time DESC
        LIMIT 1
      ),
      previous_record_daily AS (
        SELECT 
          value AS previous_value,
          obs_time AS previous_obs_time
        FROM series
        WHERE internal_series_code = $1
          AND DATE(obs_time) < DATE((SELECT obs_time FROM latest_record))
        ORDER BY obs_time DESC
        LIMIT 1
      ),
      previous_record_monthly AS (
        SELECT 
          value AS previous_value,
          obs_time AS previous_obs_time
        FROM series
        WHERE internal_series_code = $1
          AND DATE_TRUNC('month', obs_time) < DATE_TRUNC('month', (SELECT obs_time FROM latest_record))
        ORDER BY obs_time DESC
        LIMIT 1
      ),
      previous_record_other AS (
        SELECT 
          value AS previous_value,
          obs_time AS previous_obs_time
        FROM series
        WHERE internal_series_code = $1
          AND obs_time < (SELECT obs_time FROM latest_record)
        ORDER BY obs_time DESC
        LIMIT 1
      ),
      previous_record AS (
        SELECT 
          COALESCE(
            CASE WHEN (SELECT frequency FROM latest_record) = 'D' THEN (SELECT previous_value FROM previous_record_daily) END,
            CASE WHEN (SELECT frequency FROM latest_record) = 'M' THEN (SELECT previous_value FROM previous_record_monthly) END,
            (SELECT previous_value FROM previous_record_other)
          ) AS previous_value,
          COALESCE(
            CASE WHEN (SELECT frequency FROM latest_record) = 'D' THEN (SELECT previous_obs_time FROM previous_record_daily) END,
            CASE WHEN (SELECT frequency FROM latest_record) = 'M' THEN (SELECT previous_obs_time FROM previous_record_monthly) END,
            (SELECT previous_obs_time FROM previous_record_other)
          ) AS previous_obs_time
      )
      SELECT 
        lr.id,
        lr.obs_time,
        lr.internal_series_code,
        lr.value,
        lr.unit,
        lr.frequency,
        lr.collection_date,
        lr.created_at,
        lr.updated_at,
        CASE 
          WHEN lr.frequency IN ('M', 'D') AND pr.previous_value IS NOT NULL 
          THEN lr.value - pr.previous_value 
          ELSE NULL 
        END AS change,
        CASE 
          WHEN lr.unit = 'pct' THEN NULL
          WHEN lr.frequency IN ('M', 'D') AND pr.previous_value IS NOT NULL AND pr.previous_value != 0
          THEN ((lr.value - pr.previous_value) / pr.previous_value) * 100
          ELSE NULL 
        END AS change_percent,
        pr.previous_value,
        pr.previous_obs_time
      FROM latest_record lr
      CROSS JOIN previous_record pr
    `;

    const rows = await databaseClient.query<SeriesWithVariationDbEntity>(
      query,
      [code]
    );

    if (rows.length === 0) {
      return null;
    }

    return seriesAdapter.toDomainWithVariation(rows[0]);
  }
}

export const defaultSeriesRepository = new PostgresSeriesRepository();


-- file: src/infrastructure/database/migrations/001_create_series_table.sql

CREATE TABLE IF NOT EXISTS series (
  id SERIAL PRIMARY KEY,
  obs_time TIMESTAMPTZ NOT NULL,
  internal_series_code VARCHAR(255) NOT NULL,
  value NUMERIC(20, 6) NOT NULL,
  unit VARCHAR(100) NOT NULL,
  frequency VARCHAR(10) NOT NULL,
  collection_date TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (internal_series_code, obs_time)
);

CREATE INDEX IF NOT EXISTS idx_series_internal_series_code ON series(internal_series_code);
CREATE INDEX IF NOT EXISTS idx_series_obs_time ON series(obs_time);
CREATE INDEX IF NOT EXISTS idx_series_collection_date ON series(collection_date);


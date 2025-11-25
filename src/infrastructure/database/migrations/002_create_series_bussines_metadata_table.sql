-- file: src/infrastructure/database/migrations/002_create_series_bussines_metadata_table.sql

CREATE TABLE IF NOT EXISTS series_bussines_metadata (
  id SERIAL PRIMARY KEY,
  internal_series_code VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_series_bussines_metadata_internal_series_code 
  ON series_bussines_metadata(internal_series_code);


-- file: src/infrastructure/database/migrations/006_add_source_to_series_bussines_metadata.sql

-- Add source column
ALTER TABLE series_bussines_metadata
ADD COLUMN IF NOT EXISTS source VARCHAR(255);

-- Populate existing records with BCRA source
UPDATE series_bussines_metadata
SET source = 'Banco Central de la República Argentina (BCRA)'
WHERE source IS NULL;


-- file: src/infrastructure/database/migrations/003_add_methodology_to_series_bussines_metadata.sql

-- Add UNIQUE constraint if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'series_bussines_metadata_internal_series_code_key'
  ) THEN
    ALTER TABLE series_bussines_metadata
    ADD CONSTRAINT series_bussines_metadata_internal_series_code_key 
    UNIQUE (internal_series_code);
  END IF;
END $$;

-- Add methodology column
ALTER TABLE series_bussines_metadata
ADD COLUMN IF NOT EXISTS methodology TEXT;


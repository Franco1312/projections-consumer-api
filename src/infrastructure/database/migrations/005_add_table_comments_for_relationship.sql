-- file: src/infrastructure/database/migrations/005_add_table_comments_for_relationship.sql

-- Add comments to document the logical relationship between tables
COMMENT ON TABLE series IS 'Stores time series data points. Each record represents a value at a specific observation time (obs_time) for a series code (internal_series_code).';
COMMENT ON COLUMN series.internal_series_code IS 'Business identifier for the series. Relates to series_bussines_metadata.internal_series_code for JOIN operations.';

COMMENT ON TABLE series_bussines_metadata IS 'Stores business metadata for series codes. One record per internal_series_code with description and methodology.';
COMMENT ON COLUMN series_bussines_metadata.internal_series_code IS 'Business identifier for the series. Used to JOIN with series.internal_series_code. This column is UNIQUE, representing one metadata record per series code.';


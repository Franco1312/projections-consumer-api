-- file: src/infrastructure/database/migrations/011_add_title_to_series_bussines_metadata.sql

-- Add title column to store human-readable name of the series
ALTER TABLE series_bussines_metadata
ADD COLUMN IF NOT EXISTS title VARCHAR(255);

COMMENT ON COLUMN series_bussines_metadata.title IS 'Human-readable name of the series (e.g., "Reservas internacionales" for BCRA_RESERVAS_USD_M_D)';

-- Update existing records with titles based on SERIES_DISPLAY_NAMES mapping
UPDATE series_bussines_metadata
SET title = 'Base Monetaria'
WHERE internal_series_code = 'BCRA_BASE_MONETARIA_TOTAL_ARS_BN_D';

UPDATE series_bussines_metadata
SET title = 'Reservas Internacionales'
WHERE internal_series_code = 'BCRA_RESERVAS_USD_M_D';

UPDATE series_bussines_metadata
SET title = 'Billetes y monedas en manos del público'
WHERE internal_series_code = 'BCRA_CIRCULANTE_PUBLICO_ARS_BN_D';

UPDATE series_bussines_metadata
SET title = 'IPC Mensual'
WHERE internal_series_code = 'INDEC_IPC_VARIACION_MENSUAL_PCT_M';

UPDATE series_bussines_metadata
SET title = 'IPC Interanual'
WHERE internal_series_code = 'INDEC_IPC_VARIACION_INTERANUAL_PCT_M';

UPDATE series_bussines_metadata
SET title = 'EMAE Original'
WHERE internal_series_code = 'INDEC_EMAE_ORIGINAL_IDX_M';

UPDATE series_bussines_metadata
SET title = 'EMAE Desestacionalizada'
WHERE internal_series_code = 'INDEC_EMAE_DESESTACIONALIZADA_IDX_M';

UPDATE series_bussines_metadata
SET title = 'EMAE Tendencia-Ciclo'
WHERE internal_series_code = 'INDEC_EMAE_TENDENCIA_CICLO_IDX_M';

UPDATE series_bussines_metadata
SET title = 'EMAE Variación Interanual'
WHERE internal_series_code = 'INDEC_EMAE_ORIGINAL_VARIACION_INTERANUAL_PCT_M';


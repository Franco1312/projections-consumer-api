-- file: src/infrastructure/database/migrations/007_seed_indec_series_metadata.sql

INSERT INTO series_bussines_metadata (internal_series_code, description, methodology, source)
VALUES
  (
    'INDEC_IPC_VARIACION_MENSUAL_PCT_M',
    'La variación mensual del IPC muestra el cambio porcentual del nivel general de precios respecto del mes anterior.',
    'Este indicador refleja la inflación mensual informada directamente por el INDEC, basada en el relevamiento y seguimiento de precios representativos del consumo de los hogares en todo el país.',
    'Instituto Nacional de Estadística y Censos (INDEC)'
  ),
  (
    'INDEC_IPC_VARIACION_INTERANUAL_PCT_M',
    'La variación interanual del IPC muestra el cambio porcentual acumulado del nivel general de precios durante los últimos doce meses.',
    'Este indicador representa la inflación anual informada por el INDEC y se obtiene a partir del análisis del comportamiento de los precios relevados durante un año completo en el índice de precios al consumidor.',
    'Instituto Nacional de Estadística y Censos (INDEC)'
  )
ON CONFLICT (internal_series_code) DO NOTHING;


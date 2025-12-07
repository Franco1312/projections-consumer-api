-- file: src/infrastructure/database/migrations/008_seed_indec_emae_series_metadata.sql

INSERT INTO series_bussines_metadata (internal_series_code, description, methodology, source)
VALUES
  (
    'INDEC_EMAE_ORIGINAL_IDX_M',
    'El EMAE en su serie original mide el nivel mensual de la actividad económica total del país sin ajustes estacionales.',
    'Este índice refleja el comportamiento bruto de la actividad económica considerando la producción de los principales sectores. Los valores corresponden a la serie original del Estimador Mensual de Actividad Económica (EMAE) publicada por el INDEC, sin depuración de variaciones estacionales.',
    'Instituto Nacional de Estadística y Censos (INDEC)'
  ),
  (
    'INDEC_EMAE_DESESTACIONALIZADA_IDX_M',
    'El EMAE desestacionalizado muestra el nivel de actividad económica con los efectos estacionales eliminados.',
    'Esta serie aplica métodos estadísticos para depurar patrones estacionales propios de cada mes, permitiendo comparar la evolución de la economía mes a mes sin influencia de factores estacionales. Es la serie utilizada para análisis de corto plazo.',
    'Instituto Nacional de Estadística y Censos (INDEC)'
  ),
  (
    'INDEC_EMAE_TENDENCIA_CICLO_IDX_M',
    'El EMAE tendencia-ciclo representa la evolución suavizada de la actividad económica en el mediano plazo.',
    'La serie tendencia-ciclo se obtiene aplicando técnicas de filtrado estadístico sobre la serie desestacionalizada, eliminando fluctuaciones de corto plazo y resaltando la tendencia estructural del nivel de actividad. Es útil para evaluar el rumbo general de la economía.',
    'Instituto Nacional de Estadística y Censos (INDEC)'
  ),
  (
    'INDEC_EMAE_ORIGINAL_VARIACION_INTERANUAL_PCT_M',
    'La variación interanual del EMAE muestra el cambio porcentual de la actividad económica respecto al mismo mes del año anterior.',
    'El cálculo compara el valor de la serie original del EMAE con el del mismo mes del año previo. Este indicador permite evaluar la recuperación o caída de la actividad en términos anuales y es uno de los más utilizados en análisis macroeconómico.',
    'Instituto Nacional de Estadística y Censos (INDEC)'
  ),
  (
    'INDEC_EMAE_DESESTACIONALIZADA_VARIACION_MENSUAL_PCT_M',
    'La variación mensual del EMAE desestacionalizado indica el cambio porcentual de la actividad económica respecto al mes anterior.',
    'Se calcula sobre la serie desestacionalizada del EMAE para reflejar la evolución real de la actividad entre dos meses consecutivos. Este indicador es clave para identificar aceleraciones o desaceleraciones de corto plazo en la economía.',
    'Instituto Nacional de Estadística y Censos (INDEC)'
  ),
  (
    'INDEC_EMAE_TENDENCIA_CICLO_VARIACION_MENSUAL_PCT_M',
    'La variación mensual del EMAE tendencia-ciclo mide el cambio porcentual suavizado de la actividad respecto al mes previo.',
    'Este indicador se calcula sobre la serie tendencia-ciclo, la cual filtra fluctuaciones de corto plazo. Permite evaluar si la tendencia económica subyacente se acelera o desacelera de forma estructural.',
    'Instituto Nacional de Estadística y Censos (INDEC)'
  )
ON CONFLICT (internal_series_code) DO NOTHING;


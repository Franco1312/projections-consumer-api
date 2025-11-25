-- file: src/infrastructure/database/migrations/004_seed_series_bussines_metadata.sql

INSERT INTO series_bussines_metadata (internal_series_code, description, methodology)
VALUES
  (
    'BCRA_BASE_MONETARIA_TOTAL_ARS_BN_D',
    'La Base Monetaria representa el total de billetes y monedas en circulación más los depósitos de los bancos en el Banco Central',
    'La Base Monetaria es un agregado monetario que incluye el efectivo en circulación y los depósitos de los bancos en el Banco Central de la República Argentina.'
  ),
  (
    'BCRA_RESERVAS_USD_M_D',
    'Las Reservas Internacionales representan los activos externos disponibles para uso inmediato del Banco Central, incluyendo divisas, oro y otros activos líquidos.',
    'Las Reservas Internacionales incluyen divisas extranjeras, oro monetario, derechos especiales de giro (DEG) y la posición de reserva del país en el Fondo Monetario Internacional.'
  ),
  (
    'BCRA_CIRCULANTE_PUBLICO_ARS_BN_D',
    'El Circulante Público representa el total de billetes y monedas en manos del público, excluyendo el efectivo en poder de los bancos.',
    'El Circulante Público es la parte de la Base Monetaria que corresponde al efectivo (billetes y monedas) que está en poder de las personas y empresas, fuera del sistema bancario.'
  )
ON CONFLICT (internal_series_code) DO NOTHING;


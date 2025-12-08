-- file: src/infrastructure/database/migrations/012_seed_usd_series_metadata.sql

INSERT INTO series_bussines_metadata (internal_series_code, title, description, methodology, source)
VALUES
  (
    'USD_OFICIAL_COMPRA_PESOSxUSD_D',
    'Dólar Oficial (Compra)',
    'Cotización comprador del dólar oficial en el mercado regulado.',
    'Representa el precio al que bancos y casas de cambio adquieren dólares en el mercado oficial. No incluye impuestos ni percepciones adicionales.',
    'Mercado de cambios oficial (Bancos / BCRA)'
  ),
  (
    'USD_OFICIAL_VENTA_PESOSxUSD_D',
    'Dólar Oficial (Venta)',
    'Cotización vendedor del dólar oficial en el mercado regulado.',
    'Es el precio de venta del dólar en bancos y casas de cambio dentro del mercado oficial. No incluye recargos impositivos.',
    'Mercado de cambios oficial (Bancos / BCRA)'
  ),
  (
    'USD_MAYORISTA_COMPRA_PESOSxUSD_D',
    'Dólar Mayorista (Compra)',
    'Cotización comprador del dólar mayorista operado entre grandes participantes del mercado.',
    'Surge de operaciones mayoristas y refleja el valor al que bancos y grandes empresas compran dólares en el mercado de cambios regulado.',
    'Mercado de cambios mayorista (BCRA / MAE)'
  ),
  (
    'USD_MAYORISTA_VENTA_PESOSxUSD_D',
    'Dólar Mayorista (Venta)',
    'Cotización vendedor del dólar mayorista.',
    'Es el valor al que bancos y grandes empresas venden dólares en el mercado mayorista. Se forma durante la operatoria cambiaria diaria.',
    'Mercado de cambios mayorista (BCRA / MAE)'
  ),
  (
    'USD_TARJETA_COMPRA_PESOSxUSD_D',
    'Dólar Tarjeta (Compra)',
    'Valor aplicado a consumos en moneda extranjera realizados con tarjetas de crédito o débito.',
    'Corresponde al dólar oficial más impuestos y percepciones vigentes aplicadas a consumos en moneda extranjera.',
    'AFIP / Mercado oficial'
  ),
  (
    'USD_TARJETA_VENTA_PESOSxUSD_D',
    'Dólar Tarjeta (Venta)',
    'Cotización final del dólar para pagos con tarjeta en moneda extranjera.',
    'Incluye el precio del dólar oficial más impuestos como PAIS y percepciones a cuenta de Ganancias y Bienes Personales.',
    'AFIP / Mercado oficial'
  ),
  (
    'USD_BOLSA_COMPRA_PESOSxUSD_D',
    'Dólar Bolsa (MEP) Compra',
    'Cotización MEP en su valor comprador.',
    'Se determina mediante operaciones de compra de bonos en pesos y posterior venta en dólares en el mercado local. Representa un tipo de cambio financiero libre.',
    'Mercado financiero argentino (BYMA / ALyCs)'
  ),
  (
    'USD_BOLSA_VENTA_PESOSxUSD_D',
    'Dólar Bolsa (MEP) Venta',
    'Cotización MEP en su valor vendedor.',
    'Surge de la venta de bonos en pesos y compra del mismo activo en dólares. Representa el tipo de cambio al que se pueden vender bonos dolarizados.',
    'Mercado financiero argentino (BYMA / ALyCs)'
  ),
  (
    'USD_CONTADOCONLIQUI_COMPRA_PESOSxUSD_D',
    'Dólar CCL (Compra)',
    'Cotización comprador del dólar Contado con Liquidación.',
    'Deriva de la compra de activos en pesos y su venta en dólares en mercados internacionales, permitiendo girar divisas al exterior.',
    'Mercado financiero argentino e internacional'
  ),
  (
    'USD_CONTADOCONLIQUI_VENTA_PESOSxUSD_D',
    'Dólar CCL (Venta)',
    'Cotización vendedor del dólar Contado con Liquidación.',
    'Surge de la compra de activos dolarizados en el exterior y su venta en pesos en Argentina, reflejando un tipo de cambio financiero libre.',
    'Mercado financiero argentino e internacional'
  ),
  (
    'USD_BLUE_COMPRA_PESOSxUSD_D',
    'Dólar Blue (Compra)',
    'Cotización comprador del dólar en el mercado informal.',
    'Se obtiene de relevamientos de operadores informales y cuevas. No está regulado ni supervisado por organismos oficiales.',
    'Mercado informal'
  ),
  (
    'USD_BLUE_VENTA_PESOSxUSD_D',
    'Dólar Blue (Venta)',
    'Cotización vendedor del dólar en el mercado informal.',
    'Se basa en encuestas a operadores del circuito informal, reflejando oferta y demanda fuera del mercado regulado.',
    'Mercado informal'
  ),
  (
    'USD_CRIPTO_COMPRA_PESOSxUSD_D',
    'Dólar Cripto (Compra)',
    'Precio comprador obtenido a partir de la operatoria de criptoactivos convertidos a dólares.',
    'Se estima desde el valor de stablecoins o activos dolarizados negociados contra pesos en exchanges locales.',
    'Exchanges de criptomonedas'
  ),
  (
    'USD_CRIPTO_VENTA_PESOSxUSD_D',
    'Dólar Cripto (Venta)',
    'Precio vendedor basado en la conversión de criptoactivos a dólares en el mercado cripto local.',
    'Surge del precio de venta de stablecoins o activos dolarizados contra pesos en plataformas de intercambio locales.',
    'Exchanges de criptomonedas'
  )
ON CONFLICT (internal_series_code) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  methodology = EXCLUDED.methodology,
  source = EXCLUDED.source,
  updated_at = NOW();


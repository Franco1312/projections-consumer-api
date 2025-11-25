// file: src/infrastructure/http/swagger/schemas/get-series-with-metadata.schema.ts

export const getSeriesWithMetadataParamsSchema = {
  type: "object",
  required: ["code"],
  properties: {
    code: {
      type: "string",
      description: "The internal series code",
      example: "BCRA_BASE_MONETARIA_TOTAL_ARS_BN_D",
    },
  },
};

export const seriesWithMetadataSchema = {
  type: "object",
  properties: {
    internal_series_code: {
      type: "string",
      example: "BCRA_BASE_MONETARIA_TOTAL_ARS_BN_D",
    },
    description: {
      type: "string",
      nullable: true,
      example: "La Base Monetaria representa el total de billetes y monedas en circulación más los depósitos de los bancos en el Banco Central",
    },
    methodology: {
      type: "string",
      nullable: true,
      example: "La Base Monetaria es un agregado monetario que incluye el efectivo en circulación y los depósitos de los bancos en el Banco Central de la República Argentina.",
    },
    source: {
      type: "string",
      nullable: true,
      example: "Banco Central de la República Argentina (BCRA)",
    },
  },
};

export const getSeriesWithMetadataResponseSchema = {
  type: "object",
  properties: {
    success: {
      type: "boolean",
      example: true,
    },
    data: seriesWithMetadataSchema,
  },
};

export const seriesNotFoundResponseSchema = {
  type: "object",
  properties: {
    success: {
      type: "boolean",
      example: false,
    },
    message: {
      type: "string",
      example: "Series metadata not found",
    },
  },
};


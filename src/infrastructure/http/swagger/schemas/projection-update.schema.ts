// file: src/infrastructure/http/swagger/schemas/projection-update.schema.ts

export const projectionUpdateSchema = {
  type: "object",
  required: ["event", "dataset_id", "bucket", "version_manifest_path", "projections_path"],
  properties: {
    event: {
      type: "string",
      enum: ["projection_update"],
      example: "projection_update",
    },
    dataset_id: {
      type: "string",
      example: "bcra_infomondia_series",
    },
    bucket: {
      type: "string",
      example: "ingestor-datasets",
    },
    version_manifest_path: {
      type: "string",
      example: "datasets/bcra_infomondia_series/versions/v20251111_014138_730866/manifest.json",
    },
    projections_path: {
      type: "string",
      example: "datasets/bcra_infomondia_series/projections/",
    },
  },
};

export const projectionUpdateResponseSchema = {
  type: "object",
  properties: {
    success: {
      type: "boolean",
      example: true,
    },
    message: {
      type: "string",
      example: "Projection update event processed successfully",
    },
  },
};

export const validationErrorResponseSchema = {
  type: "object",
  properties: {
    success: {
      type: "boolean",
      example: false,
    },
    message: {
      type: "string",
      example: "Validation error",
    },
    errors: {
      type: "array",
      items: {
        type: "object",
        properties: {
          code: { type: "string" },
          path: { type: "array", items: { type: "string" } },
          message: { type: "string" },
        },
      },
    },
  },
};

export const internalErrorResponseSchema = {
  type: "object",
  properties: {
    success: {
      type: "boolean",
      example: false,
    },
    message: {
      type: "string",
      example: "Internal server error",
    },
  },
};


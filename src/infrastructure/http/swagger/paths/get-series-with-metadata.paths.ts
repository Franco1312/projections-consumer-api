// file: src/infrastructure/http/swagger/paths/get-series-with-metadata.paths.ts

import {
  getSeriesWithMetadataResponseSchema,
  seriesNotFoundResponseSchema,
} from "../schemas/get-series-with-metadata.schema";
import {
  validationErrorResponseSchema,
  internalErrorResponseSchema,
} from "../schemas/projection-update.schema";

export const getSeriesWithMetadataPaths = {
  "/api/v1/series/{code}/metadata": {
    get: {
      tags: ["Series"],
      summary: "Get series metadata by code",
      description: "Retrieves the business metadata (description and methodology) for a specific series code",
      parameters: [
        {
          name: "code",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
          description: "The internal series code",
          example: "BCRA_BASE_MONETARIA_TOTAL_ARS_BN_D",
        },
      ],
      responses: {
        "200": {
          description: "Series metadata retrieved successfully",
          content: {
            "application/json": {
              schema: getSeriesWithMetadataResponseSchema,
            },
          },
        },
        "400": {
          description: "Validation error",
          content: {
            "application/json": {
              schema: validationErrorResponseSchema,
            },
          },
        },
        "404": {
          description: "Series not found",
          content: {
            "application/json": {
              schema: seriesNotFoundResponseSchema,
            },
          },
        },
        "500": {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: internalErrorResponseSchema,
            },
          },
        },
      },
    },
  },
};


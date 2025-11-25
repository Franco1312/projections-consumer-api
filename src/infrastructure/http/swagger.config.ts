// file: src/infrastructure/http/swagger.config.ts

import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import { config } from "@/config";
import { projectionUpdatePaths } from "./swagger/paths/projection-update.paths";
import { getSeriesWithMetadataPaths } from "./swagger/paths/get-series-with-metadata.paths";
import {
  projectionUpdateSchema,
  projectionUpdateResponseSchema,
  validationErrorResponseSchema,
  internalErrorResponseSchema,
} from "./swagger/schemas/projection-update.schema";
import {
  seriesWithMetadataSchema,
  getSeriesWithMetadataResponseSchema,
  seriesNotFoundResponseSchema,
} from "./swagger/schemas/get-series-with-metadata.schema";

const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Projections Consumer API",
    version: "1.0.0",
    description: "API for processing projection update events",
  },
  servers: [
    {
      url: `http://localhost:${config.port}`,
      description: "Local development server",
    },
  ],
  paths: {
    ...projectionUpdatePaths,
    ...getSeriesWithMetadataPaths,
  },
  components: {
    schemas: {
      ProjectionUpdate: projectionUpdateSchema,
      ProjectionUpdateResponse: projectionUpdateResponseSchema,
      ValidationErrorResponse: validationErrorResponseSchema,
      InternalErrorResponse: internalErrorResponseSchema,
      SeriesWithMetadata: seriesWithMetadataSchema,
      GetSeriesWithMetadataResponse: getSeriesWithMetadataResponseSchema,
      SeriesNotFoundResponse: seriesNotFoundResponseSchema,
    },
  },
};

export function setupSwagger(app: Express): void {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}


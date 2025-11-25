// file: src/infrastructure/http/swagger/paths/projection-update.paths.ts

import {
  projectionUpdateSchema,
  projectionUpdateResponseSchema,
  validationErrorResponseSchema,
  internalErrorResponseSchema,
} from "../schemas/projection-update.schema";

export const projectionUpdatePaths = {
  "/api/v1/projections/update": {
    post: {
      summary: "Process a projection update event",
      tags: ["Projections"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: projectionUpdateSchema,
          },
        },
      },
      responses: {
        "200": {
          description: "Projection update processed successfully",
          content: {
            "application/json": {
              schema: projectionUpdateResponseSchema,
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


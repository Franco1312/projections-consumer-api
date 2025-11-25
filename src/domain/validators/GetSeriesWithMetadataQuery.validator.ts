// file: src/domain/validators/GetSeriesWithMetadataParams.validator.ts

import { z } from "zod";

export const GetSeriesWithMetadataParamsSchema = z.object({
  code: z.string().min(1, "Series code is required"),
});

export type GetSeriesWithMetadataParams = z.infer<
  typeof GetSeriesWithMetadataParamsSchema
>;


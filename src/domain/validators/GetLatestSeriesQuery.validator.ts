// file: src/domain/validators/GetLatestSeriesQuery.validator.ts

import { z } from "zod";

export const GetLatestSeriesQuerySchema = z.object({
  code: z.string().min(1, "Code is required"),
});

export type GetLatestSeriesQuery = z.infer<typeof GetLatestSeriesQuerySchema>;


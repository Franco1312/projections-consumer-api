// file: src/domain/validators/CreateSeries.validator.ts

import { z } from "zod";

const dateTimeSchema = z.string().refine(
  (val) => {
    const date = new Date(val);
    return !isNaN(date.getTime());
  },
  { message: "Must be a valid ISO 8601 datetime" }
);

export const CreateSeriesSchema = z.object({
  obs_time: dateTimeSchema,
  internal_series_code: z.string().min(1, "Internal series code is required"),
  value: z.number(),
  unit: z.string().min(1, "Unit is required"),
  frequency: z.string().min(1, "Frequency is required"),
  collection_date: dateTimeSchema,
});

export type CreateSeriesInput = z.infer<typeof CreateSeriesSchema>;


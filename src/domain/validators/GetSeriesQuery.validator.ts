// file: src/domain/validators/GetSeriesQuery.validator.ts

import { z } from "zod";

const dateTimeSchema = z.string().refine(
  (val) => {
    const date = new Date(val);
    return !isNaN(date.getTime());
  },
  { message: "Must be a valid ISO 8601 datetime" }
);

export const GetSeriesQuerySchema = z.object({
  code: z.string().min(1, "Code is required"),
  startDate: dateTimeSchema,
  endDate: dateTimeSchema,
});

export type GetSeriesQuery = z.infer<typeof GetSeriesQuerySchema>;


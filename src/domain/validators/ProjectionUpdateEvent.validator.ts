// file: src/domain/validators/ProjectionUpdateEvent.validator.ts

import { z } from "zod";

export const ProjectionUpdateEventSchema = z.object({
  event: z.literal("projection_update"),
  dataset_id: z.string().min(1),
  bucket: z.string().min(1),
  version_manifest_path: z.string().min(1),
  projections_path: z.string().min(1),
});

export type ProjectionUpdateEventInput = z.infer<
  typeof ProjectionUpdateEventSchema
>;


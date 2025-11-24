// file: src/domain/events/ProjectionUpdateEvent.ts

export interface ProjectionUpdateEvent {
  event: "projection_update";
  dataset_id: string;
  bucket: string;
  version_manifest_path: string;
  projections_path: string;
}


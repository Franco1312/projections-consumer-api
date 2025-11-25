// file: src/application/use-cases/ProcessProjectionUpdate.use-case.ts

import { ProjectionUpdateEvent } from "@/domain/events/ProjectionUpdateEvent";
import { logger } from "@/infrastructure/logger/PinoLogger";
import { LOG_EVENTS } from "@/infrastructure/logger/LOG_EVENTS";

export class ProcessProjectionUpdateUseCase {
  async execute(event: ProjectionUpdateEvent): Promise<void> {
    logger.info({
      event: LOG_EVENTS.PROJECTION_UPDATE_RECEIVED,
      msg: "Processing projection update event",
      data: {
        datasetId: event.dataset_id,
        bucket: event.bucket,
        versionManifestPath: event.version_manifest_path,
        projectionsPath: event.projections_path,
      },
    });

    // TODO: Implement business logic here
    // - Read manifest from S3
    // - Process projections
    // - Store in database
  }
}


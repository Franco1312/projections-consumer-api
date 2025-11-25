// file: src/application/use-cases/ProcessProjectionUpdate.use-case.ts

import { ProjectionUpdateEvent } from "@/domain/events/ProjectionUpdateEvent";
import { VersionManifest } from "@/domain/manifests/VersionManifest";
import { Series } from "@/domain/entities/Series";
import { SeriesRepository } from "@/domain/interfaces/series.repository.interface";
import { S3Service } from "@/domain/interfaces/s3.interface";
import { SeriesDataFile } from "@/domain/interfaces/series-data.interface";
import { logger } from "@/infrastructure/logger/PinoLogger";
import { LOG_EVENTS } from "@/infrastructure/logger/LOG_EVENTS";
import { s3Service as defaultS3Service } from "@/infrastructure/s3";
import { seriesRepository as defaultSeriesRepository } from "@/infrastructure/database/repositories";

export class ProcessProjectionUpdateUseCase {
  constructor(
    private readonly s3Service: S3Service = defaultS3Service,
    private readonly seriesRepository: SeriesRepository = defaultSeriesRepository
  ) {}

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

    const manifest = await this.readManifest(event);
    const allSeries = await this.processJsonFiles(event, manifest);
    await this.saveSeries(allSeries);
  }

  private async readManifest(
    event: ProjectionUpdateEvent
  ): Promise<VersionManifest> {
    const manifest = await this.s3Service.getObjectAsJson<VersionManifest>({
      bucket: event.bucket,
      key: event.version_manifest_path,
    });

    logger.info({
      event: LOG_EVENTS.MANIFEST_READ,
      msg: "Manifest read successfully",
      data: {
        versionId: manifest.version_id,
        jsonFilesCount: manifest.json_files.length,
      },
    });

    return manifest;
  }

  private async processJsonFiles(
    event: ProjectionUpdateEvent,
    manifest: VersionManifest
  ): Promise<Series[]> {
    const processPromises = manifest.json_files.map((jsonFile) =>
      this.processJsonFile(event, jsonFile)
    );

    const results = await Promise.allSettled(processPromises);
    const allSeries: Series[] = [];

    for (const result of results) {
      if (result.status === "fulfilled") {
        allSeries.push(...result.value);
      }
    }

    return allSeries;
  }

  private async processJsonFile(
    event: ProjectionUpdateEvent,
    jsonFile: string
  ): Promise<Series[]> {
    const fullPath = this.buildJsonFilePath(event.projections_path, jsonFile);

    try {
      const series = await this.s3Service.getObjectAsJson<SeriesDataFile>({
        bucket: event.bucket,
        key: fullPath,
      });

      logger.info({
        event: LOG_EVENTS.JSON_FILE_PROCESSED,
        msg: "JSON file processed successfully",
        data: {
          jsonFile,
          seriesCount: series.length,
        },
      });

      return series;
    } catch (error) {
      logger.error({
        event: LOG_EVENTS.JSON_FILE_ERROR,
        msg: `Error processing JSON file: ${jsonFile}`,
        err: error,
        data: { jsonFile, fullPath, bucket: event.bucket },
      });
      return [];
    }
  }

  private buildJsonFilePath(
    projectionsPath: string,
    jsonFile: string
  ): string {
    return `${projectionsPath}${jsonFile}`;
  }

  private async saveSeries(series: Series[]): Promise<void> {
    if (series.length === 0) {
      logger.info({
        event: LOG_EVENTS.SERIES_SAVED,
        msg: "No series to save",
      });
      return;
    }

    await this.seriesRepository.insertMany(series);

    logger.info({
      event: LOG_EVENTS.SERIES_SAVED,
      msg: "Series saved to database",
      data: {
        totalSeries: series.length,
      },
    });
  }
}

export const defaultProcessProjectionUpdateUseCase = new ProcessProjectionUpdateUseCase();

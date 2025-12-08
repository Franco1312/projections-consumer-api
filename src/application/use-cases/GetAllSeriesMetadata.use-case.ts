// file: src/application/use-cases/GetAllSeriesMetadata.use-case.ts

import { SeriesWithMetadata } from "@/domain/entities/SeriesWithMetadata";
import { SeriesBusinessMetadataRepository } from "@/domain/interfaces/series-business-metadata.repository.interface";
import { seriesBusinessMetadataRepository as defaultSeriesBusinessMetadataRepository } from "@/infrastructure/database/repositories";

export class GetAllSeriesMetadataUseCase {
  constructor(
    private readonly seriesBusinessMetadataRepository: SeriesBusinessMetadataRepository = defaultSeriesBusinessMetadataRepository
  ) {}

  async execute(): Promise<SeriesWithMetadata[]> {
    return this.seriesBusinessMetadataRepository.findAll();
  }
}

export const defaultGetAllSeriesMetadataUseCase = new GetAllSeriesMetadataUseCase();


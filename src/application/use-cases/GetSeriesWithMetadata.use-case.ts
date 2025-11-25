// file: src/application/use-cases/GetSeriesWithMetadata.use-case.ts

import { SeriesWithMetadata } from "@/domain/entities/SeriesWithMetadata";
import { SeriesBusinessMetadataRepository } from "@/domain/interfaces/series-business-metadata.repository.interface";
import { seriesBusinessMetadataRepository as defaultSeriesBusinessMetadataRepository } from "@/infrastructure/database/repositories";

export class GetSeriesWithMetadataUseCase {
  constructor(
    private readonly seriesBusinessMetadataRepository: SeriesBusinessMetadataRepository = defaultSeriesBusinessMetadataRepository
  ) {}

  async execute(code: string): Promise<SeriesWithMetadata | null> {
    return this.seriesBusinessMetadataRepository.findByCode(code);
  }
}

export const defaultGetSeriesWithMetadataUseCase = new GetSeriesWithMetadataUseCase();


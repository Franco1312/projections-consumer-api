// file: src/domain/interfaces/series-business-metadata.repository.interface.ts

import { SeriesWithMetadata } from "@/domain/entities/SeriesWithMetadata";

export interface SeriesBusinessMetadataRepository {
  findByCode(code: string): Promise<SeriesWithMetadata | null>;
  findAll(): Promise<SeriesWithMetadata[]>;
}


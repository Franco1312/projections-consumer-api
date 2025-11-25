// file: src/infrastructure/database/repositories/index.ts

import { defaultSeriesRepository } from "./SeriesRepository";
import { defaultSeriesBusinessMetadataRepository } from "./SeriesBusinessMetadataRepository";

export const seriesRepository = defaultSeriesRepository;
export const seriesBusinessMetadataRepository = defaultSeriesBusinessMetadataRepository;


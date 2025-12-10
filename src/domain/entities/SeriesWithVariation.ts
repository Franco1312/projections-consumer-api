// file: src/domain/entities/SeriesWithVariation.ts

import { Series } from "./Series";

export interface SeriesWithVariation extends Series {
  change?: number; // Cambio absoluto respecto al período anterior
  change_percent?: number; // Cambio porcentual respecto al período anterior
  previous_value?: number; // Valor del período anterior (opcional, para referencia)
  previous_obs_time?: string; // Fecha del período anterior (opcional)
}


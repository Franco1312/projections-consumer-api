// file: src/domain/manifests/VersionManifest.ts

export interface DateRange {
  min_obs_time: string;
  max_obs_time: string;
}

export interface VersionManifest {
  version_id: string;
  dataset_id: string;
  created_at: string;
  collection_date: string;
  data_points_count: number;
  series_count: number;
  series_codes: string[];
  date_range: DateRange;
  json_files: string[];
  partitions: string[];
  partition_strategy: string;
}


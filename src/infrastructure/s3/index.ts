// file: src/infrastructure/s3/index.ts

import { S3Client } from "./S3Client";
import { config } from "@/config";

export const s3Service = new S3Client(config.s3.region);


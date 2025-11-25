// file: src/infrastructure/s3/S3Client.ts

import { S3Client as AWSS3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { S3Service } from "@/domain/interfaces/s3.interface";
import { config } from "@/config";

class S3Client implements S3Service {
  private client: AWSS3Client;

  constructor(region: string) {
    this.client = new AWSS3Client({
      region,
      credentials: process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
        ? {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          }
        : undefined,
    });
  }

  async getObject(params: { bucket: string; key: string }): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: params.bucket,
      Key: params.key,
    });

    const response = await this.client.send(command);

    if (!response.Body) {
      throw new Error(`Object not found: ${params.bucket}/${params.key}`);
    }

    const streamToString = (stream: any): Promise<string> => {
      return new Promise((resolve, reject) => {
        const chunks: Uint8Array[] = [];
        stream.on("data", (chunk: Uint8Array) => chunks.push(chunk));
        stream.on("error", reject);
        stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
      });
    };

    return streamToString(response.Body);
  }

  async getObjectAsJson<T = unknown>(params: {
    bucket: string;
    key: string;
  }): Promise<T> {
    const content = await this.getObject(params);
    return JSON.parse(content) as T;
  }
}

export const defaultS3Client = new S3Client(config.s3.region);


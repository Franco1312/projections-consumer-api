// file: src/domain/interfaces/s3.interface.ts

export interface S3Service {
  getObject(params: {
    bucket: string;
    key: string;
  }): Promise<string>;

  getObjectAsJson<T = unknown>(params: {
    bucket: string;
    key: string;
  }): Promise<T>;
}


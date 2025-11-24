// file: src/infrastructure/events/sqs/ProjectionUpdatesConsumer.ts

import { Consumer } from "sqs-consumer";
import { SQSClient, Message } from "@aws-sdk/client-sqs";
import { config } from "@/config";
import { logger } from "@/infrastructure/logger/PinoLogger";
import { LOG_EVENTS } from "@/infrastructure/logger/LOG_EVENTS";

export function createProjectionUpdatesConsumer(): Consumer | null {
  if (!config.sqs.enabled) {
    logger.info({
      event: LOG_EVENTS.SQS_CONSUMER_DISABLED,
      msg: "SQS Consumer is disabled",
    });
    return null;
  }

  const sqsClient = new SQSClient({
    region: config.sqs.region,
    credentials: process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
      ? {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        }
      : undefined,
  });

  const consumer = Consumer.create({
    queueUrl: config.sqs.projectionUpdatesConsumerUrl,
    sqs: sqsClient,
    handleMessage: async (message: Message) => {
      logger.info({
        event: LOG_EVENTS.SQS_MESSAGE_RECEIVED,
        msg: "Received message from SQS",
        data: {
          body: message.Body,
        },
      });
    },
  });

  consumer.on("error", (err: Error) => {
    logger.error({
      event: LOG_EVENTS.SQS_CONSUMER_ERROR,
      msg: "SQS Consumer error",
      err,
    });
  });

  consumer.on("processing_error", (err: Error) => {
    logger.error({
      event: LOG_EVENTS.SQS_PROCESSING_ERROR,
      msg: "SQS Consumer processing error",
      err,
    });
  });

  return consumer;
}


// file: src/infrastructure/http/ExpressServer.ts

import { Express } from "express";
import { createApp } from "@/app";

export function createExpressServer(): Express {
  return createApp();
}


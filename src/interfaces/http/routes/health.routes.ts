// file: src/interfaces/http/routes/health.routes.ts

import { Router } from "express";
import { getHealth } from "@/interfaces/http/controllers/HealthController";

export function registerHealthRoutes(router: Router): void {
  router.get("/health", getHealth);
}


// file: src/infrastructure/http/middleware/validation.middleware.ts

import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import { logger } from "@/infrastructure/logger/PinoLogger";
import { LOG_EVENTS } from "@/infrastructure/logger/LOG_EVENTS";

type ValidationTarget = "body" | "query" | "params";

export function validate(schema: ZodSchema, target: ValidationTarget = "body") {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const data =
        target === "body"
          ? req.body
          : target === "query"
          ? req.query
          : req.params;
      const validated = schema.parse(data);

      if (target === "body") {
        req.body = validated;
      } else if (target === "query") {
        req.query = validated as any;
      } else {
        req.params = validated as any;
      }
      
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        logger.error({
          event: LOG_EVENTS.VALIDATION_ERROR,
          msg: `Validation error in request ${target}`,
          err: error,
          data: {
            [target]:
              target === "body"
                ? req.body
                : target === "query"
                ? req.query
                : req.params,
            issues: error.issues,
          },
        });

        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.issues,
        });
        return;
      }

      next(error);
    }
  };
}


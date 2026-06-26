import express from "express";
import { z } from "zod";
import { ValidationError } from "../errors/ValidationError.ts";

export const validateSchema = (schema: z.ZodSchema) =>
    (req: express.Request, res: express.Response, next: express.NextFunction) => {

        const result: z.ZodSafeParseResult<unknown> = schema.safeParse(req.body);

        if (!result.success) {
            throw new ValidationError(result.error);
        }

        req.body = result.data;
        next();
    };
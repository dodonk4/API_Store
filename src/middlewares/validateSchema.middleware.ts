import express from "express";
import { z } from "zod";

export const validateSchema = (schema: z.ZodSchema) =>
    (req: express.Request, res: express.Response, next: express.NextFunction) => {

        const result: z.ZodSafeParseResult<unknown> = schema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                errors: z.treeifyError(result.error),
            });
        }

        req.body = result.data;
        next();
    };
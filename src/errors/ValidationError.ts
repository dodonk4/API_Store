import { AppError } from "./AppError.ts";
import { ZodError } from "zod";

export class ValidationError extends AppError {
    constructor(error: ZodError) {
        super("Validation failed", 400, error.issues);
    }
}
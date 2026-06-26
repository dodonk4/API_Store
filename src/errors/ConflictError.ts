import { AppError } from "./AppError.ts";

export class ConflictError extends AppError {
    constructor(message = "Conflict", details?: unknown) {
        super(message, 409, details);
    }
}
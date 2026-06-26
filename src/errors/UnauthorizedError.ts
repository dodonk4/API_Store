import { AppError } from "./AppError.ts";

export class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized", details?: unknown) {
        super(message, 401, details);
    }
}
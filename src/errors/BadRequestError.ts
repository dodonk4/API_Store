import { AppError } from "./AppError.ts";

export class BadRequestError extends AppError {
    constructor(message = "Bad Request", details?: unknown) {
        super(message, 400, details);
    }
}
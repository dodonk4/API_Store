import express from 'express';
import { AppError } from '../errors/AppError.ts';

export function errorHandler(
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {

    if (err.code) {//Para ver el codigo de errores de Prisma
        console.log("Error code: ", err.code);
    }


    const statusCode =
        err instanceof AppError
            ? err.statusCode
            : 500;

    const message =
        err instanceof AppError
            ? err.message
            : "Internal Server Error";

    if (statusCode == 500) {
        console.error({
            message: err.message,
            stack: err.stack,
            path: req.path,
            method: req.method
        });
    }

    return res.status(statusCode).json({
        success: false,
        message
    });
}
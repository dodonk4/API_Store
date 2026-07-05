import express from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.config.ts';
import { UnauthorizedError } from '../errors/UnauthorizedError.ts';

export function validateRefreshToken(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        if (!req.cookies?.refresh_token) {
            throw new UnauthorizedError("Acceso denegado: debe haber un usuario logueado");
        }

        const payload: string | jwt.JwtPayload = jwt.verify(req.cookies.refresh_token, authConfig.refresh_secret);

        if (!payload || typeof payload === "string") {
            throw new UnauthorizedError("El refreshToken falla en su verificación");
        }

        next();

    } catch (error: any) {
        if (error.name === "TokenExpiredError" ||
            error.name === "JsonWebTokenError" ||
            error.name === "NotBeforeError"
        ) {
            res.status(401).json({ error: 'Refresh token inválido o expirado' });
        } else {
            next(error);
        }
    }
}
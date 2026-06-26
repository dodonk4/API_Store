import express from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.config.ts';
import { UnauthorizedError } from '../errors/UnauthorizedError.ts';

interface AuthPayload extends jwt.JwtPayload {
    id: number;
    email: string;
    rol: "USER" | "ADMIN";
}

export function validateAccessToken(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        if (!req.cookies?.access_token) {
            throw new UnauthorizedError("Acceso denegado: debe haber un usuario logueado");
        }

        const payload: string | jwt.JwtPayload = jwt.verify(req.cookies.access_token, authConfig.secret);

        if (!payload || typeof payload === "string") {
            throw new UnauthorizedError("El accessToken falla en su verificación");
        }

        //Se lo forza a esta interfaz, porque sé que el access_token llega así
        req.user = payload as AuthPayload;

        next();

    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ error: 'El access_token a expirado' });
        } else {
            next(error);
        }
    }
}
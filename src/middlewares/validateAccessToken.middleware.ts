import express from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.config.ts';
import * as AuthRequest from '../interfaces/AuthRequest.ts';

interface AuthPayload extends jwt.JwtPayload {
    id: number;
    email: string;
    rol: "USER" | "ADMIN";
}

interface AuthRequestPayload extends express.Request{
    user: AuthPayload
}

export function validateAccessToken(req: AuthRequestPayload, res: express.Response, next: express.NextFunction) {
    try {
        if (!req.cookies?.access_token) {
            const error: any = new Error("Acceso denegado: debe haber un usuario logueado");
            error.status = 401;
            throw error;
        }

        const payload: string | jwt.JwtPayload = jwt.verify(req.cookies.access_token, authConfig.secret);

        if (!payload || typeof payload === "string") {
            throw new Error("El accessToken falla en su verificación");
        }

        //Se lo forza a esta interfaz, porque sé que el acces_token llega así
        req.user = payload as AuthPayload;

        next();

    } catch (error: any) {
        console.log(error);
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ error: 'El access_token a expirado' });
        } else {
            res.status(error.status).json({ error: error.message });
        }

    }
}
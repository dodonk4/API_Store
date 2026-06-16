import express from 'express';
import jwt from 'jsonwebtoken';
import * as AuthRequest from '../interfaces/AuthRequest.ts';
import authConfig from '../config/auth.config.ts';

//IDEAL: export function validateAccessToken(req: AuthRequest.default, res: express.Response, next: express.NextFunction){
export function validateAccessToken(req: any, res: express.Response, next: express.NextFunction) {
    try {
        if (!req.cookies?.access_token) {
            const error: any = new Error("Acceso denegado: debe haber un usuario logueado");
            error.status = 401;
            throw error;
        }

        const payload = jwt.verify(req.cookies.access_token, authConfig.secret);

        if (!payload) {
            throw new Error("El accessToken falla en su verificación");
        }

        req.user = payload;

        next();

    } catch (error: any) {
        console.log(error);
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ error: 'El access_token a expirado' });
        }else{
            res.status(error.status).json({ error: error.message });
        }
        
    }
}
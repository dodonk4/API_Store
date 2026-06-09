import express from 'express';
import jwt from 'jsonwebtoken';
import * as AuthRequest from '../interfaces/AuthRequest.ts';

//IDEAL: export function validateAccessToken(req: AuthRequest.default, res: express.Response, next: express.NextFunction){
export function validateAccessToken(req: any, res: express.Response, next: express.NextFunction){
    try {
        if(!req.cookies?.access_token){
            const error: any = new Error("Acceso denegado: debe haber un usuario logueado");
            error.status = 401;
            throw error;
        }

        const payload = jwt.verify(req.cookies.access_token, process.env.AUTH_SECRET as string);

        if(!payload){
            throw new Error("El accessToken falla en su verificación");
        }

        req.user = payload;

        next();

    } catch (error: any) {
        console.log(error);
        res.status(error.status).json({error: error.message}); 
    }
}
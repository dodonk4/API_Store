import express from 'express';
import jwt from 'jsonwebtoken';

export function validateAccessToken(req: express.Request, res: express.Response, next: express.NextFunction){
    try {
        if(!req.cookies?.access_token){
            const error: any = new Error("Acceso denegado: debe haber un usuario logueado");
            error.status = 401;
            throw error;
        }

        const verify = jwt.verify(req.cookies.access_token, process.env.AUTH_SECRET as string);

        if(!verify){
            throw new Error("El accessToken falla en su verificación");
        }

        next();

    } catch (error: any) {
        console.log(error);
        res.status(error.status).json({error: error.message}); 
    }
}
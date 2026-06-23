import express from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth.config.ts';

export function logout(req: express.Request, res: express.Response) {
    try {
        if(!req.cookies?.access_token){
            throw new Error("No hay usuario logueado para desloguearse");
        }

        const accessTokenDecrypted: jwt.JwtPayload = jwt.verify(req.cookies.access_token, authConfig.secret) as jwt.JwtPayload;

        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        
        res.status(200).json({
            message: `Usuario ${accessTokenDecrypted.username} deslogueado exitosamente`
        })

    } catch (error: any) {
        res.status(404).json({error: error.message}); 
    }
}
import express from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth.config.ts';
import { UnauthorizedError } from '../../errors/UnauthorizedError.ts';

export function logout(req: express.Request, res: express.Response) {

    // const refreshToken: string = req.cookies.refresh_token;

    // if (!refreshToken) {
    //     throw new UnauthorizedError("No hay usuario logueado para desloguearse");
    // }
    
    const accessTokenDecrypted: jwt.JwtPayload = jwt.verify(req.cookies.refresh_token, authConfig.refresh_secret) as jwt.JwtPayload;

    res.clearCookie("access_token");
    res.clearCookie("refresh_token");

    res.status(200).json({
        message: `Usuario ${accessTokenDecrypted.id} deslogueado exitosamente`
    })

}
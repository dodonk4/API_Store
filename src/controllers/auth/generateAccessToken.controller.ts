import express from 'express';
import jwt from 'jsonwebtoken';
import generateAccessToken from '../../utils/jwt/accessToken.utils.ts';
import { findUserById } from '../../services/users.service.ts';
import authConfig from '../../config/auth.config.ts';
import type { UserData } from '../../interfaces/User.interface.ts';
import { UnauthorizedError } from '../../errors/UnauthorizedError.ts';

export async function generateAccessTokenForLoggedUser(req: express.Request, res: express.Response, next: express.NextFunction) {

    try {

        const refreshToken: string = req.cookies.refresh_token;

        res.clearCookie('access_token', { httpOnly: true, secure: true });
        
        const userDecoded: jwt.JwtPayload | string | null = jwt.verify(refreshToken, authConfig.refresh_secret);

        if (!userDecoded || typeof userDecoded === "string") {
            throw new UnauthorizedError("El refreshToken no cuenta con información de usuario para poder generar el access token");
        }

        const userFound: UserData = await findUserById(userDecoded.id);

        const accessToken: string = generateAccessToken(userFound);

        res.cookie('access_token', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000 //15m
        })

        res.send("Access token actualizado");

    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            throw new UnauthorizedError("El refresh_token a expirado");
        } else {
            next(error);
        }

    }

}
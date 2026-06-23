import express from 'express';
import jwt from 'jsonwebtoken';
import generateAccessToken from '../../utils/jwt/accessToken.utils.ts';
import { findUsuarioById } from '../../services/usuarios.service.ts';
import authConfig from '../../config/auth.config.ts';
import type { UsuarioData } from '../../interfaces/Usuario.interface.ts';

export async function generateAccessTokenForLoggedUser(req: express.Request, res: express.Response) {

    try {
        res.clearCookie('access_token', { httpOnly: true, secure: true });
        const refreshToken: string = req.cookies.refresh_token;
        const userDecoded: jwt.JwtPayload | string | null = jwt.verify(refreshToken, authConfig.refresh_secret);

        if (!userDecoded || typeof userDecoded === "string") {
            throw new Error("El refreshToken no cuenta con información de usuario para poder generar el access token");
        }

        const userFound: UsuarioData = await findUsuarioById(userDecoded.id);

        const accessToken: string = generateAccessToken(userFound);

        res.cookie('access_token', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000 //15m
        })

        res.send("Access token actualizado");

    } catch (error: any) {
        console.log(error);
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ error: 'El refresh_token a expirado' });
        } else {
            res.status(500).json({ error });
        }

    }

}
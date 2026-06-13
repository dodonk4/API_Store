import express from 'express';
import jwt from 'jsonwebtoken';
import generateAccessToken from '../../utils/jwt/accessToken.utils.ts';
import { findUsuarioById } from '../../services/usuarios.service.ts';

export async function generateAccessTokenForLoggedUser(req: express.Request, res: express.Response){
    //Si hay usuario logueado y coincide con el refresh token, se hace una accessToken
    //Si el user tiene un token refresh guardado, es que estaba logueado
    //Si un usuario no tiene un token refrsh guardado, es que no estaba logueado

    //Y como se sabe que usuario buscar? Si estaba en el access token
    //No se va a buscar a todos los usuarios para ver cual tiene un refrsh token, porque puede haber varios
    //con varias sesiones iniciadas

    try {
        //Validaciones
        //El refresh token no está vencido
        res.clearCookie('access_token', { httpOnly: true, secure: true });
        const refreshToken = req.cookies.refresh_token;
        const userDecoded: jwt.JwtPayload | string | null = jwt.decode(refreshToken);

        if(!userDecoded || typeof userDecoded === "string"){
            throw new Error("El refreshToken no cuenta con información de usuario para poder generar el access token");
        }

        const userFound = await findUsuarioById(userDecoded.id);

        const accessToken = generateAccessToken(userFound);

        res.cookie('access_token', accessToken,{
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000 //15m
        })

        res.send("Access token actualizado");

    } catch (error) {
        console.log(error);
        res.json({error}); 
    }

}
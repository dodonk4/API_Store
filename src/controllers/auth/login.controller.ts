import express from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../../lib/prisma.ts';
import Usuario from '../../models/Usuario.model.ts';
import * as UsuarioData from '../../interfaces/Usuario.interface.ts';
import generateRefreshToken from '../../utils/jwt/refreshToken.utils.ts';
import generateAccessToken from '../../utils/jwt/accessToken.utils.ts';

export async function login(req: express.Request, res: express.Response) {
    try {
        const { email, password } = req.body;
        //Corroborar que el body sea valido
        if (!req.body.password) {
            throw new Error("Se debe ingresar una contraseña");
        }

        if (!req.body.email) {
            throw new Error("Se debe ingresar un correo electrónico");
        }

        const user: UsuarioData.default | null = await prisma.usuarios.findUnique({ where: { email } });

        if (!user || !user.id) {//Pongo acá !user.id porque sino cuando llamo a Usuario.upadte, da error por no saber si existe o no
            throw new Error("No existe un usuario con ese correo electrónico");
        }

        //Corroborar que la password coincida
        const isMatch = bcrypt.compareSync(password, user?.password);

        if (!isMatch) {
            throw new Error("La contaseña es incorrecta");
        }

        //Crear refreshToken

        const refreshToken = generateRefreshToken(user);//Paso el user y no el user.id, porque seguro más adelante pase roles o algo más en el token

        Usuario.update(user.id, { refreshToken }, (err: Error | null, usuario: any) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(200).json(usuario);
        });


        //Crear accessToken

        const accessToken = generateAccessToken(user);
        //Guardar refreshToken y accesToken en cookies

        res.cookie('access_token', accessToken, {
            httpOnly: true,     // Block JavaScript access
            secure: true,       // Force HTTPS protocol
            sameSite: 'strict', // Mitigate CSRF attacks
            maxAge: 15 * 60 * 1000 // Short expiration (e.g., 15 minutes)
        });
    } catch (error: any) {
        console.log(error);
        res.json({error: error.message}); 
    }

}
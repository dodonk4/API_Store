import express from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../../lib/prisma.ts';
import { updateUsuario } from '../../services/usuarios.service.ts';
import type { UsuarioData } from '../../interfaces/Usuario.interface.ts';
import generateRefreshToken from '../../utils/jwt/refreshToken.utils.ts';
import generateAccessToken from '../../utils/jwt/accessToken.utils.ts';
import * as AuthRequest from '../../interfaces/AuthRequest.ts';
import { NotFoundError } from '../../errors/NotFoundError.ts';
import { UnauthorizedError } from '../../errors/UnauthorizedError.ts';

type LoginBody = {
    email: string,
    password: string,
}

export async function login(req: express.Request, res: express.Response) {

    const { email, password }: LoginBody = req.body;

    const user: UsuarioData | null = await prisma.usuarios.findUnique({ where: { email } });

    if (!user) {
        throw new NotFoundError("No existe un usuario con ese correo electrónico");
    }

    const isMatch: boolean = bcrypt.compareSync(password, user?.password);

    if (!isMatch) {
        throw new UnauthorizedError("La contaseña es incorrecta");
    }

    const refreshToken: string = generateRefreshToken(user);
    const accessToken: string = generateAccessToken(user);

    res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        // secure: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict', // Mitigate CSRF attacks
        maxAge: 24 * 60 * 60 * 1000
    });

    res.cookie('access_token', accessToken, {
        httpOnly: true,
        // secure: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict', // Mitigate CSRF attacks
        maxAge: 15 * 60 * 1000
    });

    const usuario: UsuarioData = await updateUsuario(user.id, { refreshToken });
    res.status(200).json(usuario);

}
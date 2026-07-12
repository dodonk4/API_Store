import express from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../../lib/prisma.ts';
import { createUser } from '../../services/users.service.ts';
import type { CreateUserData, UserData } from '../../interfaces/User.interface.ts';
import { UnauthorizedError } from '../../errors/UnauthorizedError.ts';
import { ConflictError } from '../../errors/ConflictError.ts';

type RegisterBody = {
    email: string,
    username: string,
    password: string,
    password_confirmation: string
}

export async function register(req: express.Request, res: express.Response) {

    const { email, username, password, password_confirmation }: RegisterBody = req.body;

    if (password != password_confirmation) {
        throw new UnauthorizedError("La confirmación de la contraseña no coincide");
    }

    const user: UserData | null = await prisma.users.findUnique({ where: { email: email } })

    if (user) {
        throw new ConflictError("El email no está disponible");
    }

    const saltRounds: number = 12;
    const hashedPassword: string = await bcrypt.hash(password, saltRounds);
    const data: CreateUserData = {
        username,
        email,
        password: hashedPassword,
        refreshToken: null,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    const userRegistered: UserData = await createUser(data);
    res.status(201).json(userRegistered);


}
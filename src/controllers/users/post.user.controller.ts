import express from 'express';
import { createUser } from '../../services/users.service.ts';
import type { CreateUserData, UserData, UserResponse } from '../../interfaces/User.interface.ts';
import { prisma } from '../../lib/prisma.ts';
import { ConflictError } from '../../errors/ConflictError.ts';
import bcrypt from 'bcryptjs';

export default async function postUser(req: express.Request, res: express.Response): Promise<void | express.Response> {
  //El body ya es controlado por zod

  const { email, username, password } = req.body;

    const userFound: UserData | null = await prisma.users.findUnique({ where: { email: email } })

    if (userFound) {
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

    const userResponse: UserResponse = {
        id: userRegistered.id,
        username: userRegistered.username,
        email: userRegistered.email,
        rol: userRegistered.rol,
        createdAt: userRegistered.createdAt,
        updatedAt: userRegistered.updatedAt
    };


  res.status(201).json(userResponse);

}

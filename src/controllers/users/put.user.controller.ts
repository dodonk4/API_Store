import express from 'express';
import { updateUser } from '../../services/users.service.ts';
import type { UserData } from '../../interfaces/User.interface.ts';
import { BadRequestError } from '../../errors/BadRequestError.ts';
import bcrypt from 'bcryptjs';

interface PutUserBody {
  username?: string,
  email?: string,
  password?: string,
}

export default async function putUser(req: express.Request, res: express.Response): Promise<void | express.Response> {
  const id: number = parseInt(req.params.userId as string);

  if (!Number.isInteger(id)) {
    throw new BadRequestError("El id debe ser un numero");
  }

  let { username, email, password }: PutUserBody = req.body;

  if (!username && !email && !password) {
    throw new BadRequestError("Nombre, email o password es requerido");
  }

  if (password) {
    const saltRounds: number = 12;
    password = await bcrypt.hash(password, saltRounds);
  }

  const updateData = {
    ...(username !== undefined && { username }),
    ...(email !== undefined && { email }),
    ...(password !== undefined && { password }),
  };

  const user: UserData = await updateUser(id, updateData);
  res.json(user);

}

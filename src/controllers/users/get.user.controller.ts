import express from 'express';
import { findAllUsers, findUserById } from '../../services/users.service.ts';
import type { UserData } from '../../interfaces/User.interface.ts';
import { BadRequestError } from '../../errors/BadRequestError.ts';

async function getAllUsers(req: express.Request, res: express.Response): Promise<void> {

  const users: UserData[] = await findAllUsers();
  res.json(users || []);

}

async function getUserById(req: express.Request, res: express.Response): Promise<void> {
  const id: number = parseInt(req.params.userId as string);

  if (!Number.isInteger(id)) {
    throw new BadRequestError("El id debe ser un numero");
  }

  const user: UserData = await findUserById(id);
  res.json(user);

}

export { getAllUsers, getUserById };


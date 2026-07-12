import express from 'express';
import { createUser } from '../../services/users.service.ts';
import type { UserData } from '../../interfaces/User.interface.ts';

export default async function postUser(req: express.Request, res: express.Response): Promise<void | express.Response> {
  //El body ya es controlado por zod
  const user: UserData = await createUser(req.body);
  res.status(201).json(user);

}

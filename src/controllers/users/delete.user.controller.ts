import express from 'express';
import { deleteUserService } from '../../services/users.service.ts';
import { BadRequestError } from '../../errors/BadRequestError.ts';

export default async function deleteUser(req: express.Request, res: express.Response): Promise<void> {
  const id: number = parseInt(req.params.userId as string);

  if (!Number.isInteger(id)) {
    throw new BadRequestError("El id debe ser un numero");
  }

  await deleteUserService(id);
  res.status(204).send();

}

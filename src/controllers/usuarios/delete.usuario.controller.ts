import express from 'express';
import { deleteUsuarioService } from '../../services/usuarios.service.ts';
import { BadRequestError } from '../../errors/BadRequestError.ts';

export default async function deleteUsuario(req: express.Request, res: express.Response): Promise<void> {
  const id: number = parseInt(req.params.usuarioId as string);

  if (!Number.isInteger(id)) {
    throw new BadRequestError("El id debe ser un numero");
  }

  await deleteUsuarioService(id);
  res.status(204).send();

}

import express from 'express';
import { deleteUsuarioService } from '../../services/usuarios.service.ts';

export default async function deleteUsuario(req: express.Request, res: express.Response): Promise<void> {
  const id: number = parseInt(req.params.usuarioId as string);
  
  await deleteUsuarioService(id);
  res.status(204).send();

}

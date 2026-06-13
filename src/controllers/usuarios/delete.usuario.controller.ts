import express from 'express';
import { deleteUsuarioService } from '../../services/usuarios.service.ts';

export default async function deleteUsuario(req: express.Request, res: express.Response): Promise<void> {
  const id = parseInt(req.params.usuarioId as string);
  try {
    await deleteUsuarioService(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

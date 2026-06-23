import express from 'express';
import { deleteUsuarioService } from '../../services/usuarios.service.ts';

export default async function deleteUsuario(req: express.Request, res: express.Response): Promise<void> {
  const id: number = parseInt(req.params.usuarioId as string);
  try {
    await deleteUsuarioService(id);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: (error as Error).message });
  }
}

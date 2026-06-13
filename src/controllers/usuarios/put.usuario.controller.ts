import express from 'express';
import { updateUsuario } from '../../services/usuarios.service.ts';

export default async function putUsuario(req: express.Request, res: express.Response): Promise<void | express.Response> {
  const id = parseInt(req.params.usuarioId as string);
  const { nombre, email } = req.body;
  if (!nombre && !email) {
    return res.status(400).json({ error: 'Nombre o email es requerido' });
  }
  try {
    const usuario = await updateUsuario(id, req.body);
    res.json(usuario);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}

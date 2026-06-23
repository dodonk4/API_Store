import express from 'express';
import { updateUsuario } from '../../services/usuarios.service.ts';
import type { UsuarioData } from '../../interfaces/Usuario.interface.ts';

interface PutUsuarioBody {
  nombre?: string,
  email?: string
}

export default async function putUsuario(req: express.Request, res: express.Response): Promise<void | express.Response> {
  const id: number = parseInt(req.params.usuarioId as string);
  const { nombre, email }: PutUsuarioBody = req.body;
  if (!nombre && !email) {
    return res.status(400).json({ error: 'Nombre o email es requerido' });
  }
  try {
    const usuario: UsuarioData = await updateUsuario(id, req.body);
    res.json(usuario);
  } catch (error: any) {
    return res.status(500).json({ error: (error as Error).message });
  }
}

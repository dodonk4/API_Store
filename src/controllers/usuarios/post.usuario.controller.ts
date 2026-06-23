import express from 'express';
import { createUsuario } from '../../services/usuarios.service.ts';
import type { UsuarioData } from '../../interfaces/Usuario.interface.ts';

interface PostUsuarioBody {
  nombre: string,
  email: string
}

export default async function postUsuario(req: express.Request, res: express.Response): Promise<void | express.Response> {
  const { nombre, email }: PostUsuarioBody = req.body;
  if (!nombre || !email) {
    return res.status(400).json({ error: 'Nombre y email son requeridos' });
  }
  try {
    const usuario: UsuarioData = await createUsuario(req.body);
    res.status(201).json(usuario);
  } catch (error: any) {
    return res.status(500).json({ error: (error as Error).message });
  }
}

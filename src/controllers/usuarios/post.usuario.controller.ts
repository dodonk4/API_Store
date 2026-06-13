import express from 'express';
import { createUsuario } from '../../services/usuarios.service.ts';

export default async function postUsuario(req: express.Request, res: express.Response): Promise<void | express.Response> {
  const { nombre, email } = req.body;
  if (!nombre || !email) {
    return res.status(400).json({ error: 'Nombre y email son requeridos' });
  }
  try {
    const usuario = await createUsuario(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}

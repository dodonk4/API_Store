import express from 'express';
import { createUsuario } from '../../services/users.service.ts';
import type { UsuarioData } from '../../interfaces/User.interface.ts';

export default async function postUsuario(req: express.Request, res: express.Response): Promise<void | express.Response> {
  //El body ya es controlado por zod
  const usuario: UsuarioData = await createUsuario(req.body);
  res.status(201).json(usuario);

}

import express from 'express';
import { updateUsuario } from '../../services/usuarios.service.ts';
import type { UsuarioData } from '../../interfaces/Usuario.interface.ts';
import { BadRequestError } from '../../errors/BadRequestError.ts';

interface PutUsuarioBody {
  nombre?: string,
  email?: string
}

export default async function putUsuario(req: express.Request, res: express.Response): Promise<void | express.Response> {
  const id: number = parseInt(req.params.usuarioId as string);
  const { nombre, email }: PutUsuarioBody = req.body;

  if (!nombre && !email) {
    throw new BadRequestError("Nombre o email es requerido");
  }

  const usuario: UsuarioData = await updateUsuario(id, req.body);
  res.json(usuario);

}

import express from 'express';
import { updateUsuario } from '../../services/usuarios.service.ts';
import type { UsuarioData } from '../../interfaces/Usuario.interface.ts';
import { BadRequestError } from '../../errors/BadRequestError.ts';
import bcrypt from 'bcryptjs';

interface PutUsuarioBody {
  username?: string,
  email?: string,
  password?: string,
}

export default async function putUsuario(req: express.Request, res: express.Response): Promise<void | express.Response> {
  const id: number = parseInt(req.params.usuarioId as string);

  if (!Number.isInteger(id)) {
    throw new BadRequestError("El id debe ser un numero");
  }

  let { username, email, password }: PutUsuarioBody = req.body;

  if (!username && !email && !password) {
    throw new BadRequestError("Nombre, email o password es requerido");
  }

  if (password) {
    const saltRounds: number = 12;
    password = await bcrypt.hash(password, saltRounds);
  }

  const updateData = {
    ...(username !== undefined && { username }),
    ...(email !== undefined && { email }),
    ...(password !== undefined && { password }),
  };

  const usuario: UsuarioData = await updateUsuario(id, updateData);
  res.json(usuario);

}

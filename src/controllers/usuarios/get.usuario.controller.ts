import express from 'express';
import { findAllUsuarios, findUsuarioById } from '../../services/users.service.ts';
import type { UsuarioData } from '../../interfaces/User.interface.ts';
import { BadRequestError } from '../../errors/BadRequestError.ts';

async function getAllUsuarios(req: express.Request, res: express.Response): Promise<void> {

  const usuarios: UsuarioData[] = await findAllUsuarios();
  res.json(usuarios || []);

}

async function getUsuarioById(req: express.Request, res: express.Response): Promise<void> {
  const id: number = parseInt(req.params.usuarioId as string);

  if (!Number.isInteger(id)) {
    throw new BadRequestError("El id debe ser un numero");
  }

  const usuario: UsuarioData = await findUsuarioById(id);
  res.json(usuario);

}

export { getAllUsuarios, getUsuarioById };


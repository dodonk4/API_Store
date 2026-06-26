import express from 'express';
import { findAllUsuarios, findUsuarioById } from '../../services/usuarios.service.ts';
import type { UsuarioData } from '../../interfaces/Usuario.interface.ts';

async function getAllUsuarios(req: express.Request, res: express.Response): Promise<void> {

  const usuarios: UsuarioData[] = await findAllUsuarios();
  res.json(usuarios || []);

}

async function getUsuarioById(req: express.Request, res: express.Response): Promise<void> {
  const id: number = parseInt(req.params.usuarioId as string);

  const usuario: UsuarioData = await findUsuarioById(id);
  res.json(usuario);

}

export { getAllUsuarios, getUsuarioById };


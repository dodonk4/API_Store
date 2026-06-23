import express from 'express';
import { findAllUsuarios, findUsuarioById } from '../../services/usuarios.service.ts';
import type { UsuarioData } from '../../interfaces/Usuario.interface.ts';

async function getAllUsuarios(req: express.Request, res: express.Response): Promise<void> {
  try {
    const usuarios: UsuarioData[] = await findAllUsuarios();
    res.json(usuarios || []);
  } catch (error: any) {
    res.status(500).json({ error: (error as Error).message });
  }
}

async function getUsuarioById(req: express.Request, res: express.Response): Promise<void> {
  const id: number = parseInt(req.params.usuarioId as string);
  try {
    const usuario: UsuarioData = await findUsuarioById(id);
    res.json(usuario);
  } catch (error: any) {
    res.status(500).json({ error: (error as Error).message });
  }
}

export {
  getAllUsuarios,
  getUsuarioById,
};


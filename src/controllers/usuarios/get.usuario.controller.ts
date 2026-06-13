import express from 'express';
import { findAllUsuarios, findUsuarioById } from '../../services/usuarios.service.ts';

async function getAllUsuarios(req: express.Request, res: express.Response): Promise<void> {
  try {
    const usuarios = await findAllUsuarios();
    res.json(usuarios || []);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

async function getUsuarioById(req: express.Request, res: express.Response): Promise<void> {
  const id = parseInt(req.params.usuarioId as string);
  try {
    const usuario = await findUsuarioById(id);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

export {
  getAllUsuarios,
  getUsuarioById,
};


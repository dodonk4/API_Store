import express from 'express';
import Usuario from '../../models/Usuario.model.ts';
function getAllUsuarios(req: express.Request, res: express.Response): void {
  Usuario.findAll((err : Error | null, usuarios : any) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(usuarios || []);
  });
}

function getUsuarioById(req: express.Request, res: express.Response): void {
  const id = parseInt(req.params.usuarioId as string);
  Usuario.findById(id, (err : Error | null, usuario : any) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  });
}

export {
    getAllUsuarios,
    getUsuarioById,
};


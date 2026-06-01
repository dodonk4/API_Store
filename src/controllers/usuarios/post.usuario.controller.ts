import express from 'express';
import Usuario from '../../models/Usuario.model.ts';
export default function postUsuario(req: express.Request, res: express.Response): void | express.Response {
  const { nombre, email } = req.body;
  if (!nombre || !email) {
    return res.status(400).json({ error: 'Nombre y email son requeridos' });
  }
  Usuario.create(req.body, (err : Error | null, usuario : any) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(usuario);
  });
}

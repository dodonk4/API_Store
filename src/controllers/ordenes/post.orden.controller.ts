import express from 'express';
import Orden from '../../models/Orden.model.ts';
export default function postOrden(req: express.Request, res: express.Response): void | express.Response {
  const { usuarioId, productos } = req.body;
  if (!usuarioId || !productos || !Array.isArray(productos)) {
    return res.status(400).json({ error: 'usuarioId y productos son requeridos' });
  }
  Orden.create(req.body, (err : Error | null, orden : any) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(orden);
  });
}

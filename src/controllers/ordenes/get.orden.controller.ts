import express from 'express';
import Orden from '../../models/Orden.model.ts';
function getAllOrdenes(req: express.Request, res: express.Response): void {
  Orden.findAll((err : Error | null, ordenes : any) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(ordenes || []);
  });
}

function getOrdenById(req: express.Request, res: express.Response): void {
  const id = parseInt(req.params.ordenId as string);
  Orden.findById(id, (err : Error | null, orden : any) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!orden) return res.status(404).json({ error: 'Orden no encontrada' });
    res.json(orden);
  });
}

export { getAllOrdenes, getOrdenById}


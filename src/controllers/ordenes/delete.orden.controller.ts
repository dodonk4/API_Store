import express from 'express';
import Orden from '../../models/Orden.model.ts';
export default function deleteOrden(req: express.Request, res: express.Response): void {
  const id = parseInt(req.params.ordenId as string);
  Orden.delete(id, (err : Error | null) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(204).send();
  });
}


import Producto from "../../models/Producto.model.ts";
import express from 'express';

export default function deleteProducto(req: express.Request, res: express.Response): void {
  const id = parseInt(req.params.productoId as string);
  Producto.delete(id, (err : Error | null) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(204).send();
  });
}
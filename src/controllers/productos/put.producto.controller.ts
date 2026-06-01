import Producto from "../../models/Producto.model.ts";
import express from 'express';

export default function updateProducto(req: express.Request, res: express.Response): express.Response | undefined {
  const id = parseInt(req.params.productoId as string);
  const { nombre, descripcion, precio, stock } = req.body;
  if (!nombre && precio === undefined && stock === undefined && !descripcion) {
    return res.status(400).json({ error: 'Al menos uno de los campos (nombre, descripcion, precio, stock) es requerido' });
  }
  Producto.update(id, req.body, (err : Error | null, producto : any) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(producto);
  });
}
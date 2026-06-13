import express from 'express';
import { updateProducto } from '../../services/productos.service.ts';

export default async function updateProductoController(req: express.Request, res: express.Response): Promise<express.Response | undefined> {
  const id = parseInt(req.params.productoId as string);
  const { nombre, descripcion, precio, stock } = req.body;
  if (!nombre && precio === undefined && stock === undefined && !descripcion) {
    return res.status(400).json({ error: 'Al menos uno de los campos (nombre, descripcion, precio, stock) es requerido' });
  }
  try {
    const producto = await updateProducto(id, req.body);
    return res.json(producto);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}
import express from 'express';
import { deleteProducto } from '../../services/productos.service.ts';

export default async function deleteProductoController(req: express.Request, res: express.Response): Promise<void> {
  const id: number = parseInt(req.params.productoId as string);

  await deleteProducto(id);
  res.status(204).send();

}
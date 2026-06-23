import express from 'express';
import { deleteProducto } from '../../services/productos.service.ts';

export default async function deleteProductoController(req: express.Request, res: express.Response): Promise<void> {
  const id: number = parseInt(req.params.productoId as string);
  try {
    await deleteProducto(id);
    res.status(204).send();
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: (error as Error).message });
  }
}
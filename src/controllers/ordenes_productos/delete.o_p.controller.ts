import express from 'express';
import { deleteOrdenProducto } from '../../services/ordenes_productos.service';


export default async function deleteOrdenProductoController(req: express.Request, res: express.Response): Promise<void> {
  const id = parseInt(req.params.productoId as string);
  try {
    await deleteOrdenProducto(id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: (error as Error).message });
  }
}
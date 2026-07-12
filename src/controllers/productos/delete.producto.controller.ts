import express from 'express';
import { deleteProducto } from '../../services/products.service.ts';
import { BadRequestError } from '../../errors/BadRequestError.ts';

export default async function deleteProductoController(req: express.Request, res: express.Response): Promise<void> {
  const id: number = parseInt(req.params.productoId as string);

  if (!Number.isInteger(id)) {
    throw new BadRequestError("El id debe ser un numero");
  }

  await deleteProducto(id);
  res.status(204).send();

}
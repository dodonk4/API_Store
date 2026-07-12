import express from 'express';
import { deleteProduct } from '../../services/products.service.ts';
import { BadRequestError } from '../../errors/BadRequestError.ts';

export default async function deleteProductController(req: express.Request, res: express.Response): Promise<void> {
  const id: number = parseInt(req.params.productId as string);

  if (!Number.isInteger(id)) {
    throw new BadRequestError("El id debe ser un numero");
  }

  await deleteProduct(id);
  res.status(204).send();

}
import express from 'express';
import { updateProduct } from '../../services/products.service.ts';
import { Decimal } from '@prisma/client/runtime/client';
import type { ProductData } from '../../interfaces/Product.interface.ts';
import { BadRequestError } from '../../errors/BadRequestError.ts';

type PutProductBody = {
  name?: string,
  description?: string,
  price?: Decimal,
  stock?: number,
  category?: string
}

export default async function updateProductController(req: express.Request, res: express.Response): Promise<express.Response | undefined> {

  const id: number = parseInt(req.params.productId as string);

  if (!Number.isInteger(id)) {
    throw new BadRequestError("El id debe ser un numero");
  }

  const { name, description, price, stock, category }: PutProductBody = req.body;

  if (!name && !price && !stock && !description && !category) {
    throw new BadRequestError("Al menos uno de los campos (name, description, price, stock, category) es requerido");
  }

  const product: ProductData = await updateProduct(id, req.body);
  return res.json(product);

}
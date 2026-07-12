import express from 'express';
import type { ProductData } from '../../interfaces/Product.interface.ts';
import { createProduct } from '../../services/products.service.ts';
import { Decimal } from '@prisma/client/runtime/client';

type PostProductBody = {
  name: string,
  description: string | null,
  price: Decimal,
  stock: number,
  category: string
}

async function postProduct(req: express.Request, res: express.Response): Promise<void> {
  const { name, description, price, stock, category }: PostProductBody = req.body;

  const resultProducto: ProductData = await createProduct({ name, description, stock, price, category });
  res.send(resultProducto);

}

export { postProduct }
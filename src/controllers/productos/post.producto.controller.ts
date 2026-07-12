import express from 'express';
import type { ProductoData } from '../../interfaces/Product.interface.ts';
import { createProducto } from '../../services/products.service.ts';
import { Decimal } from '@prisma/client/runtime/client';

type PostProductoBody = {
  nombre: string,
  descripcion: string | null,
  precio: Decimal,
  stock: number,
  categoria: string
}

async function postProducto(req: express.Request, res: express.Response): Promise<void> {
  const { nombre, descripcion, precio, stock, categoria }: PostProductoBody = req.body;

  const resultProducto: ProductoData = await createProducto({ nombre, descripcion, stock, precio, categoria });
  res.send(resultProducto);

}

export { postProducto }
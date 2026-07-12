import express from 'express';
import { updateProducto } from '../../services/products.service.ts';
import { Decimal } from '@prisma/client/runtime/client';
import type { ProductoData } from '../../interfaces/Product.interface.ts';
import { BadRequestError } from '../../errors/BadRequestError.ts';

type PutProductoBody = {
  nombre?: string,
  descripcion?: string,
  precio?: Decimal,
  stock?: number,
  categoria?: string
}

export default async function updateProductoController(req: express.Request, res: express.Response): Promise<express.Response | undefined> {

  const id: number = parseInt(req.params.productoId as string);

  if (!Number.isInteger(id)) {
    throw new BadRequestError("El id debe ser un numero");
  }

  const { nombre, descripcion, precio, stock, categoria }: PutProductoBody = req.body;

  if (!nombre && !precio && !stock && !descripcion && !categoria) {
    throw new BadRequestError("Al menos uno de los campos (nombre, descripcion, precio, stock, categoria) es requerido");
  }

  const producto: ProductoData = await updateProducto(id, req.body);
  return res.json(producto);

}
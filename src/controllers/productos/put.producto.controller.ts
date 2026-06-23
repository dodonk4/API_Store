import express from 'express';
import { updateProducto } from '../../services/productos.service.ts';
import { Decimal } from '@prisma/client/runtime/client';
import type { ProductoData } from '../../interfaces/Producto.interface.ts';

type PutProductoBody = {
  nombre?: string,
  descripcion?: string,
  precio?: Decimal,
  stock?: number,
  categoria?: string
}

export default async function updateProductoController(req: express.Request, res: express.Response): Promise<express.Response | undefined> {
  try {
    const id: number = parseInt(req.params.productoId as string);
    const { nombre, descripcion, precio, stock, categoria }: PutProductoBody = req.body;

    if (!nombre && !precio && !stock && !descripcion && !categoria) {
      return res.status(400).json({ error: 'Al menos uno de los campos (nombre, descripcion, precio, stock, categoria) es requerido' });
    }

    const producto: ProductoData = await updateProducto(id, req.body);
    return res.json(producto);
  } catch (error: any) {
    return res.status(500).json({ error: (error as Error).message });
  }
}
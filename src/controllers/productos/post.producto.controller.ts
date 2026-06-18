import express from 'express';
import * as ProductoData from '../../interfaces/Producto.interface.ts';
import { Prisma } from '../../../generated/prisma/client.ts';
import { createProducto, createProductosBulk } from '../../services/productos.service.ts';


async function postProducto(req: express.Request, res: express.Response): Promise<void> {
  const { nombre, descripcion, precio, stock, categoria } = req.body;

  try {
    const resultProducto: ProductoData.default = await createProducto({ nombre, descripcion, stock, precio, categoria } as ProductoData.default);
    res.send(resultProducto);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: (error as Error).message });
  }
}

async function postBulk(req: express.Request, res: express.Response): Promise<void> {
  const productos: ProductoData.default[] = req.body;

  try {
    productos.forEach(e => {
      if (!e.nombre || e.precio === undefined || e.stock === undefined) {
        return res.status(400).json({ error: 'Nombre, precio y stock son requeridos' });
      }
    });
    const resultProducto: Prisma.BatchPayload = await createProductosBulk(productos as ProductoData.default[]);
    res.send(resultProducto);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: (error as Error).message });
  }
}

export { postProducto, postBulk }
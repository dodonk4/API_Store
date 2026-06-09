import express from 'express';
import { prisma } from '../lib/prisma.ts';

export async function createOrdenesProductos(productos: any[], res: express.Response, ordenId: number, productPrices: number[]) {
  for (let i = 0; i < productos.length; i++) {
    const precio = Number(productPrices[i] ?? 0);
    const resultOrdenProducto = await prisma.ordenes_productos.create({ data: { ordenId: ordenId, productId: productos[i].id, precioUnitario: precio, cantidad: productos[i].cantidad } });
    if (!resultOrdenProducto) {
      return res.status(400).json({ error: 'Hubo un error al querer crear un registro en ordenes_productos' });
    }
  }
}
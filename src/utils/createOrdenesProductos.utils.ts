import express from 'express';
import { createOrdenProducto } from '../services/ordenes_productos.service.ts';

export async function createOrdenesProductos(productos: any[], res: express.Response, ordenId: number, productPrices: number[]) {
  for (let i = 0; i < productos.length; i++) {
    const precio = Number(productPrices[i] ?? 0);
    try {
      const resultOrdenProducto = await createOrdenProducto({ ordenId: ordenId, productId: productos[i].id, precioUnitario: precio, cantidad: productos[i].cantidad } as any);
      if (!resultOrdenProducto) {
        return res.status(400).json({ error: 'Hubo un error al querer crear un registro en ordenes_productos' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: (error as Error).message });
    }
  }
}
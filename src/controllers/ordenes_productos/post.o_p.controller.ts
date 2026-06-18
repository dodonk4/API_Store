import express from 'express';
import * as Orden_ProductoData from '../../interfaces/Orden_Producto.interface.ts';
import { createOrdenProducto } from '../../services/ordenes_productos.service.ts';


export default async function postOrdenProducto(req: express.Request, res: express.Response): Promise<void> {
  const { ordenId, productId, precioUnitario, cantidad } = req.body;
  try {
    const resultOrdenProducto: Orden_ProductoData.default = await createOrdenProducto({ ordenId, productId, precioUnitario, cantidad } as Orden_ProductoData.default);
    res.send(resultOrdenProducto);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: (error as Error).message });
  }
}
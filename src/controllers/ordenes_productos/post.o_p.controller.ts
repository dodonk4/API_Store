import express from 'express';
import type { Orden_ProductoData } from '../../interfaces/Orden_Producto.interface.ts';
import type { OrdenData } from '../../interfaces/Orden.interface.ts';
import type { ProductoData } from '../../interfaces/Producto.interface.ts';
import { createOrdenProducto } from '../../services/ordenes_productos.service.ts';
import { checkOrdenOwner } from '../../utils/checkOrdenOwner.utils.ts';
import { findProductoById } from '../../services/productos.service.ts';
import { Decimal } from '@prisma/client/runtime/client';
import { findOrdenById } from '../../services/ordenes.service.ts';
import * as AuthRequest from '../../interfaces/AuthRequest.ts';

type PostOrdenProductoBody = {
    productId: number,
    cantidad: number
}

export default async function postOrdenProducto(req: AuthRequest.default, res: express.Response): Promise<void> {
  try {
    const ordenId: number = parseInt(req.params.ordenId as string);
    const { productId, cantidad }: PostOrdenProductoBody = req.body;

    //Corrobora que el usuario tenga permisos para modificar este o_p
    //Si es de él, puede. Sino, tiene que ser un ADMIN
    await checkOrdenOwner(ordenId, req);
    const orden: OrdenData = await findOrdenById(ordenId);
    if (req.user?.rol === "USER") {
      if (orden.estado != "CARRITO") {
        throw new Error("No se puede modificar o eliminar un producto de una orden que ya no esté en carrito");
      }
    }

    const producto: ProductoData = await findProductoById(productId);

    if (!producto) {
      throw new Error("No se encuentra el producto que se quiere agregar a la orden");
    }

    const precioUnitario: Decimal = producto.precio;


    const resultOrdenProducto: Orden_ProductoData = await createOrdenProducto({ ordenId, productId, precioUnitario, cantidad });
    res.send(resultOrdenProducto);
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: (error as Error).message });
  }
}
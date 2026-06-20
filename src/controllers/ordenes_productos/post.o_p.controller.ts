import express from 'express';
import * as Orden_ProductoData from '../../interfaces/Orden_Producto.interface.ts';
import { createOrdenProducto } from '../../services/ordenes_productos.service.ts';
import { checkOrdenOwner } from '../../utils/checkOrdenOwner.utils.ts';
import { findProductoById } from '../../services/productos.service.ts';
import { Decimal } from '@prisma/client/runtime/client';
import { findOrdenById } from '../../services/ordenes.service.ts';

export default async function postOrdenProducto(req: any, res: express.Response): Promise<void> {
  try {
    const ordenId = parseInt(req.params.ordenId as string);
    const { productId, cantidad } = req.body;

    //Corrobora que el usuario tenga permisos para modificar este o_p
    //Si es de él, puede. Sino, tiene que ser un ADMIN
    await checkOrdenOwner(ordenId, req);
    const orden = await findOrdenById(ordenId);
    if (req.user.rol === "USER") {
      if (orden.estado != "CARRITO") {
        throw new Error("No se puede modificar o eliminar un producto de una orden que ya no esté en carrito");
      }
    }

    const producto = await findProductoById(productId);

    if (!producto) {
      throw new Error("No se encuentra el producto que se quiere agregar a la orden");
    }

    const precioUnitario: Decimal = producto.precio;


    const resultOrdenProducto: Orden_ProductoData.default = await createOrdenProducto({ ordenId, productId, precioUnitario, cantidad } as Orden_ProductoData.default);
    res.send(resultOrdenProducto);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: (error as Error).message });
  }
}
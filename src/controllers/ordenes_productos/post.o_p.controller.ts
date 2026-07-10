import express from 'express';
import type { Orden_ProductoData } from '../../interfaces/Orden_Producto.interface.ts';
import type { OrdenData } from '../../interfaces/Orden.interface.ts';
import type { ProductoData } from '../../interfaces/Producto.interface.ts';
import { createOrdenProducto } from '../../services/ordenes_productos.service.ts';
import { checkOrdenOwner } from '../../utils/checkOrdenOwner.utils.ts';
import { findProductoById, updateProducto } from '../../services/productos.service.ts';
import { Decimal } from '@prisma/client/runtime/client';
import { findOrdenById } from '../../services/ordenes.service.ts';
import { ConflictError } from '../../errors/ConflictError.ts';
import { NotFoundError } from '../../errors/NotFoundError.ts';
import { prisma } from '../../lib/prisma.ts';

type PostOrdenProductoBody = {
    productId: number,
    cantidad: number
}

export default async function postOrdenProducto(req: express.Request, res: express.Response): Promise<void> {

    const ordenId: number = parseInt(req.params.ordenId as string);
    const { productId, cantidad }: PostOrdenProductoBody = req.body;

    //Corrobora que el usuario tenga permisos para modificar este o_p
    //Si es de él, puede. Sino, tiene que ser un ADMIN
    await checkOrdenOwner(ordenId, req);
    const orden: OrdenData = await findOrdenById(ordenId);
    if (req.user?.rol === "USER") {
      if (orden.estado != "CARRITO") {
        throw new ConflictError("No se puede modificar o eliminar un producto de una orden que ya no esté en carrito");
      }
    }

    const producto: ProductoData = await findProductoById(productId);

    if (!producto || !producto.id) {
      throw new NotFoundError("No se encuentra el producto que se quiere agregar a la orden");
    }

    if(producto.stock < cantidad){
      throw new ConflictError("La cantidad pedida es mayor al stock del producto");
    }

    await updateProducto(producto.id, { stock: (producto.stock - cantidad) })

    const precioUnitario: Decimal = producto.precio;


    const resultOrdenProducto: Orden_ProductoData = await createOrdenProducto({ ordenId, productId, precioUnitario, cantidad });
    res.send(resultOrdenProducto);

}
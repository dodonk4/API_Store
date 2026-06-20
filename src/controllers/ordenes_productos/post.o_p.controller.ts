import express from 'express';
import * as Orden_ProductoData from '../../interfaces/Orden_Producto.interface.ts';
import { createOrdenProducto } from '../../services/ordenes_productos.service.ts';
import { checkOrdenOwner } from '../../utils/checkOrdenOwner.utils.ts';
import { findProductoById } from '../../services/productos.service.ts';

export default async function postOrdenProducto(req: express.Request, res: express.Response): Promise<void> {
  try {
    const { ordenId, productId, cantidad } = req.body;

    //Corrobora que el usuario tenga permisos para modificar este o_p
    //Si es de él, puede. Sino, tiene que ser un ADMIN
    await checkOrdenOwner(ordenId, req);

    const producto = await findProductoById(productId);

    if(!producto){
      throw new Error("No se encuentra el producto que se quiere agregar a la orden");
    }
    
    const precioUnitario = producto.precio;


    const resultOrdenProducto: Orden_ProductoData.default = await createOrdenProducto({ ordenId, productId, precioUnitario, cantidad } as Orden_ProductoData.default);
    res.send(resultOrdenProducto);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: (error as Error).message });
  }
}
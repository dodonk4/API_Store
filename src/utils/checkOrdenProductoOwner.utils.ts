import express from 'express';
import * as OrdenData from '../interfaces/Orden.interface.ts';
import { findOrdenById } from '../services/ordenes.service.ts';
import * as Orden_ProductoData from '../interfaces/Orden_Producto.interface.ts';
import { findOrdenProductoById } from '../services/ordenes_productos.service.ts';

export async function checkOrdenProductoOwner(ordenProductoId: number, ordenId: number, req: express.Request): Promise<void | Error> {
    if (!req.user) {
      throw new Error("Tiene que haber un usuario logueado");
    }

    if (req.user.rol != "ADMIN") {
      const ordenProducto: Orden_ProductoData.default = await findOrdenProductoById(ordenProductoId);

      //Corroborar que el origen ID le corresponde al usuario logueado
      if (ordenProducto.ordenId != ordenId) {
        throw new Error("La orden a la que se accede no cuenta con el producto buscado");
      }
    }

}
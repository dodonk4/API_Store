import express from 'express';
import * as OrdenData from '../interfaces/Orden.interface.ts';
import { findOrdenById } from '../services/ordenes.service.ts';
import * as Orden_ProductoData from '../interfaces/Orden_Producto.interface.ts';
import { findOrdenProductoById } from '../services/ordenes_productos.service.ts';

export async function checkOrdenOwner(id: number, req: express.Request): Promise<void | Error> {
    if (!req.user) {
      throw new Error("Tiene que haber un usuario logueado");
    }

    if (req.user.rol != "ADMIN") {
      const orden: OrdenData.default = await findOrdenById(id);

      //Corroborar que el origen ID le corresponde al usuario logueado
      if (orden.usuarioId != req.user.id) {
        throw new Error("El usuario logueado no tiene permisos para acceder a la orden");
      }

    }

}
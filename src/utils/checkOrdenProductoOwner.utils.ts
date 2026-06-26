import express from 'express';
import type { Orden_ProductoData } from '../interfaces/Orden_Producto.interface.ts';
import { findOrdenProductoById } from '../services/ordenes_productos.service.ts';
import { UnauthorizedError } from '../errors/UnauthorizedError.ts';
import { ConflictError } from '../errors/ConflictError.ts';

export async function checkOrdenProductoOwner(ordenProductoId: number, ordenId: number, req: express.Request): Promise<void | Error> {
  if (!req.user) {
    throw new UnauthorizedError("Tiene que haber un usuario logueado");
  }

  if (req.user.rol != "ADMIN") {
    const ordenProducto: Orden_ProductoData = await findOrdenProductoById(ordenProductoId);

    if (ordenProducto.ordenId != ordenId) {
      throw new ConflictError("El orden_producto no corresponde a la orden que se está accediendo");
    }
  }

}
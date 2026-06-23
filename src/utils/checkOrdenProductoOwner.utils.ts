import express from 'express';
import * as OrdenData from '../interfaces/Orden.interface.ts';
import { findOrdenById } from '../services/ordenes.service.ts';
import type { Orden_ProductoData } from '../interfaces/Orden_Producto.interface.ts';
import { findOrdenProductoById } from '../services/ordenes_productos.service.ts';

export async function checkOrdenProductoOwner(ordenProductoId: number, ordenId: number, req: express.Request): Promise<void | Error> {
  if (!req.user) {
    throw new Error("Tiene que haber un usuario logueado");
  }

  if (req.user.rol != "ADMIN") {
    const ordenProducto: Orden_ProductoData = await findOrdenProductoById(ordenProductoId);

    console.log(ordenProducto);

    console.log("OrdenId del orden_producto: " + ordenProducto.ordenId + " || OrdenId accedida: " + ordenId);

    if (ordenProducto.ordenId != ordenId) {
      throw new Error("El orden_producto no corresponde a la orden que se está accediendo");
    }
  }

}
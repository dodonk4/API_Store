import express from 'express';
import type { Orden_ProductoData } from '../interfaces/Orden_Producto.interface.ts';
import { findOrdenProductoById } from '../services/ordenes_productos.service.ts';
import * as AuthRequest from '../interfaces/AuthRequest.ts';

export async function checkOrdenProductoOwner(ordenProductoId: number, ordenId: number, req: AuthRequest.default): Promise<void | Error> {
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
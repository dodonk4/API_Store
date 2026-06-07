import express from 'express';
import Orden from '../../models/Orden.model.ts';
import * as OrdenData from "../../interfaces/Orden.interface.ts";
import { prisma } from "../../lib/prisma.ts";
export async function postOrden(req: express.Request, res: express.Response): void | express.Response {

  //PENDIENTE: Traer el array de productos para que pueda ir a un Orden_Productos, y luego crear el Orden

  try {
    const { usuarioId, estado } = req.body;
    const fecha: Date = new Date();
    if (!usuarioId || !productos || !Array.isArray(productos)) {
      return res.status(400).json({ error: 'usuarioId y productos son requeridos' });
    }
    const resultOrden: OrdenData.default = await prisma.ordenes.create({ data: { usuarioId, estado, fecha } });
    // callback(null, resultOrden);
  } catch (error: any) {
    console.error(error);
    res.status(error.status).json({})
    // callback(new Error('Error al crear orden'), undefined);
  }



  // Orden.create(req.body, (err: Error | null, orden: any) => {
  //   if (err) return res.status(500).json({ error: err.message });
  //   res.status(201).json(orden);
  // });
}

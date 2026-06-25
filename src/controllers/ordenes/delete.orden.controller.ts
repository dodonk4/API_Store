import express from 'express';
import { deleteOrden, findOrdenById } from '../../services/ordenes.service.ts';
import { checkOrdenOwner } from '../../utils/checkOrdenOwner.utils.ts';
import type { OrdenData } from '../../interfaces/Orden.interface.ts';
import * as AuthRequest from '../../interfaces/AuthRequest.ts';

export default async function deleteOrdenController(req: AuthRequest.default, res: express.Response): Promise<void | Error> {
  try {

    const id: number = parseInt(req.params.ordenId as string);

    await checkOrdenOwner(id, req);
    const orden: OrdenData = await findOrdenById(id);
    if(req.user?.rol === "USER"){
      if(orden.estado != "CARRITO"){
        throw new Error("No se puede modificar o eliminar una orden que ya no esté en carrito");
      }
    }

    await deleteOrden(id);
    res.status(204).send();
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
}


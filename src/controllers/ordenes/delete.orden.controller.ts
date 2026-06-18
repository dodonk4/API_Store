import express from 'express';
import { deleteOrden, findOrdenById } from '../../services/ordenes.service.ts';
import * as OrdenData from '../../interfaces/Orden.interface.ts';

export default async function deleteOrdenController(req: express.Request, res: express.Response): Promise<void | Error> {
  try {
    if (!req.user) {
      return new Error("Tiene que haber un usuario logueado para poder actualizar una orden");
    }

    const id = parseInt(req.params.ordenId as string);

    if (req.user.rol != "ADMIN") {
      const orden: OrdenData.default = await findOrdenById(id);

      //Corroborar que el origen ID le corresponde al usuario logueado
      if (orden.usuarioId != req.user.id) {
        return new Error("El usuario logueado no puede modificar una orden que no le corresponde");
      }
    }
    await deleteOrden(id);
    res.status(204).send();
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
}


import express from 'express';
import { deleteOrden, findOrdenById } from '../../services/ordenes.service.ts';
import * as OrdenData from '../../interfaces/Orden.interface.ts';
import { checkOrdenOwner } from '../../utils/checkOrdenOwner.utils.ts';

export default async function deleteOrdenController(req: express.Request, res: express.Response): Promise<void | Error> {
  try {

    const id = parseInt(req.params.ordenId as string);

    await checkOrdenOwner(id, req);

    await deleteOrden(id);
    res.status(204).send();
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
}


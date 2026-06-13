import express from 'express';
import { deleteOrden } from '../../services/ordenes.service.ts';

export default async function deleteOrdenController(req: express.Request, res: express.Response): Promise<void> {
  const id = parseInt(req.params.ordenId as string);
  try {
    await deleteOrden(id);
    res.status(204).send();
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
}


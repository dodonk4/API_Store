import express from 'express';
import type { OrdenData } from '../../interfaces/Orden.interface.ts';
import { findAllOrdenes, findOrdenById } from '../../services/ordenes.service.ts';
import { checkOrdenOwner } from '../../utils/checkOrdenOwner.utils.ts';

export async function getAllOrdenes(req: express.Request, res: express.Response): Promise<void> {
  try {
    const result: OrdenData[] = await findAllOrdenes();
    res.send(result);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
}

export async function getOrdenById(req: express.Request, res: express.Response): Promise<void> {
  try {
    const id: number = parseInt(req.params.ordenId as string);
    await checkOrdenOwner(id, req);
    const result: OrdenData = await findOrdenById(id);
    res.json(result);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
}


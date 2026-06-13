import express from 'express';
import * as OrdenData from '../../interfaces/Orden.interface.ts';
import { findAllOrdenes, findOrdenById } from '../../services/ordenes.service.ts';

export async function getAllOrdenes(req: express.Request, res: express.Response): Promise<void> {
  try {
    const result = await findAllOrdenes();
    res.send(result);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
}

export async function getOrdenById(req: express.Request, res: express.Response): Promise<void> {
  try {
    const id = parseInt(req.params.ordenId as string);
    const result: OrdenData.default = await findOrdenById(id);
    res.json(result);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
}


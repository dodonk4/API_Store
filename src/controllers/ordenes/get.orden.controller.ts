import express from 'express';
import type { OrdenData } from '../../interfaces/Orden.interface.ts';
import { findAllOrdenes, findOrdenById } from '../../services/ordenes.service.ts';
import { checkOrdenOwner } from '../../utils/checkOrdenOwner.utils.ts';
import { BadRequestError } from '../../errors/BadRequestError.ts';

export async function getAllOrdenes(req: express.Request, res: express.Response): Promise<void> {

  const result: OrdenData[] = await findAllOrdenes();
  res.send(result);

}

export async function getOrdenById(req: express.Request, res: express.Response): Promise<void> {

  const id: number = parseInt(req.params.ordenId as string);

  if (!Number.isInteger(id)) {
    throw new BadRequestError("El ordenId debe ser un numero");
  }

  await checkOrdenOwner(id, req);
  const result: OrdenData = await findOrdenById(id);
  res.json(result);

}

